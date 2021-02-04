import React, { Component, createRef } from 'react';
import * as d3 from 'd3';
import './graphv4.scss';
import treeData from './treeData';
import update from './helperFunctions';

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

export default TestGraph;
