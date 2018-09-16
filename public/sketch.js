// Keep track of our socket connection
var socket;
let color = 'white';
//Aux funtions
getColor = (id) => {color = id }
printScrean = ()=> {window.print()}
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
      rect(data.x, data.y, 10, 10,5);
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
  rect(mouseX,mouseY, 10, 10,5);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY, color); 
}

function mouseClicked() {
  // Draw some white circles
  fill(color);
  noSmooth();
  noStroke();
  rect(mouseX,mouseY, 10, 10,5);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY, color); 
}
// Function for sending to the socket
function sendmouse(xpos, ypos, color ) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    colorAux: color,
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}

function inicializa(){
  var tecla = document.addEventListener('keydown', () => {alert(event.keyCode)});

}
