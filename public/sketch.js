// Keep track of our socket connection
var socket;
//Set basic attributes
let color = 'white';
let cursorSize = 10;
//Aux funtions for adapt color, brush size and take prints
getColor = (id) => {color = id }
printScrean = ()=> {window.print()}
pointerSize = (value) => {cursorSize = parseInt(value)}
//
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 219, 163);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(data.colorAux);
      noStroke();
      console.log(data.cursorSizeAux)
      ellipse(data.x, data.y, data.cursorSizeAux, data.cursorSizeAux);
    }
  );
}

function draw() {
  // Nothing
}

function mouseDragged() {
  // Draw some white circles
  fill(color);
  noSmooth();
  noStroke();
  ellipse(mouseX,mouseY, cursorSize, cursorSize);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY, color, cursorSize); 
}

function mouseClicked() {
  // Draw some white circles
  fill(color);
  noSmooth();
  noStroke();
  ellipse(mouseX,mouseY, cursorSize, cursorSize);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY, color, cursorSize); 
}
// Function for sending to the socket
function sendmouse(xpos, ypos, color, cursorSize ) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    colorAux: color,
    cursorSizeAux: cursorSize,
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}