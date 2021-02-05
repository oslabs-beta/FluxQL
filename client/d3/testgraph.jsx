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
    };
    this.myRef = createRef();
  }

  componentDidMount() {
    const { width, height, duration } = this.state;
    let i = 0;

    // function click(event, d) {
    //   console.log('event: ', event);
    //   console.log('d on click: ', d);

    //   if (d.children) {
    //     d._children = d.children;
    //     d.children = null;
    //   } else {
    //     d.children = d._children;
    //     d._children = null;
    //   }
    //   console.log('d after click :', d);
    //   update(d);
    // }

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
      console.log('source: ', source);
      
      // b/c Update doesn't have access to the tree due to scope, we have to declare and store it in a variable
      // treeData basically is our "root" variable from TestGraph
      const treeData = treemap(root);

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
        .attr('transform', (d) => 'translate(' + project(d.x, d.y) + ')') // referencing line 118 in graphv4
        .on('click', click);
      // potential mouseover???

      startingPoint // ref: line 128
        .append('circle')
        .attr('class', 'node')
        .attr('id', (d) => d.id)
        .attr('r', 1e-6) // original radius was 5
        .style('fill', color);

      // adding text label to each node
      startingPoint
        .append('text')
        .attr('dy', '.35em')
        .attr('x', 10)//(d) => (d.children || d._children ? -13 : 13))
        .attr('text-anchor', 'start')
        .text((d) => d.data.name)
        .style('fill-opacity', 1e-6)
      // do we need text-anchor attr? ref: line 137

      /* codepen ref for startingPoint ^
      //codepen.io/fernoftheandes/pen/pcoFz?editors=0010
      https: nodeEnter
        .append('text')
        .attr('x', 10)
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .text(function (d) {
          return d.name;
        })
        .style('fill-opacity', 1e-6);
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
        .attr('r', 5)
        .attr('fill', color)
        .attr('cursor', 'pointer');

      childPoint
        .select('text')
        .style('fill-opacity', 1)
        .attr('transform', (d) => {
          d.x < 180 ? 'translate(0)' : 'rotate(180)translate(-' + (d.name.length + 50) + ')';
        });

      // defining the "disappearance" of the child node when collapsing

      const childExit = node
        //const childExit = node // ref: line 166
        .exit()
        .transition()
        .duration(duration)
        // .attr(
        //   'transform',
        //   (d) => 'translate(' + source.y + ',' + source.x + ')'
        // )
        .remove();

      // styling the invisibility of the collapsed child
      childExit.select('circle').attr('r', 1e-6);
      childExit.select('text').style('fill-opacity', 1e-6);

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function click(event, d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
/* 
! our last attempt
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
        // styling the invisibility of the collapsed child
        // childExit.select('circle').attr('r', 0);
        // childExit.select('text').style('fill-opacity', 0);

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
