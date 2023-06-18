console.log("D3 Version: ", d3.version)

console.log(data)

// Fetching name of stores.
var storeName = data.map(d => d.name)
console.log("storeName: ", storeName)

// Fetching name of departments.
var departments = Object.keys(data[0]).filter(key => key!== 'name')
console.log("departments: ", departments)


var margin = {top: 80, right: 30, bottom: 30, left: 30}
width = 950 - margin.left - margin.right
height = 500 - margin.top - margin.bottom

// Making Scales
var xScale0 = d3.scaleBand().domain(storeName).range([0, width - margin.right - margin.left]).padding(0.2)
var xScale1 = d3.scaleBand().domain(departments).range([0, width/8])
var yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.clothing)]).range([height, 0])
var colorScale = d3.scaleOrdinal().domain(departments).range(['#0066ff','#ff6a00','#00ff00'])

// console.log("Testing yScale: ", yScale(8261.68))
// console.log("Testing yScale: ", yScale(7875.87))
// console.log("Testing colorScale: ", colorScale('clothing'))

var viewport = d3.select("#chart")
    .append("svg")
    .append('g')
    .attr("transform", 'translate('+ (margin.left+100) + ',' + margin.top +')')

// Making Axes
xAxis = viewport.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height +')')
    .call(d3.axisBottom(xScale0))

yAxis = viewport.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale))

// Modifying data structure to get help in visualization.
data.forEach(d => {
    revenue = []
    departments.forEach(dep => {
        revenue.push({'dep':dep,'value':d[dep], 'name':d.name})
    })
    d['departments'] = revenue
})
console.log("New Data is: ", data)

state = viewport.selectAll('.state')
    .data(data)
    .enter().append('g')
    .attr('class', 'g')
    .attr('transform', d => 'translate('+ (xScale0(d.name)+10) +', 0)')

var tooltip = d3.select("#tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");
  
var rect = state.selectAll('rect')
    .data(d => d.departments)
    .enter()
    .append('rect')
    // .attr('transform', 'translate(25,0)')
    .attr('x', d => xScale1(d.dep))
    .attr('y', d => yScale(d.value))
    .attr('width', xScale1.bandwidth())
    .attr('height', d => height-yScale(d.value))
    .style('fill', d => colorScale(d.dep))
    .on('mouseover', function(event, d) {
      var store = d.name;
      var department = d.dep;
      var revenue = d.value;
  
      // Update tooltip content
      var tooltipContent =
        "Store: " + store + "<br/>" +
        "Department: " + department + "<br/>" +
        "Revenue: " + revenue;
  
      // Display the tooltip
      tooltip.html(tooltipContent)
        .style('visibility', 'visible');
    })
    .on('mousemove', function(event) {
      // Position the tooltip relative to the mouse pointer
      tooltip.style('top', (event.pageY - 10) + 'px')
        .style('left', (event.pageX + 10) + 'px');
    })
    .on('mouseout', function() {
      // Hide the tooltip
      tooltip.style('visibility', 'hidden');
    });
  

// Making Legends
var legend = d3.select('svg').selectAll('.legend')
// .data(legends)
// .enter()
.append('g')
.attr('class', 'legend')
.attr('transform', 'translate(' + 220 + ',' + 50 + ')')
.attr("width", 400)
.attr("height", 400);

legend.append('text')
.text('clothing')
.attr('x', width - 195)
.attr('y', 5)
.style('fill', colorScale('clothing'))

legend.append('text')
.text('equipment')
.attr('x', width - 195)
.attr('y', 20)
.style('fill', colorScale('equipment'))

legend.append('text')
.text('accessories')
.attr('x', width - 195)
.attr('y', 35)
.style('fill', colorScale('accessories'))

viewport.append('text')
  .attr('class', 'x-axis-label')
  .attr('text-anchor', 'middle')
  .attr('x', (width - 40))
  .attr('y', height + margin.bottom + 5)
  .text('Stores');

// Add y-axis label
viewport.append('text')
  .attr('class', 'y-axis-label')
  .attr('text-anchor', 'middle')
  .attr('x', 5)
  .attr('y', height / 2 - 210)
  .text('Revenue');
