import React, { useContext, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import adviceSample from '../sampleData/adviceSample';

// import Context Obj
import { AdviceContext } from '../state/contexts';

export default function adviceGraph() {
  const { adviceState } = useContext(AdviceContext);

  const adviceGraphContainer = useRef(null);

  useEffect(() => {
    // if there is advice data, render data
    if (adviceState.advice) {
      //let width = parseInt(d3.select('#pieChart').style('width'), 10);
      const width = parseInt(
        d3.select(adviceGraphContainer.current).style('width'),
        10
      );
      const height = width;
      const radius = (Math.min(width, height) - 15) / 2;

      //! an array of the "Type" strings -> ['Queries','Mutations'] for the color scheme
      const type = function getObject(arr) {
        const types = [];
        for (let i = 0; i < arr.length; i++) {
          const obj = arr[i]; // [{Type: 1}, {Type: 2}]
          types.push(obj.Type);
        }
        return types;
      };

      //! setting the color scheme of the graph, each index matches the types array index
      const color = d3
        .scaleOrdinal()
        .domain(type(adviceState.advice))
        .range(['#ff79c6', '#bd93f9']);

      //! creating the outer arc of the graph
      const arcOver = d3 //.svg
        .arc()
        .outerRadius(radius + 10)
        .innerRadius(150);

      //! creating inner arc?
      const arc = d3 //.svg
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(150);

      //! creates an object for each piece of data, prepping for the pie graph
      const pie = d3 //.layout
        .pie()
        .sort(null)
        .value(function (d) {
          console.log(d);
          return +d.Amount;
        });

      // ! creates the transition of the onClick
      // eslint-disable-next-line no-inner-declarations
      function change(d, i) {
        const angle =
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
        //! rotates over the inner arc & outer arc
        d3.selectAll('.piepath').transition().attr('d', arc);
        d3.select(i).transition().duration(1000).attr('d', arcOver);
      }

      //! finally appending the svg onto our div
      const svg = d3
        .select(adviceGraphContainer.current)
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

      //! creating the individual parts of the pie
      const g = svg
        .selectAll('path')
        .data(pie(adviceState.advice))
        .enter()
        .append('path')
        .attr('class', 'piepath')
        .style('fill', function (d) {
          return color(d.data.Type);
        })
        .attr('d', arc)
        .style('fill', function (d) {
          return color(d.data.Type);
        })
        .on('click', function (e, d) {
          //! invokes the rotating of the graph
          change(d, this);

          //! hides the original text
          //d3.select('.text-container').hide();

          //! updating the Header for text card
          d3.select('#segmentTitle').html(
            '<h4 id="segmentTitle">' + d.data.Amount + d.data.Type + '</h4>'
          );

          //d3.select('#');

          //! replacing the description
          d3.select('#segmentText').html(
            '<p id="segmentText">' + d.data.Description + '</p>'
          );

          //! write out our own logic to clean up the original CopyBlock and render new CopyBlock

          d3.select('.text-container').fadeIn(400);
        });

      //! eventually move to stylesheet
      // document.querySelector('style').textContent +=
      //   '@media(max-width:767px) {#pieChart { transform: rotate(90deg); transform-origin: 50% 50%; transition: 1s; max-width: 50%; } .text-container { width: 100%; min-height: 0; }} @media(min-width:768px) {#pieChart { transition: 1s;}}';
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
            Here is the breakdown of your database and GraphQL
          </p>
        </div>
      </div>
    </div>
  );
}
