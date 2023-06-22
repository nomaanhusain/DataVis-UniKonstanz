
// constants
const width = 700;
const height = 500;
const margin = {
  left: 50,
  right: 20,
  bottom: 50,
};

const svg = d3.select("#chart")
.append("svg")
  .attr("width", (width+margin.left+margin.right))
  .attr("height", (height+margin.bottom))
.append("g")
  .attr("transform", "translate(0,0)");

  let val = 40
  let bars = null
  updateVis()

d3.select("#bins-slider").on("input", (e) => {
  val = e.srcElement.valueAsNumber / 10;
  //d3.select("#bins-counter").text(e.srcElement.valueAsNumber);
  bars.remove()
  updateDataArr()
  updateVis()
});



function updateDataArr() {
  let fiveCounter=0
  let threeCounter=0
  let threeHandover=false
  //modify val according to fiveCounter
  for (let idx = 0; idx < data.length; idx++){
    let rectArr=data[idx].rectangles
    if(threeHandover){
      let adder = 0
      if(threeCounter == 0 || threeCounter == 2){
        for (let jdx=0; jdx < rectArr.length; jdx++){
          rectArr[jdx].x = (val*0.4) + adder
          adder=adder+40 
        }
      }
      if(threeCounter == 1){
        for (let jdx=0; jdx < rectArr.length; jdx++){
          rectArr[jdx].x = (val*0.3) + adder
          adder=adder+40 
        }
      }
      threeCounter++;
      if(threeCounter == 3){
        threeCounter = 0
        threeHandover = false
      }
    }else{
      let adder = 0
      if(fiveCounter == 0 ){
        for (let jdx=0; jdx < rectArr.length; jdx++){
          rectArr[jdx].x = adder
          adder=adder+40 
        }
      }
      if(fiveCounter == 1 || fiveCounter == 3){
        for (let jdx=0; jdx < rectArr.length; jdx++){
          rectArr[jdx].x = (val*0.1)+adder
          adder=adder+40
        }
      }
      if(fiveCounter == 2){
        for (let jdx=0; jdx < rectArr.length; jdx++){
          rectArr[jdx].x = (val*0.3)+adder
          adder=adder+40
        }
      }
      if(threeCounter == 4){
        for (let jdx=0; jdx < rectArr.length; jdx++){
          rectArr[jdx].x = adder
          adder=adder+40 
        }
      }
      fiveCounter++;
      if (fiveCounter == 5){
        fiveCounter = 0
        threeHandover=true
      }
     //console.log("bro " + rectArr[1].x)
  }
  }
}

//IDEA you could do some kind of loop over the data and modify it according to the slider value then re-run the visualization with the modified values
function updateVis() {
// Create the bars
bars = svg.selectAll("g.bar")
.data(data)
.enter()
.append("g")
.attr("class", "bar")
.attr("transform", (d, i) => `translate(0, ${15 * i})`);


// Create the horizontal bars
bars.append("rect")
.attr("x", 10)
.attr("y", 5)
.attr("width", width - 10)
.attr("height", 15)
.attr("fill", "none")
.attr("stroke", "black")
.attr("stroke-width", 0.5);


  // Create the rectangles on the bars
bars.selectAll("rect.inner")
.data(d => d.rectangles)
.enter()
.append("rect")
.attr("class", "inner")
.attr("x", (d) => d.x + 15)
.attr("y", 5)
.attr("width", 17)
.attr("height", 15)
.attr("fill", "black");
  
}
