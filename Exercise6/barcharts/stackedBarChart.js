console.log("D3 Version: ", d3.version)

const newdata = JSON.parse(JSON.stringify(data)); // For testing purposes
console.log("New Data: ", newdata)

// Fetching name of stores.
var storeName = data.map(d => d.name)
console.log("storeName: ", storeName)

// Fetching name of departments.
var departments = Object.keys(data[0]).filter(key => key!== 'name')
console.log("departments: ", departments)


// Fetching total revenue per store and adding that to the data.
data.forEach(d => {
    totalRevenue = 0,
    
    departments.forEach(dep => {
        totalRevenue += d[dep]
    })

    d.totalRevenue = totalRevenue
})
console.log("Now the data is: ", data)


var margin = {top: 80, right: 30, bottom: 30, left: 30}
width = 900 - margin.left - margin.right
height = 500 - margin.top - margin.bottom

// Making Scales
var xScale = d3.scaleBand().domain(storeName).range([0, width - margin.right - margin.left]).padding(0.1)
var yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.totalRevenue)]).range([height, 0])
var colorScale = d3.scaleOrdinal().domain(departments).range(['#0066ff','#ff6a00','#00ff00'])

// console.log("Testing yScale: ", yScale(8261.68))
// console.log("Testing yScale: ", yScale(7875.87))
// console.log("Testing colorScale: ", colorScale('equipment'))

var viewport = d3.select("#chart")
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", 'translate('+ (margin.left+100) + ',' + margin.top +')')

// Making Axes
xAxis = viewport.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height +')')
    .call(d3.axisBottom(xScale))

yAxis = viewport.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale))

// Modifying data structure a little bit to get help in visualization:
for(var i=1; i<3; i++){
    if(i == 1){data.forEach(d => {
        d[departments[i]] += d.clothing
    })}else{
        data.forEach(d => {
        d[departments[i]] += d[departments[i-1]]
    })}
}
console.log("Now the data is: ", data)


// Making Layers which we'll stack on top of eachother.
var layers = []
var lesgo = departments.forEach(dep => {
    
    var depLayer = []
    
    data.forEach(d => {
        depLayer.push({
          'x': xScale(d.name),
          'y': yScale(d[dep]),
          'Department': dep
        });
    });

    layers.push(depLayer)
})

console.log(layers)

for (var i = 0; i < 3; i++) {

    if(i==0){
        for (var j = 0; j < 5; j++){
            layers[i][j]['y0'] = height - layers[i][j]['y']
            layers[i][j]['store'] = storeName[j]
            layers[i][j]['revenueValue'] = newdata[j][departments[i]]
        }
    }else{
        for (var j = 0; j < 5; j++){
            layers[i][j]['y0'] = layers[i-1][j]['y'] - layers[i][j]['y']
            layers[i][j]['store'] = storeName[j]
            layers[i][j]['revenueValue'] = newdata[j][departments[i]]
        }
    }

}

console.log(layers)

var svgLayer = viewport.selectAll('.layer')
    .data(layers)
    .enter()
    .append('g')
    .attr('class','layer')

var tooltip = d3.select("#tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");
  
var rect = svgLayer.selectAll('rect')
    .data(d => d)
    .enter()
    .append('rect')
    .attr('transform', 'translate(25,0)')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', 85)
    .attr('height', d => d.y0)
    .style('fill', d => colorScale(d.Department))
    .on('mouseover', function(event, d) {
      var store = d.store;
      var department = d.Department;
      var revenue = d.revenueValue;
  
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
.attr('transform', 'translate(' + 140 + ',' + 100 + ')')
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
