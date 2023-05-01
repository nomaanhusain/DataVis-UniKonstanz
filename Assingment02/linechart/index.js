// Task 1 b): Verify that D3 is loaded correctly by printing the version number to the console
console.log("D3 Version is: ",d3.version)

/**
 * IMPORTANT NOTICE:
 * 
 * The data is provided by the data.js file which is added in the index.html file. 
 * Make sure the data.js file is loaded before the index.js file, so that you can acces it here!
 * The data is provided in an array called: data
 * const data = [
        {
            "tas": 1.96318,
            "pr": 37.2661,
            "Year": 1991,
            "Month": 1,
            "Country": "DEU"
        }
        ....
 */
let raw_data=null
function load_data(){
    return data
}
// async function print_data(){
//     raw_data=await load_data()
//     console.log("Async Raw Data", raw_data)
// }
//print_data()
console.log("Raw Data:", data);

//Using async await to await data before starting execution
async function main_stuff(){

raw_data=await load_data()
/* TASK 1 c): Retrieve (select) the visualization container node of the div element declared within the index.html by its identifier. */
let vis_container = d3.select("#vis-container")

// Specify margins such that the visualization is clearly visible and no elements are invisible due to the svg border
let margins = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50
};

// Specify the width and height of the svg as well as the width height of the viewport of the visualization.
let width = 800;
let height = 400;
let visWidth = width - margins.left - margins.right;
let visHeight = height - margins.top - margins.bottom;
console.log("visHeight",visHeight)

/* TASK 1 d): Append an svg element to the vis-container, set its width and height (in pixels), add it to the vis-container, 
and save the element to variable called 'svg' */

var svg = vis_container.append("svg")
    .attr("width", width)
    .attr("height", height);

// Task 2 Data Preparation: For each year we want the average rain and temperature. We first need to process the raw data to get the desired format.
let dataByYears = d3.group(raw_data, (d) => d.Year);

// Task 2 a) Describe what is happening in the code above? 
// Answer: In the above code we are grouping the data by year, this can be thought of like a hash table where the Year is the key
//and all the attributes are contained as data of that key

let dataByYearsArray = Array.from(dataByYears);
// Task 2 b) Describe what is happening in the code above?
// Answer: It outputs a multidimensional array where the key from the grouped data is the first element of each array and the second element
//is usually an array that contains the array of attributes for eg.
//[ [ 'Year1', [ [Attributes] ] ],
//[ 'Year2', [ [Attributes] ] ],
//[ 'Year3', [ [Attributes] ] ] ]


let avgData = [];
dataByYearsArray.forEach(year => {

    avgData.push({
        year: year[0],
        rain: d3.mean(year[1], d => d.pr),
        temp: d3.mean(year[1], d => d.tas),
    })
})
// Task 2 c) Describe what is happening in the code above?
// Answer: We have created an array avgData to store the mean of the data for each year, using the forEach loop we iterate the array created
//in the previous step and use the d3.mean function to find mean of all the data values under the 'pr' and 'tas' attributes in a year and store them in an object in the array

console.log("Average Data per Year:", avgData);


/* TASK 3 a) : Append a group element to the svg to realize the margin by translating the group, and save the element to variable called 'viewport'. */
let viewport = svg.append("g").attr("transform",
      "translate(" + margins.left + "," + margins.top + ")");
      //translate means movement, its like "translate(50,20)" means move 50 along x-axis and 20 along y-axis"


// TASK 3 b): Initialize Scales using d3.linearScale function (see https://github.com/d3/d3-scale/blob/master/README.md#continuous-scales)
// You can make use of the d3.extent and d3.max function to calculate the domains. (see https://github.com/d3/d3-array/blob/master/README.md#statistics)
// Create separate scales for the x axis (time scale), the temperature and the rainfall.

let timeScale = d3.scaleTime()
            .domain([d3.min(avgData, function(d) { return d.year; }),d3.max(avgData, function(d) { return +d.year; })])
            .range([margins.left,visWidth-margins.right]);





var tempY = d3.scaleLinear()
            .domain([0,d3.max(avgData, function(d) { return +d.temp; })])
            .range([visHeight-margins.top,margins.bottom])





let rainY = d3.scaleLinear()
            .domain([0,d3.max(avgData, function(d) { return +d.rain; })])
            .range([visHeight-margins.top,margins.bottom])



// In order to organize our code, we add another group which will hold all elements (circles and paths) of the visualization
let visualization = viewport.append("g");
let circles = visualization.selectAll("circle")
    .data(avgData).enter();

console.log("Entered Data:", circles);

// TASK 3 c): Append one blue circle for each rain data point. Make use of the previously initialized scales and anonymous functions.

circles.append("circle")
    .attr("transform", "translate(0,"+margins.top+")")
    .attr("cx", function(d) {return timeScale(d.year); })
    .attr("cy", function(d) {return rainY(d.rain); })
    .attr("r", 3)
    .attr("fill", "blue");


// TASK 3 d): Append one red circle for each temperature data point. Make use of the previously initialized scales and anonymous functions.

circles.append("circle")
    .attr("transform", "translate(0,"+margins.top+")")
    .attr("cx", function(d) {return timeScale(d.year); })
    .attr("cy", function(d) {return tempY(d.temp); })
    .attr("r", 3)
    .attr("fill", "red");


// TASK 3 e): Initialize a line generator for each line (rain and temperature) and define the generators x and y value.
// Save the line-generators to variable

let temp_lineGenerator = d3.line().x(d => timeScale(d.year)).y(d => tempY(d.temp))
let tempPathMaker = temp_lineGenerator(avgData)


let rain_lineGenerator = d3.line().x(d => timeScale(d.year)).y(d => rainY(d.rain))
let rainPathMaker = rain_lineGenerator(avgData)



// TASK 3 f): Append two path elements to the 'visualization' group. Set its 'd' attribute respectively using the linegenerators from above
// Do not forget to set the correct class attributes in order to have the stylesheet applied (.line-temp, .line-rain, .line)

visualization.append('path')
.attr("transform", "translate(0,"+margins.top+")")
.attr('d',tempPathMaker)
.attr('class', 'line-temp')
.attr("stroke-width", 1.5)
.attr("fill", "none")


visualization.append('path')
.attr("transform", "translate(0,"+margins.top+")")
.attr('d',rainPathMaker)
.attr('class', 'line-rain')
.attr("stroke-width", 1.5)
.attr("fill", "none")


// Task 4
// Lets add some axis (check https://github.com/d3/d3-axis for an example)
let axisG = viewport.append("g");
axisG.append('text').attr('class', 'axis-text').text('Temp').attr('x', 0).attr('y', 0);
axisG.append('text').attr('class', 'axis-text').text('Rain').attr('x', visWidth).attr('y', 0);
axisG.append('text').attr('class', 'axis-text').text('Year').attr('x', visWidth/2).attr('y', visHeight+margins.bottom);

// Add X Axis for years
axisG.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+0+","+visHeight+")")
    .call(d3.axisBottom(timeScale)); // Create an axis component with d3.axisBottom

// TASK 4 a): append a group for the axis of the temperature on the left side (d3.axisLeft)
axisG.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate("+margins.left+","+margins.top+")")
    .call(d3.axisLeft(tempY)); // Create an axis component with d3.axisBottom


// TASK 4 b): append a group for the axis of the rain on the right side (d3.axisRight)

axisG.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate("+(visWidth-margins.right)+"," + margins.top + ")")
    .call(d3.axisRight(rainY)); // Create an axis component with d3.axisBottom

}
main_stuff()


