
// constants
// const width = 700;
// const height = 700;
// const margin = {
//   left: 50,
//   right: 20,
//   bottom: 50,
// };




  // Define the dimensions and margins of the plot
  var margin = { top: 20, right: 20, bottom: 20, left: 20 };
  var width = 500;
  var height = 500;
  var innerWidth = (width - margin.left - margin.right) 
  var innerHeight = (height - margin.top - margin.bottom)


  // Create the SVG element and set its dimensions
  var svg = d3.select("#chartVis")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 

   // console.log(data);

    // Step 1: Group the objects based on their date
var groupedData = d3.group(data, d => d.date);

console.log(groupedData);

// Step 2: Create a D3 selection for each group of objects
var groups = svg.selectAll("g")
  .data(groupedData)
  .enter()
  .append("g");

// Step 3: Append a new <g> element for each group
//groups.attr("transform", (d, i) => "translate(0, " + (i * 50) + ")");

// Step 4: Perform operations within each group
groups.each(function(groupData) {
  // 'this' refers to the current <g> element
  var group = d3.select(this);
  
  // Working code block
  // // Perform any desired operations or visualizations within the group
  // group.selectAll("circle")
  //   .data(groupData[1]) // groupData[1] contains the objects in the group
  //   .enter()
  //   .append("circle")
  //   .attr("cx", (d, i) => i * 20)
  //   .attr("cy", 20)
  //   .attr("r", 5)
  //   .attr("fill", "steelblue");


  // Sort the groupData by 'Name' in alphabetical order
  var sortedData = groupData[1].sort((a, b) => d3.ascending(a.Name, b.Name));

  // Determine the object with the higher value
  var maxClose = d3.max(sortedData, d => d.close);
  
  // Define the x and y scales
  var xScale = d3.scaleLinear()
    .domain([0, sortedData.length - 1])
    .range([0, 450]);
    
  var yScale = d3.scaleLinear()
    .domain([0,d3.max(sortedData, d => d.close)])
    .range([450, 0]);

  // Define the area generator
  var area = d3.area()
    .x((d, i) => xScale(i))
    .y0(40)
    .y1(d => yScale(d.close))
    .curve(d3.curveBasis);
  
    // Append the area path
// Append the area path for objects with higher value
group.append("path")
.datum(sortedData.filter(d => d.close === maxClose))
.attr("d", area)
.attr("fill", "steelblue")
.attr("opacity", 0.7);

// Append the area path for objects with lower value
group.append("path")
.datum(sortedData.filter(d => d.close !== maxClose))
.attr("d", area)
.attr("fill", "orange")
.attr("opacity", 0.7);
});