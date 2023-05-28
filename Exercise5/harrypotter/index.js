/**
 * IMPORTANT NOTICE:
 * 
 * The data is provided by the data.js file.
 * Make sure the data.js file is loaded before the index.js file, so that you can acces it here!
 * The data is provided and stored as the graphs nodes and links.
 * Check out the console to see the data structure:
 */

const links = data.links
const nodes = data.nodes
console.log("Data Structure", data)

// constants
const width = 1200;
const height = 900;
const margin = {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50,
};

// aggregates the data according to the attribute value
// there is NOTHING to do for you here
function aggregateData(unaggregated, attribute) {
    var newData = {}
    //grouping of nodes
    newData.nodes = Array.from(d3.group(unaggregated.nodes, d => d[attribute])).map((d,i) => {
        return {
        name: d[0],
        [attribute]: d[0],
        id: i,
        count: d[1].length
        }
    })

    newData.links = []
    //for each node combination, create a link
    newData.nodes.forEach((n, i) => {
        newData.nodes.slice(i+1).forEach((n2,i2) => {
        newData.links.push({
            source: i,
            target: i+1+i2,
            value: unaggregated.links.filter(d => (
            (d.source[attribute] == n.name && d.target[attribute] == n2.name) || 
            (d.source[attribute] == n2.name && d.target[attribute] == n.name))).map(d => d.value).reduce((curr, acc) => curr+acc, 0)
        })
        })
    })
    
    return newData;
}


let houseAggegate = aggregateData(data,'house')
console.log("House Aggregate",houseAggegate)


d3.select('svg#chart').attr('width', width).attr('height', height)
d3.select('g#vis-g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
var svg = d3.select('g#vis-g')

const visHeight = height - margin.top - margin.bottom
const visWidth = width - margin.left - margin.right

// TASK 
//define an ordinal color scale and define a color for each value of the 'house' attribute of the data
let houseArr = []
houseAggegate.nodes.forEach(obj => {
    houseArr.push(obj.name)
})


var colorScale = d3.scaleOrdinal().domain(houseArr).range(["#009c31", "#f73131", "#03d9ff","#9d9da1","#efff14"]);



// TASK 
//attach an event handler on the checkbox, and call the updateGraph function
    //depending on the checkbox value, the data should be aggregated, or not

let checkbox = document.getElementById('house_checkbox');

let checked = false
    // Add an event handler
checkbox.addEventListener('change', function() {
    if (this.checked) {
    console.log('Checkbox is checked')
    checked = true
    updateGraph(houseAggegate)  
    } else {
    console.log('Checkbox is unchecked')
    checked = false
    updateGraph(data)
    }
});



    
 //this function handles the creation of the graph, depending on the passed 'graphData'
 function updateGraph(graphData) {
    d3.selectAll('circle').remove()
    d3.selectAll("line").remove()
    d3.selectAll('text').remove()
    let funcLinks = graphData.links
    let funcNodes = graphData.nodes
    

    //TASK 
    //draw a line for each link
        //the color of the link should be green when  the value is greater than 0, red when below 0
        //if the value is below 0, add a dash-array to the stroke
    const link = svg.selectAll("link")
            .data(funcLinks)
            .enter()
            .append("line")
            .attr("class", "link")
        


    //TASK 
    //create a group element for each node
    //implement the drag ( https://github.com/d3/d3-drag ) behaviour to make the graph interactive
        //add a circle 
            // if aggregated, the radius of the circle should scale according to the count
            // color the circle according to the colorScale
        //add a text label
        let node = null
        if(checked){
            node = svg.selectAll("node")
                .data(funcNodes)
                .enter()
                .append("circle")
                .attr("class", "node")
                .attr("r", function(d){return d.count})
                .attr("fill",function(d){return colorScale(d.house)})
                .call(d3.drag().on("start", dragStarted).on("drag", dragged).on("end", dragEnded));

        }else{
            node = svg.selectAll("node")
                .data(funcNodes)
                .enter()
                .append("circle")
                .attr("class", "node")
                .attr("r", 5)
                .attr("fill",function(d){return colorScale(d.house)})
                .call(d3.drag().on("start", dragStarted).on("drag", dragged).on("end", dragEnded));
        }

    const text  = svg.selectAll("labelText")
        .data(funcNodes)
        .enter()
        .append("text")
        .attr("class", "labelText")
        .attr("dy", ".25em")




    // TASK
    // create a force Simulation ( https://github.com/d3/d3-force ) using the nodes and links
        //make sure the force is centered at the middle of your visualization 
        //and the nodes do not overlap
 
    let simulation = null
    if(checked){
        simulation = d3.forceSimulation(funcNodes)
    .force("link", d3.forceLink(funcLinks).id((d) => d.id))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(visWidth / 2, visHeight / 2))
    .force('collision',d3.forceCollide().radius(5))
    }else{
        simulation = d3.forceSimulation(funcNodes)
    .force("link", d3.forceLink(funcLinks).id((d) => d.id))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(visWidth / 2, visHeight / 2))
    .force('collision',d3.forceCollide().radius(d => d.count))
    }
    
      // Add tick function for updating positions of nodes and links
      //use d.value to define the type of line
        simulation.on("tick", () => {
            link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y)
            .attr("stroke-dasharray", (d) => (d.value < 0 ? "3,3" : "none"))
            .attr("stroke", function(d){
                if(d.value > 0 ) return "green"
                else return "red"
            });
      
            node
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y);

            text
            .attr("x", (d) => d.x)
            .attr("y",(d) => d.y - 15)
            .text((d) => d.name)

        });
      
      // Drag functions for node interaction
      function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      
      function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
         






    

         





}
 
 
//initialize the graph with ungrouped data
updateGraph(data)
 
 
 
 