import React, { useContext, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import AdviceCodeBlock from '../components/adviceCodeBlock';

// import Context Obj
import { AdviceContext } from '../state/contexts';

export default function adviceGraph() {
  const { adviceState, adviceDispatch } = useContext(AdviceContext);

  const adviceGraphContainer = useRef(null);
  const pieText = useRef(null);
  const displayPieText =
    <div>
      <h1 id="segmentTitle"></h1>
      <p id="segmentText"></p>
      <p id="staticText"></p>
    </div>;


  useEffect(() => {
    // if there is an update in advice state, render new graph
    if (adviceState.advice.length > 0) {

      //  if there is an exisiting graph, clear out the graph and old text before rendering the new one
      if (adviceGraphContainer.current && pieText.current) {
        d3.select(adviceGraphContainer.current).html('');
        // clear out the title
        d3.select('#segmentTitle').html('');
        d3.select('#segmentText').html('');
        d3.select('#segmentTitle').html('Advice Console');
        d3.select('#segmentText').html(adviceState.dynamicText);
        d3.select('#staticText').html(adviceState.staticText);
      }
      
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
          const obj = arr[i]; 
          types.push(obj.Type);
        }
        return types;
      };

      //! setting the color scheme of the graph, each index matches the types array index
      const color = d3
        .scaleOrdinal()
        .domain(type(adviceState.advice))
        .range(["#E24161", "#EE6617", "#FFBF00", '#423E6E']);

      //! creating the outer arc of the graph
      const arcOver = d3
        .arc()
        .outerRadius(radius + 10)
        .innerRadius(150);

      //! creating inner arc?
      const arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(150);

      //! creates an object for each piece of data, prepping for the pie graph
      const pie = d3 
        .pie()
        .sort(null)
        .value(function (d) {
          console.log(d);
          return +d.Amount;
        });

      // ! creates the transition of the onClick
    
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
        .attr('width', '20%') // originally 100%
        .attr('height', '20%') // originally 100%
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
            '<h4 id="segmentTitle">' +
              d.data.Amount +
              ' ' +
              d.data.Type +
              '</h4>'
          );

          //d3.select('#');

          //! removing starting description
          const staticText = d3.select('#staticText');
          staticText.html('');

          //! replacing the description
          d3.select('#segmentText').html(
            '<p id="segmentText">' + d.data.Description + '</p>'
          );

          //! write out our own logic to clean up the original CopyBlock and render new CopyBlock

          adviceDispatch({
            type: 'SHOW_EXAMPLE',
            payload: d.data.Example,
          });

          d3.select('.text-container').fadeIn(400);
        });
    }
  }, [adviceState.dynamicText]);

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-sm-6"
          id="pieChart"
          ref={adviceGraphContainer}
        ></div>
        <div id="pieText"ref={pieText} >
          {adviceState.dynamicText && displayPieText}
        </div>
      </div>
      {adviceState.displayExample && <AdviceCodeBlock />}
    </div>
  );
}

// line 161: <div id="pieText" className="col-sm-6 text-container">