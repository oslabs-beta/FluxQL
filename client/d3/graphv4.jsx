import React, { Component, createRef } from 'react';
import * as d3 from 'd3';
import './graphv4.scss';
import { render } from 'react-dom';

const width = 960;
const height = 1000;
const duration = 350;

class GraphV4 extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }

  componentDidMount() {
    let nodes;
    let links;
    let i = 0;

    // grabbing from Graphv4 Render
    const svg = d3.select(this.myRef.current);

    const g = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + (width / 2 + 40) + ',' + (height / 2 + 90) + ')'
      );

    function connector(d) {
      return (
        'M' +
        project(d.x, d.y) +
        'C' +
        project(d.x, (d.y + d.parent.y) / 2) +
        ' ' +
        project(d.parent.x, (d.y + d.parent.y) / 2) +
        ' ' +
        project(d.parent.x, d.parent.y)
      );
    }

    const treeMap = d3.tree().size([360, 250]);

    let root;
    let nodeSvg;
    let linkSvg;
    let nodeEnter;
    let linkEnter;

    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    function color(d) {
      return d._children
        ? '#3182bd' // collapsed package
        : d.children
        ? '#c6dbef' // expanded package
        : '#fd8d3c'; // leaf node
    }

    function flatten(root) {
      // hierarchical data to flat data for force layout
      const nodes = [];
      function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        else ++i;
        nodes.push(node);
      }
      recurse(root);
      return nodes;
    }

    function project(x, y) {
      const angle = ((x - 90) / 180) * Math.PI,
        radius = y;
      return [radius * Math.cos(angle), radius * Math.sin(angle)];
    }

    function update(source) {
      // ends on line 182

      nodes = treeMap(root).descendants();
      // is an array of all tree nodes, the first one is always the root node

      links = nodes.slice(1); // an array of all children nodes

      let nodeUpdate;
      let nodeExit;

      // Normalize for fixed-depth.
      nodes.forEach(function (d) {
        d.y = d.depth * 180;
      });

      nodeSvg = g.selectAll('.node').data(nodes, function (d) {
        return d.id || (d.id = ++i);
      });

      //nodeSvg.exit().remove();

      // to make all the children nodes start at the parent node
      nodeEnter = nodeSvg // this was let nodeEnter = nodeSvg
        .enter()
        .append('g')
        //.attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr('class', 'node')
        .attr('transform', function (d) {
          return 'translate(' + project(d.x, d.y) + ')';
        })
        //.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on('click', click);
      // .on('mouseover', function (d) {
      // return 'minu';
      // });

      nodeEnter.append('circle').attr('r', 5).style('fill', color);

      nodeEnter
        .append('text')
        .attr('dy', '.31em')
        //.attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
        .attr('x', function (d) {
          return d.children || d._children ? -10 : 10;
        })
        .style('text-anchor', function (d) {
          return d.x < 180 === !d.children ? 'start' : 'end';
        })
        //.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .attr('transform', function (d) {
          return 'rotate(' + (d.x < 180 ? d.x - 90 : d.x + 90) + ')';
        })
        .text(function (d) {
          return d.data.name;
        });

      // Transition nodes to their new position.
      // let nodeUpdate = nodeSvg.merge(nodeEnter).transition()
      //   .duration(duration);

      nodeUpdate = nodeEnter
        .merge(nodeSvg)
        .transition()
        .duration(duration) // set to 750 on global variable declaration
        .attr('transform', function (d, i) {
          if (i === 0 || i === 1) {
            console.log('nodeUpdate: parent node: ', d);
          }
          return 'translate(' + project(d.x, d.y) + ')';
        });
      // .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeSvg.select('circle').style('fill', color);

      nodeUpdate.select('text').style('fill-opacity', 1);

      // Transition exiting nodes to the parent's new position.
      nodeExit = nodeSvg
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', function (d) {
          return 'translate(' + source.y + ',' + source.x + ')';
        }) //for the animation to either go off there itself or come to centre
        .remove();

      nodeExit.select('circle').attr('r', 1e-6); // original
      // nodeExit.select('circle').attr('r', 0);

      nodeExit.select('text').style('fill-opacity', 1e-6);

      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      linkSvg = g.selectAll('.link').data(links, function (link) {
        const id = link.id + '->' + link.parent.id;
        return id;
      });

      // Transition links to their new position.
      linkSvg.transition().duration(duration);
      // .attr('d', connector);

      // Enter any new links at the parent's previous position.
      linkEnter = linkSvg
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', function (d) {
          return (
            'M' +
            project(d.x, d.y) +
            'C' +
            project(d.x, (d.y + d.parent.y) / 2) +
            ' ' +
            project(d.parent.x, (d.y + d.parent.y) / 2) +
            ' ' +
            project(d.parent.x, d.parent.y)
          );
        });
      /*
              function (d) {
          let o = {x: source.x0, y: source.y0, parent: {x: source.x0, y: source.y0}};
          return connector(o);
      });*/

      // Transition links to their new position.
      linkSvg
        .merge(linkEnter)
        .transition()
        .duration(duration)
        .attr('d', connector);

      // Transition exiting nodes to the parent's new position.
      linkSvg
        .exit()
        .transition()
        .duration(duration)
        .attr(
          'd',
          /*function (d) {
                let o = {x: source.x, y: source.y, parent: {x: source.x, y: source.y}};
                return connector(o);
            })*/ function (
            d
          ) {
            return (
              'M' +
              project(d.x, d.y) +
              'C' +
              project(d.x, (d.y + d.parent.y) / 2) +
              ' ' +
              project(d.parent.x, (d.y + d.parent.y) / 2) +
              ' ' +
              project(d.parent.x, d.parent.y)
            );
          }
        )
        .remove(); // ----> removes the children node links (blue lines that go out from arizona to arizona airport) // this is also going to need some sort of transition duration property
    } // ENDS UPDATE

    d3.json('/client/v4Data.json').then((treeData) => {
      //if(!error) throw error;

      root = d3.hierarchy(treeData, function (d) {
        // defining the root of tree and assigning this.children = an array of nodes
        return d.children;
      });

      // customizing our children nodes
      root.each(function (d) {
        d.name = d.data.name; // bringing out the name thats nested inside "data" property
        d.id = i; //Assigning numerical Ids via global variable  "i"
        i += i; // incrementing i for the next node
      });
      // defining the coordinate of our root
      root.x0 = height / 2;
      root.y0 = 0;

      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      update(root);
      root.children.forEach(collapse); // somehow closes??? come back to it
    }); // closes line 83
  } // componentdidmount

  render() {
    return (
      <div>
        <svg width={width} height={height} ref={this.myRef}></svg>
      </div>
    );
  }
}

export default GraphV4;

/*
for line 211 -> d3.json sends a GET request to server

app.get('/client/v4Data.json', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../client/v4Data.json')));

! potential json file??

{
  name: "psql database name",
  children: [
    {
      name: "table name",
      children: [{name: "column name"},{}]
    }
  ]
}
*/
