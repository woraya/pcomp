// Serial Input p5
// midterm
// shoot the pigeons

var serial;
var portName = "/dev/cu.usbmodem1411";
var potValue = 0;

var f0, f1, f2, f3, f4;
var p0, p1, p2;

var offset = 0;


function preload() {
  f0 = loadImage("f0.png");
  f1 = loadImage("f1.png");
  f2 = loadImage("f2.png");
  f3 = loadImage("f3.png");
  f4 = loadImage("f4.png");
  
  p0 = loadImage("p0.png");
  p1 = loadImage("p1.png");
  p2 = loadImage("p2.png");

}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  
	serial = new p5.SerialPort();  // make a new instance of  serialport library
	serial.on('list', printList);  // callback function for serialport list event
	serial.on('data', serialEvent);// callback for new data coming in
	serial.list();                         	// list the serial ports
	serial.open(portName); 	// open a port
}


function draw() {
  background(250);
  fill(0);
  ellipse(potValue, height/2, 20, 20);
  text(potValue, 20, 20);


  // feather
  push();
  translate(40, 0);
  scale(0.2);
  image(f0, width, height*2.5);
  image(f1, width*2, height*2);
  image(f2, width*3, height*3);
  image(f3, width*1.5, height*4);
  pop();

  image(f4, width/2, potValue);
  
  // pigeons
  push();
  translate(100, 100);
  scale(0.3);
  image(p0, mouseX*2, mouseY*2);
  // image(p1, width*2.2, height);
  image(p1, random(-1, width), random(-1, height));
  pop();

  image(p2, potValue, height/2);
 

}


function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	var inString = serial.readLine();
	if (inString.length > 0) {
		inString = inString.trim();
		potValue = Number(inString/4); 	// (inString/4) 255/4
		println(potValue);
	}
}








