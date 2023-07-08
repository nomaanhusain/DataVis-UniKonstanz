
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
  const keys = Object.keys(data[0]);

  console.log(keys)

  const sizePerSection = innerHeight / keys.length; //for spliting the vis for each section

  let gridScale = d3.scalePoint().domain(keys).range([0, innerWidth - sizePerSection]);


  let checkbox = document.getElementById('coff_checkbox');
  let checked = false;
  checkbox.addEventListener('change', function() {
    if(this.checked){
      console.log("box is checked")
      checked = true;
      d3.selectAll('text').transition().duration(100).style("opacity", 0).remove();
      d3.selectAll('rect').remove();
      d3.selectAll('circle').remove();
      mainStuff();
    }
    else{
      console.log("box is unchecked")
      checked = false;
      d3.selectAll('text').transition().duration(100).style("opacity", 0).remove();
      d3.selectAll('rect').remove();
      d3.selectAll('circle').remove();
      mainStuff();
    }
  })

  function mainStuff(){
  for (let i = 0; i<keys.length; i++) {
    for (let j = 0; j<keys.length; j++) {
      if (i === j) {
        createHistogram(keys[i], keys[j]);
        //console.log(keys[i],keys[j]);
        continue;
      }
  
      if (i < j) {
        createScatterplot(keys[i], keys[j]);
        continue;
      }
  
      if (i > j) {
        createValues(keys[i], keys[j]);
        continue;
      }
    }
  }
  createLabels();
}
mainStuff()

  
  

  function createHistogram(row,col){
    let xScaleHist = d3.scaleLinear().domain([d3.min(data, (d)=>{return d[row]}),d3.max(data,(d)=>{ return d[row]})]).range([0, sizePerSection - 20]);
    let outterRect = svg.append('g').append('rect')
    .attr("x",gridScale(row)+20)
    .attr("y",gridScale(col)+20)
    .attr("width",sizePerSection -20 )
    .attr("height",sizePerSection - 20)
    .attr('stroke', 'black')
    .attr('fill', 'none');
    //let groupedRect = outterRect.append('g')

    let currHistogram = d3.histogram().value((d) => { return d[row]; }).domain(xScaleHist.domain()).thresholds(10);
  
    var bins = currHistogram(data);

    const yScaleHist = d3.scaleLinear().range([sizePerSection - 20, 0]).domain([ 0, d3.max(bins, (d) => { return d.length; }), ]);

    svg.append('g').selectAll("rect").data(bins).enter()
    .append("rect")
    .attr("x", (d) => { return gridScale(row)+20+xScaleHist(d.x0); })
    .attr("y", (d) => { return gridScale(col)+20+yScaleHist(d.length); })
    .attr("height", (d) => { return sizePerSection - yScaleHist(d.length) - 20; })
    .attr("width", (d) => { return xScaleHist(d.x1) - xScaleHist(d.x0); })
    .attr("fill", "#0068f0");

  }

  function createScatterplot(row,col){
    let xScaleScat = d3.scaleLinear()
    .domain([d3.min(data, (d)=>{return d[col]}),d3.max(data,(d)=>{ return d[col]})])
    .range([0, sizePerSection - 20]);
    
    let yScaleScat = d3.scaleLinear()
    .domain([d3.max(data, (d)=>{return d[row]}),d3.min(data,(d)=>{ return d[row]})])
    .range([sizePerSection - 20, 0]);

    let outterRectScat = svg.append('g').append('rect')
    .attr("x",gridScale(row)+20)
    .attr("y",gridScale(col)+20)
    .attr("width",sizePerSection -20 )
    .attr("height",sizePerSection - 20)
    .attr('stroke', 'black')
    .attr('fill', 'none');


    svg.append('g').selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("cx", (d) => { return gridScale(row)+ 20 + xScaleScat(d[col]); })
    .attr("cy", (d) => { return gridScale(col)+ 20 + yScaleScat(d[row]); })
    .attr("r", 1.5);

  }

  function createValues(row,col){
    let coff = 0;
    if(checked){
      coff = calculateSpearmanCoefficient(row,col)
    }else{
      coff = pearsonCorellation(row,col)
    }

    let outterRectVals = svg.append('g').append('rect')
    .attr("x",gridScale(row)+20)
    .attr("y",gridScale(col)+20)
    .attr("width",sizePerSection -20 )
    .attr("height",sizePerSection - 20)
    .attr('stroke', 'black')
    .attr('fill', 'none');

    svg.append("g")
    .attr("transform","translate(" + (gridScale(row) + 20) + ", " + (gridScale(col) + 20) + ")" )
    .append("text")
    .attr("x", (sizePerSection - 20) / 2)
    .attr("y", (sizePerSection - 20) / 2)
    .text(coff)
    .attr("text-anchor", "middle")
    .attr("font-size", 16);
  }


  function pearsonCorellation(row,col){
    const values1 = data.map(obj => obj[row]);
    const values2 = data.map(obj => obj[col]);
  
    // Calculate the mean values of the two properties
    const mean1 = values1.reduce((sum, val) => sum + val, 0) / values1.length;
    const mean2 = values2.reduce((sum, val) => sum + val, 0) / values2.length;
  
    // Calculate the sum of the products of the differences from the mean
    let numerator = 0;
    for (let i = 0; i < data.length; i++) {
      numerator += (values1[i] - mean1) * (values2[i] - mean2);
    }
  
    // Calculate the sum of the squared differences from the mean
    const sumSqr1 = values1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0);
    const sumSqr2 = values2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0);
  
    // Calculate the denominator (product of standard deviations)
    const denominator = Math.sqrt(sumSqr1) * Math.sqrt(sumSqr2);
  
    // Calculate the Pearson correlation coefficient
    const correlation = numerator / denominator;
    return correlation.toFixed(2)
  }


  function createLabels() {

    for (let key of keys) {    
      svg.append("g")
      .attr( "transform", "translate(" + (gridScale(key) + 20) + ", " + margin.top + ")" )
      .append("text")
      .attr("x", (sizePerSection - 20) / 2)
      .attr("y", -5).text(key)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight", "bold");
  
      svg .append("g")
      .attr("transform","translate(" + margin.left + ", " + (gridScale(key) + 20 + margin.top) + ") rotate(-90)" )
      .append("text")
      .attr("x", (sizePerSection - 90) / 2)
      .attr("y", -5).text(key)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight", "bold");
    }
  }
  



  ///Spearman Rank coff
  function calculateSpearmanCoefficient(row, col) {
    // Extract the values of prop1 and prop2 from the objects
    const values1 = data.map(obj => obj[row]);
    const values2 = data.map(obj => obj[col]);
  
    // Calculate the ranks of the values
    const ranks1 = calculateRanks(values1);
    const ranks2 = calculateRanks(values2);
  
    // Calculate the differences in ranks
    const rankDifferences = ranks1.map((rank1, i) => rank1 - ranks2[i]);
  
    // Calculate the sum of squared rank differences
    const sumSquaredDifferences = rankDifferences.reduce((sum, diff) => sum + Math.pow(diff, 2), 0);
  
    // Calculate the number of items
    const n = data.length;
  
    // Calculate the Spearman's rank correlation coefficient
    const correlation = 1 - (6 * sumSquaredDifferences) / (n * (Math.pow(n, 2) - 1));
  
    return correlation.toFixed(2);
  }
  
  function calculateRanks(values) {
    // Create an array of index-value pairs
    const pairs = values.map((value, index) => ({ value, index }));
  
    // Sort the array based on values
    pairs.sort((a, b) => a.value - b.value);
  
    // Assign ranks to values
    let rank = 1;
    const ranks = new Array(values.length);
  
    for (let i = 0; i < pairs.length; i++) {
      const currentPair = pairs[i];
      const nextPair = pairs[i + 1];
  
      ranks[currentPair.index] = rank;
  
      if (nextPair && nextPair.value !== currentPair.value) {
        rank++;
      }
    }
  
    return ranks;
  }
  



