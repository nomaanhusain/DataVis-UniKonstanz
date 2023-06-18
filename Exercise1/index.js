//TASK 4a
//let the console tell that the script is loaded
console.log("index.js loaded")

// TASK 4b
// Select the polyline element on the page
let foxSvg=document.getElementById("fox")
foxSvg.style.stroke="black"
// Define an array of colors to loop through
const colorArray=["blue","red","green","yellow"]
// Initialize a variable to keep track of the current color index
let i=0
// Create a loop (for example a for loop) that iterates through the color array using the index 
  // set the new color to the selected line
  // for ecah iteration enter 1 second delay to see the fox partying
  // for(i=0;i<colorArray.length;i++){
  //   foxSvg.style.stroke=colorArray[i]
  //   console.log(foxSvg.style.stroke)
  // }

//Calling the function at set interval ie. 1 Sec
setInterval(changeColor,1000)

//A function to change color
  function changeColor(){
    if(i<4){
    foxSvg.style.stroke=colorArray[i]
    i++
    }else{
      i=0
    }
  }