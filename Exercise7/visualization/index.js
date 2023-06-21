
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

d3.select("#bins-slider").on("input", (e) => {
  const val = e.srcElement.valueAsNumber;
  d3.select("#bins-counter").text(e.srcElement.valueAsNumber);
  
});

const data = [
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  },
  {
    x: 50,
    rectangles: [
      { x: 0 },
      { x: 40 },
      { x: 80 },
      { x: 120 },
      { x: 160 },
      { x: 200 },
      { x: 240 },
      { x: 280 },
      { x: 320 },
      { x: 360 },
      { x: 400 },
      { x: 440 },
      { x: 480 },
      { x: 520 },
      { x: 560 },
      { x: 600 },
      { x: 640 }
    ]
  }
];

//IDEA you could do some kind of loop over the data and modify it according to the slider value then re-run the visualization with the modified values
// Create the bars
const bars = svg.selectAll("g.bar")
.data(data)
.enter()
.append("g")
.attr("class", "bar")
.attr("transform", (d, i) => `translate(0, ${20 * i})`);

// Create the horizontal bars
bars.append("rect")
.attr("x", 10)
.attr("y", 5)
.attr("width", width - 20)
.attr("height", 20)
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
.attr("width", 15)
.attr("height", 20)
.attr("fill", "black");