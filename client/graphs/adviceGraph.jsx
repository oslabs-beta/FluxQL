import React, { useContext, useRef, useEffect } from 'react';
import * as d3 from 'd3';

// import Context Obj
import { AdviceContext } from '../state/contexts';

export default function adviceGraph() {
  const { adviceState } = useContext(AdviceContext);

  const adviceGraphContainer = useRef(null);

  useEffect(() => {
    // if there is advice data, render data
    if (adviceState.advice) {
      //var width = parseInt(d3.select('#pieChart').style('width'), 10);
      var width = parseInt(d3.select(adviceGraphContainer).style('width'), 10);
      var height = width;
      var radius = (Math.min(width, height) - 15) / 2;

      var type = function getObject(obj) {
        const types = [];
        for (var i = 0; i < obj.length; i++) {
          types.push(obj[i].Type);
        }
        return types;
      };
      var arcOver = d3.svg
        .arc()
        .outerRadius(radius + 10)
        .innerRadius(150);

      var color = d3.scale
        .ordinal()
        .domain(type(data_V1))
        .range(['#8A76A6', '#54B5BF', '#8EA65B', '#F27B35']);

      /*var color = d3.scale.category20();
    color.domain(type(data))*/

      var arc = d3.svg
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(150);

      var pie = d3.layout
        .pie()
        .sort(null)
        .value(function (d) {
          return +d.Amount;
        });

      change = function (d, i) {
        var angle =
          90 -
          (d.startAngle * (180 / Math.PI) +
            ((d.endAngle - d.startAngle) * (180 / Math.PI)) / 2);
        svg
          .transition()
          .duration(1000)
          .attr(
            'transform',
            'translate(' + radius + ',' + height / 2 + ') rotate(' + angle + ')'
          );
        d3.selectAll('path').transition().attr('d', arc);
        d3.select(i).transition().duration(1000).attr('d', arcOver);
      };

      var svg = d3
        .select('#pieChart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr(
          'viewBox',
          '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height)
        )
        .attr('preserveAspectRatio', 'xMinYMin')
        .append('g')
        .attr('transform', 'translate(' + radius + ',' + height / 2 + ')');

      var g = svg
        .selectAll('path')
        .data(pie(data_V1))
        .enter()
        .append('path')
        .style('fill', function (d) {
          return color(d.data.Type);
        })
        .attr('d', arc)
        .style('fill', function (d) {
          return color(d.data.Type);
        })
        .on('click', function (d) {
          change(d, this);
          d3.select('.text-container').hide();
          d3.select('#segmentTitle').replaceWith(
            '<h1 id="segmentTitle">' +
              d.data.Type +
              ': ' +
              d.data.Amount +
              '</h1>'
          );
          d3.select('#');
          d3.select('#segmentText').replaceWith(
            '<p id="segmentText">' + d.data.Description + '</p>'
          );
          d3.select('.text-container').fadeIn(400);
        });

      document.querySelector('style').textContent +=
        '@media(max-width:767px) {#pieChart { transform: rotate(90deg); transform-origin: 50% 50%; transition: 1s; max-width: 50%; } .text-container { width: 100%; min-height: 0; }} @media(min-width:768px) {#pieChart { transition: 1s;}}';
    }
  }, [adviceState.advice]);

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-sm-6"
          id="pieChart"
          ref={adviceGraphContainer}
        ></div>
        <div id="pieText" className="col-sm-6 text-container">
          <h1 id="segmentTitle">Advice Console</h1>
          <p id="segmentText">
            Here's the breakdown of your database and GraphQL
          </p>
        </div>
      </div>
    </div>
  );
}
