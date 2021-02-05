import React, { Component, createRef } from 'react';
import * as d3 from 'd3';
import './graphv4.scss';
import treeData from './treeData';
import { color, project } from './helperFunctions';

class TestGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 960, 
      height: 1000, 
      duration: 350,
      diameter: 800,
      margin: {
        top: 20,
        right: 120, 
        bottom: 20, 
        left: 120
      }
    }
    this.myRef = createRef();
  }

  componentDidMount() {
    const { diameter, duration, margin, width, height } = this.state;
    let i = 0;

    // defining the angle of the link?
    function diagonal (d) {
      return (
        'M' +
        project(d.x, d.y) +
        'C' +
        project(d.x, (d.y + d.parent.y) / 2) +
        ' ' +
        project(d.parent.x, (d.y + d.parent.y) / 2) +
        ' ' +
        project(d.parent.x, d.parent.y)
      )
    } 

    // grabbing from DOM
    const svg = d3.select(this.myRef.current);

    const g = svg.append('g').attr(
      'transform',
      'translate(' + (width / 2 + 40) + ',' + (height / 2 + 90) + ')'
    );

    //defining where the actual area of the tree is
    const treemap = d3.tree().size([360, 250]);

    // defining the parent root & it's coordinates
    const root = d3.hierarchy(treeData, (d) => d.children);
    root.x0 = height / 2;
    root.y0 = 0;

    // assigning each node properties and an id
    root.each(function (d) {
      d.name = d.data.name;
      d.id = i;
      i += 1;
    });

    // to actually open up the tree graph
    update(root);

    function update(source) {
      
      // treeData basically is our "root" variable from TestGraph
      const treeData = treemap(root);

      /******** NODES (G, CIRCLE, TEXT) *******/
      // grabbing all tree nodes (including root)
      const nodes = treeData.descendants();

      // assigning the layers of the circle
      nodes.forEach(function (d) {
        d.y = d.depth * 180;
      });

      const g = svg.select('g');

      const node = g
        .selectAll('.node')
        .data(nodes, (d) => d.id || (d.id = ++i));

      // the starting location of all nodes (aka the tree root's location)
      const startingPoint = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('id', (d) => d.id)
        .attr('transform', (d) => 'translate(' + project(d.x, d.y) + ')')
        .on('click', click);

      startingPoint // ref: line 128
        .append('circle')
        .attr('class', 'node')
        .attr('id', (d) => d.id)
        .attr('r', 1e-6) // ! original radius was 5 but we want it to start off as "invisible"
        .style('fill', (d) =>  d._children ? 'lightsteelblue' : '#fff)');

      // adding text label to each node
      startingPoint
        .append('text')
        .attr('dy', '.35em')
        .attr('x', 10)// ! (d) => (d.children || d._children ? -13 : 13)) was putting the text on top of the <g> so it threw off the clicking 
        .attr('text-anchor', 'start')
        .text((d) => d.data.name)
        .style('fill-opacity', 1e-6)

      // we are merging the original spot to the child point (overrwriting the objects)
      const childPoint = startingPoint.merge(node);

      // created the location that will move the children to their designated spots
      childPoint
        .transition()
        .duration(duration)
        .attr('transform', (d) => 'rotate(' + (d.x - 90) + ')translate(' + d.y +')');
        // ! our original below.. the above changees the text to be on angle
        //.attr('transform', (d) => 'translate(' + project(d.x, d.y) + ')');

      // style the child node at its correct location
      childPoint
        .select('circle.node')
        .attr('r', 5)
        .attr('fill', (d) => d._children ? 'lightsteelblue' : '#fff')
        .attr('cursor', 'pointer');

      childPoint
        .select('text')
        .style('fill-opacity', 1)
        .attr('transform', (d) => {
          d.x < 180 ? 'translate(0)' : 'rotate(180)translate(-' + (d.name.length + 50) + ')';
        }); //! to get the text to rotate on an angle

      // defining the "disappearance" of the children nodes of the collapsed parent node 
      const childExit = node
        .exit()
        .transition()
        .duration(duration)
          // .remove(); // ! this was removing the entire circle tag
          /* 
          ! we don't want this b/c it does the weird transition off the page 
          // .attr(  
          //   'transform',
          //   (d) => 'translate(' + source.y + ',' + source.x + ')'
          // ) 
          */
          
      // styling the invisibility of the collapsed child
      childExit.select('circle').attr('r', 1e-6);
      childExit.select('text').style('fill-opacity', 1e-6);

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      /******** LINKS (PATH) *******/      
      // defining the number of links we need, excluding the root
      const links = nodes.slice(1);

      const link = g.selectAll('.link')
        .data(links, (link) => {
          const id = link.id + '->' + link.parent.id;
          return id;
        })
      // const link = svg.selectAll('path.link')
      //   .data(links, (d) => d.id); 

      // defining the transition of links to their new position
      // link
      //   .transition()
      //   .duration(duration);

      // starts the links at 
      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', (d) => { diagonal(d)
          // return (
          //   'M' +
          //   project(d.x, d.y) +
          //   'C' +
          //   project(d.x, (d.y + d.parent.y) / 2) +
          //   ' ' +
          //   project(d.parent.x, (d.y + d.parent.y) / 2) +
          //   ' ' +
          //   project(d.parent.x, d.parent.y)
          // );
        });
      
      // defining the correct spots of the links
      const linkUpdate = linkEnter.merge(link);

      linkUpdate
        .transition()
        .duration(duration)
        .attr('d', (d) => diagonal(d, d.parent));

      const linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .remove()

      function click(event, d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
    }
  }

  render() {
    const { width, height } = this.state;

    return (
      <div>
        <svg width={width} height={height} ref={this.myRef}></svg>
      </div>
    );
  }
}

export default TestGraph;

/*
class TestGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 1000,
      duration: 350,
    };
    this.myRef = createRef();
  }

  componentDidMount() {
    const { width, height, duration } = this.state;
    let i = 0;

    // grabbing from DOM
    const svg = d3.select(this.myRef.current);

    const g = svg.append('g').attr(
      //maybe where the treemap is?
      'transform',
      'translate(' + (width / 2 + 40) + ',' + (height / 2 + 90) + ')'
    );

    //defining where the actual area of the tree is...
    const treemap = d3.tree().size([360, 250]);

    // defining the parent root & it's coordinates
    const root = d3.hierarchy(treeData, (d) => d.children);
    root.x0 = height / 2;
    root.y0 = 0;

    // assigning each node properties and an id
    root.each(function (d) {
      d.name = d.data.name;
      d.id = i;
      i += 1;
    });

    // to actually open up the tree graph
    update(root, treemap, svg, root, height, width, duration);
  }

  render() {
    const { width, height } = this.state;

    return (
      <div>
        <svg width={width} height={height} ref={this.myRef}></svg>
      </div>
    );
  }
}
*/

/* 
! our last attempt -> was placed inside click function
        const parent = d3.select(this); // <g>
        //const childExit = node // ref: line 166
        console.log('parent: ', parent);
        const desc = d.descendants(); // data -> node
        console.log('descendants: ', desc);

        // const circleExit = parent.select('circle.node').attr('r', 0).remove();
        // const textExit = parent
        //   .select('text')
        //   .style('fill-opacity', 0)
        //   .remove();

        parent
          .exit()
          .transition()
          .duration(duration)
          .attr(
            'transform',
            (d) => 'translate(' + source.y + ',' + source.x + ')'
          )
          .attr('hidden', true)
          .remove();
*/