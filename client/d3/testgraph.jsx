import React, { Component, createRef } from 'react';
import * as d3 from 'd3';
import './graphv4.scss';
import treeData from './treeData';

/******** GLOBAL DECLARATIONS *********/
let i = 0;

function color(d) {
  if (d._children) {
    return '#3182bd';
  } else if (d.children) {
    return '#c6dbef';
  } else {
    return '#fd8d3c';
  }
}

function project(x, y) {
  const angle = ((x - 90) / 180) * Math.PI;
  const radius = y;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

/******** GLOBAL DECLARATIONS *********/

class TestGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 1000,
      duration: 750,
    };
    this.myRef = createRef();
  }

  componentDidMount() {
    const { width, height, duration } = this.state;

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
    update(root);

    function update(source) {
      // b/c Update doesn't have access to the tree due to scope, we have to declare and store it in a variable
      // treeData basically is our "root" variable from TestGraph
      const treeData = treemap(source);
      console.log('treeData: ', treeData);

      // grabbing all tree nodes (including root)
      const nodes = treeData.descendants();

      nodes.forEach(function (d) {
        d.y = d.depth * 180;
      });

      // grabbing all nodes off the DOM in the <g>
      const g = svg
        .append('g')
        .attr(
          'transform',
          'translate(' + (width / 2 + 40) + ',' + (height / 2 + 90) + ')'
        );

      const node = g.selectAll('.node').data(nodes, (d) => {
        console.log('d for line 123: ', d);
        return d.id || (d.id = ++i);
      });
      // the starting location of all nodes (aka the tree root's location)
      const startingPoint = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => 'translate(' + project(d.x, d.y) + ')') // referencing line 120 in graphv4
        .on('click', click);
      // potential mouseover???

      startingPoint // ref: line 128
        .append('circle')
        .attr('class', 'node')
        .attr('r', 5)
        .style('fill', color);

      // adding text label to each node
      startingPoint
        .append('text')
        .attr('dy', '.35em')
        .attr('x', (d) => (d.children || d._children ? -13 : 13))
        .text((d) => d.data.name);
      // do we need text-anchor attr? ref: line 137

      /* codepen ref for startingPoint ^
        https://codepen.io/fernoftheandes/pen/pcoFz?editors=0010
        nodeEnter.append("text")
          .attr("x", 10)
          .attr("dy", ".35em")
          .attr("text-anchor", "start")
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1e-6);
      */

      // we are merging the original spot to the child point (overrwriting the objects)
      const childPoint = startingPoint.merge(node);

      // created the location that will move the children to their designated spots
      childPoint
        .transition()
        .duration(duration)
        .attr('transform', (d) => 'translate(' + project(d.x, d.y) + ')');

      // style the child node at its correct location
      childPoint // ref: line 161
        .select('circle.node')
        .attr('fill', color)
        .attr('cursor', 'pointer');

      // defining the "disappearance" of the child node when collapsing
      const childExit = startingPoint // ref: line 166
        .exit()
        .transition()
        .duration(duration)
        .attr(
          'transform',
          (d) => 'translate(' + source.y + ',' + source.x + ')'
        )
        .remove();

      // styling the invisibility of the collapsed child
      childExit.select('select').attr('r', 0);

      childExit.select('text').style('fill-opacity', 0);
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
