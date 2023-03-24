const container = document.querySelector(".container");
const size = { height: 16, width: 16 }; //grid size variable
let drawColor = "black"; //color of draw tool

function makeGrid(rows, cols) {
  //populate the container with the grid
  emptyCells();
  container.style.setProperty("--grid-rows", rows); //custom css property to dynamically create rows adn columns
  container.style.setProperty("--grid-cols", cols);
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    cell.style.backgroundColor = "rgb(255,255,255)";
    container.appendChild(cell).className = "grid-item";
    console.log(cell.style.backgroundColor);
  }
}

function emptyCells() {
  //remove cell  elements from grid
  cells = document.querySelectorAll(".grid-item");
  cells.forEach((cell) => {
    cell.remove();
  });
}

function clear() {
  //reset grid color scheme(set to a button in future)
  cells = document.querySelectorAll(".grid-item");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "rgb(0,0,0)";
  });
}
function recolor() {
  //eventHandler to adjust draw tool depending on option selected
  recolorButtn = document.querySelectorAll(".recolor");
  recolorButtn.forEach((buttn) => {
    buttn.addEventListener("click", (e) => {
      console.log(drawColor);
      if (buttn.innerText == "Eraser") {
        drawColor = "white";
      } else if (buttn.innerText == "Black") {
        drawColor = "black";
      } else if (buttn.innerText == "Rainbow") {
        drawColor = "rainbow";
      } else if (buttn.innerText == "Shade") {
        drawColor = "shade";
      }
    });
  });
}
function addEvent() {
  //listener function
  let cells = document.querySelectorAll(".grid-item");
  cells.forEach((cell) => {
    console.log("in addevent");
    cell.addEventListener("mouseover", (e) => onHover(cell), false);
  });
}

function onHover(cell) {
  //event handler function
  console.log("in onHover");
  if (drawColor == "black") cell.style.backgroundColor = "rgb(0,0,0)";
  else if (drawColor == "rainbow") cell.style.backgroundColor = randomColor();
  else if (drawColor == "white") {
    cell.style.backgroundColor = "rgb(255, 255, 255)";
    console.log(cell.style.backgroundColor);
  } else if (drawColor == "shade") {
    //get the current color of the cell and cinrease the shade by 10% each hover over
    let rgb = cell.style.backgroundColor;
    let rgbArr = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")")).split(",");
    cell.style.backgroundColor = `rgb(${rgbArr[0] - 25},${rgbArr[1] - 25},${
      rgbArr[2] - 25
    })`;
  }
}

function random(number) {
  //get random number to generate rgb color adjusted for brighter colors
  return Math.floor(Math.random() * (number - 90) + 90);
}
function randomColor() {
  //return a random color
  console.log(
    "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")"
  );
  return "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
}

let resizeButton = document.querySelectorAll(".resize"); // event handler for resizing the grid
resizeButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.innerText == "large") {
      size.height = 64;
      size.width = 64;
      makeGrid(size.height, size.width);
      addEvent();
    } else if (button.innerText == "medium") {
      size.height = 32;
      size.width = 32;
      makeGrid(size.height, size.width);
      addEvent();
    } else if (button.innerText == "small") {
      size.height = 16;
      size.width = 16;
      makeGrid(size.height, size.width);
      addEvent();
    }
  });
});

makeGrid(size.height, size.width);
recolor();
addEvent();
