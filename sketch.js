tintaInizio = 255;
textOut = 500;

function preload(){
  // put preload code here
  opBojack = loadSound("./assets/Bojack-op.mp3");
  immInizio = loadImage("./assets/boj01.png");
}

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB, 255);

  angleMode(DEGREES);
  frameRate(10);
  analyzer = new p5.Amplitude();
  analyzer.setInput(opBojack);
  fft = new p5.FFT();

}

function draw() {
    background(40);


    //image(immFine, 0, 0, windowWidth, windowHeight);
    //tint(255, tintaFine);
    tint(255, tintaInizio);
    image(immInizio, 0,0, windowWidth, windowHeight);
    fill(0);
    textAlign(CENTER);
    textSize(60);
    noStroke();
    textFont( 'Black Han Sans');
    text('Oh no! Bojack took too many pills!', windowWidth/2, textOut);
    text('Click to start the visual trip', windowWidth/2, textOut + 100);


  opBojack.rate((mouseX)*0.001);
  opBojack.amp(mouseY/height);


  var vol = analyzer.getLevel();
  vol = map(vol,0,1,0,height);

  var spectrum = fft.analyze();
  stroke(lerpColor(color('#0fefca'), color('#ea0043'), frameCount/120));
  noFill();
  for (var i = 0; i< windowWidth; i++){
  push();

  var x = map (i, 0, spectrum.length, 0, width);
  var h = - height + map(spectrum[i], 0, 150, height, 0);
  rect(x, height, spectrum.length, h )
  pop();

}





  for(var x = 0; x < windowWidth; x += 70) {
    for(var y = 0; y < windowHeight; y += 70) {
      var myHue = x / windowWidth * 255;
      var mySat = y / windowHeight * 255;
      var mydm = (x + y)/vol;
      push();
      //stroke(lerpColor(color('#ea0043'), color('#0fefca'), frameCount/120));
      fill( myHue, mySat, 255);
      noStroke();
      ellipseMode(CENTER);
      ellipse( x, y, mydm); 
      pop();
    }; }

    /*for(var x = 0; x < windowWidth; x += 70) {
      for(var y = 0; y < windowHeight; y += 70) {
        push();
        fill(lerpColor(color('#0fefca'), color('#ea0043'), frameCount/120));
        noStroke();
        translate(width/2, height/2);
        rotate(frameCount* 90 );
        ellipse ( x * random(), y * random(), vol/2, vol/2);
        pop();
      }; }*/

    /*for(var x = 0; x < windowWidth; x += 70) {
      for(var y = 0; y < windowHeight; y += 70) {
        push();
        stroke(lerpColor(color('#ea0043'), color('#0fefca'), frameCount/120));
        noFill();
        translate(width/2, height/2);
        rotate(frameCount * - 90);
        rect( x * random(), y * random(), vol/2, vol/2);
        pop();
      }; }*/

      for(var x = 0; x < windowWidth; x += 70) {
        for(var y = 0; y < windowHeight; y += 70) {
          push();
          fill(lerpColor(color('#ea0043'), color('#0fefca'), frameCount/120));
          noStroke();
          rect( x, y, vol/2, vol/2); 
          pop();
        }; }


 }

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}

function mouseClicked() {
  if (tintaInizio ===  255) {
  tintaInizio = 0;
  opBojack.play();
  textOut = 2000;
  //tintaFine = 255;
} else {
  tintaInizio = 255;
  opBojack.pause();
  //tintaFine = 0;
}
 }
