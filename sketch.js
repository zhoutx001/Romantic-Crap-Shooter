let charRNN;
let status;
let textInput;
let tempSlider;
let lengthSlider;
let runningInference = false;
let original;
let newdata;
var second;

let lengthText;
let temperatureText;
let yourString;
let frameCounter = 0;

let originalText;
let predictionText;

function setup() {
  // Create the LSTM Generator passing it the model directory
  charRNN = ml5.charRNN('models/woolf/', modelReady);

  // Grab the DOM elements
  textInput = document.querySelector('#textInput');
  // lengthSlider = document.querySelector('#lenSlider');
  // tempSlider = document.querySelector('#tempSlider');
  // status = document.querySelector('#status')
  lengthText = 150;
  temperatureText = 0.5;
  originalText = document.querySelector('#original');
  predictionText = document.querySelector('#prediction');


  // console.log(textInput)
  // document.getElementById("myBtn").addEventListener("click", generate);

}

setup();

function modelReady() {
  // status.innerHTML = 'Model Loaded';
}

function generate(inputstring) {

  // prevent starting inference if we've already started another instance
  // if (!runningInference) {
  //   runningInference = true;


    // Grab the original text
    original = inputstring;
    // Make it to lower case
    let txt = original.toLowerCase();

    // Check if there's something
    if (txt.length > 0) {
      // Here is the data for the LSTM generator
      let data = {
        seed: txt,
        temperature: 0.5,
        length: 150
      };

// console.log("generate");
        // Generate text with the charRNN
          charRNN.generate(data, gotData);

    } else {
      // Clear everything
      originalText.innerHTML = '';
      predictionText.innerHTML = '';
    }

  // }

}

// Update the DOM elements with typed and generated text
function gotData(err, result) {
  // status.innerHTML = 'Ready!';
  originalText.innerHTML = original;

  yourString = result.sample;
  let output = yourString.replace(/,/g, "</br>");
  predictionText.innerHTML += output;
  isBlowing=false;
  second = output.split("</br>");


  //console.log(frameCounter);

  initparticles();
  newdata = second[second.length - 2];

  let newtxt = newdata.toLowerCase();

  // Check if there's something
  if (newtxt.length > 0) {
    // Here is the data for the LSTM generator
    let newseed = {
      seed: newtxt,
      temperature: 0.5,
      length: 250
    };

    if(frameCounter<2){
      // runningInference = false;
  // Generate text with the charRNN
  charRNN.generate(newseed, gotData);
    frameCounter++;
}
else{
  frameCounter=0;
}
// charRNN.generate(newseed, gotData);
    for(let i=1;i<second.length;i=i++){
      speak(result.sample);
      setInterval(type,100);
      speak(second[i]);
    }
      // runningInference = false;

  }
  // runningInference = false;
}

var synth = window.speechSynthesis
var u = new SpeechSynthesisUtterance();
u.lang = 'en-US';
u.rate = 1.2;
function speak(textToSpeak) {
  u.text = textToSpeak;
  synth.speak(u)
}

function initparticles() {
if(frameCounter<2&&frameCounter>0) {
    hearts();
  }
}


function hearts() {
  $.each($(".particletext.hearts"), function () {
    var heartcount = ($(this).width() / 50) * 5;
    for (var i = 0; i <= heartcount; i++) {
      var size = ($.rnd(60, 120) / 10);
      $(this).append('<span class="particle" style="top:' + $.rnd(20, 80) + '%; left:' + $.rnd(0, 95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0, 30) / 10) + 's;"></span>');
    }
  });
}

jQuery.rnd = function (m, n) {
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor(Math.random() * (n - m + 1)) + m;
}

initparticles();

function pageScroll() {
        window.scrollBy(0,50); // horizontal and vertical scroll increments
        setTimeout(function(){ pageScroll()},300); // scrolls every 100 milliseconds
}
