import React, { Component, createRef } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  constructor(props){
    super(props)
    this.myRef = createRef();
  }

  componentDidMount(){
    const numbers = [20, 30, 50, 30, 10, 90];
    const barHeight = 40;

    d3.select(this.myRef.current)
      .selectAll('rect')
      .data(numbers)
      .enter()
      .append('rect')
      .attr('width', barHeight - 5)
      .attr('height', data => data)
      .attr('fill', 'tomato')
      .attr(
        'transform', (data, index) => `translate(${index * barHeight}, 100)`
    )
  }

  render(){
    return (
      <div>
        <svg width='300px' height='300px' ref={this.myRef} ></svg>
      </div>
    )}
};

export default BarChart;