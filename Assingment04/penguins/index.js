/**
 * IMPORTANT NOTICE:
 * 
 * The data is provided by the data.js file.
 * Make sure the data.js file is loaded before the index.js file, so that you can acces it here!
 * The data is provided in an array called: data
 * const data = [
  {
    "species": "Adelie",
    "island": "Torgersen",
    "culmen_length_mm": 39.1,
    "culmen_depth_mm": 18.7,
    "flipper_length_mm": 181,
    "body_mass_g": 3750,
    "sex": "MALE"
  } ....
 */

console.log("Initial Data", data)

// constants
const width = 600;
const height = 600;
const margin = {
  left: 50,
  right: 50,
  top: 50,
  bottom: 50,
};

d3.select('svg#chart').attr('width', width).attr('height', height)
let svg = d3.select('g#vis-g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

const visHeight = height - margin.top - margin.bottom
const visWidth = width - margin.left - margin.right

//TASK: get all dimensions in the dataset
var allDimensions = data.length

console.log("Dimensions of the dataset: ", allDimensions)

//TASK: Data cleaning
// filter out any datapoints where a value is undefined
// 334 datapoints should remain
var cleanData = data.filter(obj =>
  Object.values(obj).every(prop => prop !== undefined))

console.log("cleaned data length",cleanData.length)
console.log("cleaned Data:", cleanData.map(d => d.sex))

//TASK: seperate numeric and ordinal dimensions
var numerics = []
var categoricals = []
// Iterate over the objects
for (const obj of cleanData) {
  // Check the type of each value
  let numericObj = {}
  let categoricalObj = {}
  for (const keyName in obj) {
    const val = obj[keyName];
    if (typeof val === 'number') {
      numericObj[keyName] = val
    } else if (typeof val === 'string') {
      categoricalObj[keyName] = val
    }
  }
  numerics.push(numericObj)
  categoricals.push(categoricalObj)
}
console.log("numerical dimensions", numerics)
console.log("categorical dimensions", categoricals)


//append a circle for each datapoint
// for cx, cy, fill and r we set dummy values for now 
var selection = d3.select('g#scatter-points').selectAll('circle').data(cleanData)
  .enter().append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 3)
  .attr('fill', 'black')
//add labels for x and y axis
var yLabel = d3.select('g#vis-g').append('text').attr('class', 'axis-label').text(' ')
var xLabel = d3.select('g#vis-g').append('text').attr('class', 'axis-label')
.attr('transform', 'translate('+ visWidth +', ' + visHeight + ')')
.text(' ')


//TASK: add options to the select tags:
// for all <select>'s we have to add <options> for each data dimension
// the select for the x-axis, y-axis and size should only have numeric dimensions as options
// the select for the color should only have categorical dimensions as options
// add an event listener to the <select> tag
//    call the appropriate change function (xAxisChange(newDim), yAxisChange(newDim), colorChange(newDim) or sizeChange(newDim))

let xAxisSelect = d3.select('#x-axis-select')
let yAxisSelect = d3.select('#y-axis-select')
let sizeSelect = d3.select('#size-select')
let colorSelect = d3.select('#color-select')
const numericDimension = [...new Set(numerics.flatMap(obj => Object.keys(obj)))];
const categoricalDimensions = [...new Set(categoricals.flatMap(obj => Object.keys(obj)))];

let xAxisOptions = xAxisSelect.selectAll('option')
  .data(numericDimension)
  .enter()
  .append('option')
  .attr('value', d => d)
  .text(d => d);

let yAxisOptions = yAxisSelect.selectAll('option')
.data(numericDimension)
.enter()
.append('option')
.attr('value', d => d)
.text(d => d);

let sizeSelectOption = sizeSelect.selectAll('option')
.data(numericDimension)
.enter()
.append('option')
.attr('value', d => d)
.text(d => d);

let colorOption = colorSelect.selectAll('option')
.data(categoricalDimensions)
.enter()
.append('option')
.attr('value', d => d)
.text(d => d);


xAxisSelect.on('change', () => {
  const selectedValue = xAxisSelect.property('value');
  console.log('Selected value x:', selectedValue);
  xAxisChange(selectedValue);
});

yAxisSelect.on('change', () => {
  const selectedValue = yAxisSelect.property('value');
  console.log('Selected value y :', selectedValue);
  yAxisChange(selectedValue);
});

sizeSelect.on('change', () => {
  const selectedValue = sizeSelect.property('value');
  console.log('Selected value size:', selectedValue);
  sizeChange(selectedValue);
});

colorSelect.on('change', () => {
  const selectedValue = colorSelect.property('value');
  console.log('Selected value color:', selectedValue);
  colorChange(selectedValue);
});


let xDim = 'culmen_length_mm'
let yDim = 'culmen_depth_mm'
let sizeDim = 'body_mass_g'
let xScale = d3.scaleLinear()
  .domain([d3.min(numerics, (d)=> d[xDim]), d3.max(numerics, (d)=> d[xDim])])
  .range([ 0, visWidth]);

let yScale = d3.scaleLinear()
  .domain([d3.min(numerics, (d)=> d[yDim]), d3.max(numerics, (d)=> d[yDim])])
  .range([ visHeight, 0]);

let sizeScale = d3.scaleLinear()
  .domain([d3.min(numerics, (d)=> d[sizeDim]), d3.max(numerics, (d)=> d[sizeDim])])
  .range([ 1, 5]);
// TASK: x axis update:
// Change the x Axis according to the passed dimension
// update the cx value of all circles  
// update the x Axis label 
xAxisChange = (newDim) => {
  d3.selectAll('circle').remove()
  xDim = newDim
  
  xScale = d3.scaleLinear()
  .domain([d3.min(numerics, (d)=> d[xDim]), d3.max(numerics, (d)=> d[xDim])])
  .range([ 0, visWidth]);

  selection = d3.select('g#scatter-points').selectAll('circle').data(numerics)
  .enter().append('circle')
  .attr('cx', function(d){ return xScale(d[xDim]);})
  .attr('cy', function(d) {return yScale(d[yDim])})
  .attr('r', function(d) {return sizeScale(d[sizeDim])})
  .attr('fill', 'black')
}


// TASK: y axis update:
// Change the y Axis according to the passed dimension
// update the cy value of all circles  
// update the y Axis label 
yAxisChange = (newDim) => {
  d3.selectAll('circle').remove()
  yDim = newDim
  

  yScale = d3.scaleLinear()
  .domain([d3.min(numerics, (d)=> d[yDim]), d3.max(numerics, (d)=> d[yDim])])
  .range([ visHeight, 0]);

  selection = d3.select('g#scatter-points').selectAll('circle').data(numerics)
  .enter().append('circle')
  .attr('cx', function(d){ return xScale(d[xDim]);})
  .attr('cy', function(d) {return yScale(d[yDim])})
  .attr('r', function(d) {return sizeScale(d[sizeDim])})
  .attr('fill', 'black')

}


// TASK: color update:
// Change the color (fill) according to the passed dimension
// update the fill value of all circles  
//
// add a <span> for each categorical value to the legend div 
// (see #color-select-legend in the html file)
// the value text should be colored according to the color scale 
colorChange = (newDim) => {
  

}


// TASK: size update:
// Change the size according to the passed dimension
//    if the dimension contains numbers, use ScaleLinear
//    if the dimension contains strings, use ScaleOrdinal 
// update the r value of all circles  
sizeChange = (newDim) => {
  d3.selectAll('circle').remove()
  sizeDim = newDim
  

  sizeScale = d3.scaleLinear()
  .domain([d3.min(numerics, (d)=> d[sizeDim]), d3.max(numerics, (d)=> d[sizeDim])])
  .range([1, 5]);

  selection = d3.select('g#scatter-points').selectAll('circle').data(numerics)
  .enter().append('circle')
  .attr('cx', function(d){ return xScale(d[xDim]);})
  .attr('cy', function(d) {return yScale(d[yDim])})
  .attr('r', function(d) {return sizeScale(d[sizeDim])})
  .attr('fill', 'black')

}

//initialize the scales
xAxisChange('culmen_length_mm')
yAxisChange('culmen_depth_mm')
colorChange('species')
sizeChange('body_mass_g')