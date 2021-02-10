import React, { useRef, useContext, useEffect } from 'react';
import * as d3 from 'd3';
import { project, diagonal } from './helperFunctions';

// import Context Obj
import { PSQLContext } from '../state/contexts';

export default function psqlGraph() {
  const psqlGraphRef = useRef(null);

  const { psqlState, psqlDispatch } = useContext(PSQLContext);

  const dimensions = {
    width: 960,
    height: 1000,
    duration: 350,
    diameter: 800,
  };

  useEffect(() => {
    // if there is PSQL data, render data
    if (psqlState.d3Tables.name) {
      const { diameter, duration, margin, width, height } = dimensions;
      let i = 0;
      // grabbing from DOM
      const svg = d3
        .select(psqlGraphRef.current)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 960 1000'); // width 960, height 1000
      //.attr('transform', 'translate(' + diameter/2 + ',' + diameter/2 +')');

      const g = svg.append('g').attr(
        'transform',
        'translate(' + width / 2 + ',' + height / 2 + ')'
        //! the code below shifted the starting coordinates of our root...
        //'translate(' + (width / 2 + 40) + ',' + (height / 2 + 90) + ')'
      );

      //defining where the actual area of the tree is
      const treemap = d3
        .tree()
        //.size([360, 250]); // ! not sure what our original did. codepen inspo below
        .size([360, diameter / 2 - 80])
        .separation((a, b) => {
          // ! sets the space between non-related children
          return (a.parent == b.parent ? 1 : 5) / a.depth;
        });

      // defining the parent root & it's coordinates
      const root = d3.hierarchy(psqlState.d3Tables, (d) => d.children);
      root.x0 = svg.style.height / 2; // ! trying to find the middle of the svg graph to root the tree
      root.y0 = 0;

      // assigning each node properties and an id
      root.each(function (d) {
        d.name = d.data.name;
        d.id = i;
        i += 1;
      });

      // to actually open up the tree graph
      update(root);

      // eslint-disable-next-line no-inner-declarations
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
          .on('click', click);

        startingPoint
          .append('circle')
          .attr('class', 'node')
          .attr('id', (d) => d.id)
          .attr('r', 1e-6)
          .style('fill', (d) =>
            d._children || d.children ? '#f1fa8c' : '#D7E2E7)'
          ) //! diff color for parent / child
          .style('stroke', (d) =>
            d._children || d.children ? '#f1fa8c' : '#f6f3e4'
          ) //! diff outline for parent / child
          //.style('stroke-width', (d) => (d._children && d.children ? '2.5px' : '1.5px' )); //! diff outline thickness for parent / child
          .attr('cursor', (d) => {
            if (d._children || d.children) return 'pointer';
          }); //! to remove the cursor pointer if a child

        // adding text label to each node
        startingPoint
          .append('text')
          .attr('dy', '.35em')
          .attr('x', 10)
          .attr('text-anchor', 'start')
          .text((d) => d.data.name)
          .style('fill-opacity', 1e-6);

        // we are merging the original spot to the child point (overrwriting the objects)
        const childPoint = startingPoint.merge(node);

        // created the location that will move the children to their designated spots
        childPoint
          .transition()
          .duration(duration)
          .attr(
            'transform',
            (d) => 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')'
          );

        // style the child node at its correct location
        childPoint
          .select('circle')
          .attr('r', 6.5)
          .attr('fill', (d) => (d._children ? '#f1fa8c' : '#D7E2E7')) //! diff circle fill for parent / child after child moves
          .attr('cursor', (d) => {
            if (d._children || d.children) return 'pointer';
          }); //! to remove the cursor pointer if a child

        childPoint
          .select('text')
          .style('fill', (d) =>
            d._children || d.children ? '#f1fa8c' : '#a4bac2'
          ) // ! change color of text if parent
          .style('font-weight', (d) =>
            d._children || d.children ? 'bolder' : 'normal'
          ) // ! to make parent text bold
          .style('fill-opacity', 1)
          .attr('transform', (d) => {
            return d.x < 180
              ? 'translate(0)'
              : 'rotate(180)translate(-' + (d.name.length + 50) + ')';
          }) //! to get the text to rotate on an angle
          .attr('text-anchor', (d) => {
            return d.x < 180 ? 'start' : 'middle';
          }); // ! to change the starting point of the text to avoid writing over the node

        // defining the "disappearance" of the children nodes of the collapsed parent node
        const childExit = node.exit().transition().duration(duration);

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

        const link = g.selectAll('.link').data(links, (link) => {
          const id = link.id + '->' + link.parent.id;
          return id;
        });

        // starts the links at the parent's previous position
        const linkEnter = link
          .enter()
          .insert('path', 'g')
          .attr('class', 'link')
          .attr('d', (d) => {
            //! to get the link to grow out of the parent's position
            const o = {
              parent: {
                x: source.x0,
                y: source.y0,
              },
              x: source.x0,
              y: source.y0,
            };
            return diagonal(o);
          });

        // defining the correct spots of the links
        const linkUpdate = linkEnter.merge(link);

        linkUpdate
          .transition()
          .duration(duration)
          .attr('d', (d) => diagonal(d));

        // to have links disappear into the parent node
        const linkExit = link
          .exit()
          .transition()
          .duration(duration)
          .attr('d', function (d) {
            //! to get the link to disappear into the parent's position
            const o = {
              parent: {
                x: source.x0,
                y: source.y0,
              },
              x: source.x0,
              y: source.y0,
            };
            return diagonal(o);
          })
          .remove();

        function click(event, d) {
          console.log(d);

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

    return function cleanUpGraph() {
      d3.select(psqlGraphRef.current).html('');
    }
    
  }, [psqlState.d3Tables]);
  return (
    <div>
      <svg ref={psqlGraphRef}></svg>
    </div>
  );
}
