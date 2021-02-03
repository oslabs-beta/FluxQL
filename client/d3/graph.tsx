let pubs =
{
    "name": "AUT-1",
    "children": [
        {
            "name": "PUB-1","children": [
                {"name": "AUT-11","children": [
                    {"name": "AFF-111"},
                    {"name": "AFF-112"}
                ]},
                {"name": "AUT-12","children": [
                    {"name": "AFF-121"}
                ]},
                {"name": "AUT-13","children": [
                    {"name": "AFF-131"},
                    {"name": "AFF-132"}
                ]},
                {"name": "AUT-14","children": [
                    {"name": "AFF-141"}
                ]}
            ]
        },
        {
            "name": "PUB-2","children": [
                {"name": "AUT-21"},
                {"name": "AUT-22"},
                {"name": "AUT-23"},
                {"name": "AUT-24"},
                {"name": "AUT-25"},
                {"name": "AUT-26"},
                {"name": "AUT-27"},
                {"name": "AUT-28","children":[
                    {"name": "AFF-281"},
                    {"name": "AFF-282"},
                    {"name": "AFF-283"},
                    {"name": "AFF-284"},
                    {"name": "AFF-285"},
                    {"name": "AFF-286"}
                ]}
            ]
        },
        {"name": "PUB-3"},
        {
            "name": "PUB-4","children": [
                {"name": "AUT-41"},
                {"name": "AUT-42"},
                {"name": "AUT-43","children": [
                    {"name": "AFF-431"},
                    {"name": "AFF-432"},
                    {"name": "AFF-433"},
                    {"name": "AFF-434","children":[
                        {"name": "ADD-4341"},
                        {"name": "ADD-4342"},
                    ]}
                ]},
                {"name": "AUT-44"}
            ]
        },
        {
            "name": "PUB-5","children": [
                {"name": "AUT-51","children":[
                    {"name": "AFF-511"},
                    {"name": "AFF-512"},
                    {"name": "AFF-513"},
                    {"name": "AFF-514"},
                    {"name": "AFF-515"},
                    {"name": "AFF-516"}
                ]},
                {"name": "AUT-52"},
                {"name": "AUT-53"},
                {"name": "AUT-54"},
                {"name": "AUT-55","children":[
                    {"name": "AFF-551"},
                    {"name": "AFF-552"},
                    {"name": "AFF-553"},
                    {"name": "AFF-554"}
                ]},
                {"name": "AUT-56"},
                {"name": "AUT-57"},
                {"name": "AUT-58"},
                {"name": "AUT-59"},
                {"name": "AUT-591"},
                {"name": "AUT-592"},
                {"name": "AUT-593"},
                {"name": "AUT-594"},
                {"name": "AUT-595"},
                {"name": "AUT-596"}
            ]
        },
        {
            "name": "PUB-6","children": [
              {"name": "AUT-61","children":[
                  {"name": "AFF-611"},
                  {"name": "AFF-612"},
                  {"name": "AFF-613"},
                  {"name": "AFF-614","children":[
                      {"name": "ADD-6141"},
                      {"name": "ADD-6142"},
                  ]}
              ]},
              {"name": "AUT-62"},
              {"name": "AUT-63"},
              {"name": "AUT-64"},
              {"name": "AUT-65"},
              {"name": "AUT-66"},
              {"name": "AUT-67"},
              {"name": "AUT-68"},
              {"name": "AUT-69"}
            ]
        }
    ]
};

var diameter = 800;

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = diameter,
    height = diameter;
    
var i = 0,
    duration = 350,
    root;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 80])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 10) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", width )
    .attr("height", height )
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

root = pubs;
root.x0 = height / 2;
root.y0 = 0;

//root.children.forEach(collapse); // start with all children collapsed
update(root);

d3.select(self.frameElement).style("height", "800px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 80; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", 10)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      //.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1)
      .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length + 50)  + ")"; });

  // TODO: appropriate transform
  var nodeExit = node.exit().transition()
      .duration(duration)
      //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
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

// Collapse nodes
function collapse(d) {
  if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
}