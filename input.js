let myInput;
let colorBlock;
let colorSwitch=0;
let wordsChar=[];
let rectX=0;
let rectY=0;
const rectWidth=10;
const rectHeight=13;


const inputX=5;
let inputY=65;

let instructions=["Last login: Thu Dec 9 18:02:57","on ROMANTIC CRAP SHOOTER",
"Type what you want to say to this lion..."]


var c=document.getElementById('myCanvas');
var ctx=c.getContext('2d');
var c2=document.getElementById('myCanvas2');
var ctx2=c2.getContext('2d');

ctx.font = "12px Courier New";
rectY=inputY-rectHeight;

for(let i=0;i<instructions.length;i++){
  ctx.fillText(instructions[i], inputX,i*15+13);
//console.log(inputY+i*30);
}


class Typeinput {
    constructor() {
      this.string = "";
      this.previousLines = ""
      this.typeContent=""
      this.newLine = ""
      this.lines=[];
    }

    input(key) {
      this.string = this.string.concat(key);
    }

    delete() {
      this.string = this.string.substring(0, (this.string.length - 1));
    }

    submit() {
      //this.string = "";
      // this.string = this.string.concat('>');
      this.lines.push(this.string.substring(this.previousLines.length, this.string.length));
      this.previousLines = this.string;
      rectY += 15;
    }

    showBlock(colorBlock) {

      ctx2.fillStyle = colorBlock;
      if(rectX+rectWidth<c.width-3){
        ctx2.fillRect(rectX, rectY, rectWidth, rectHeight);
        // this.typeContent.push(this.newline);
      }

      else {

        this.lines.push(this.string.substring(this.previousLines.length, this.string.length));
        // this.typeContent.push(this.string.substring(this.previousLines.length, this.string.length));
        this.previousLines = this.string;
        rectY += 15;
        rectX=inputX;
        ctx2.fillRect(rectX, rectY, rectWidth, rectHeight);
      }

    }
    showText(){
      this.newLine = this.string.substring(this.previousLines.length, this.string.length);

      rectX = inputX + ctx.measureText(this.newLine).width;
      ctx.fillStyle = "#000000";
      ctx.clearRect(inputX, inputY-rectHeight, c.width, c.height);

      for(let i=0;i<this.lines.length;i++){
        ctx.fillText(this.lines[i], inputX, inputY+i*15);
      }

      ctx.fillText(this.newLine, inputX, inputY+this.lines.length*15);
    }

  }

myInput = new Typeinput();

document.addEventListener('keydown', function(event) {


  if (event.which === 8)
    myInput.delete();
  else if (event.which === 13){
    myInput.submit();
    isBlowing=true;
    wordsChar=myInput.newLine.split(' ');

    generate(myInput.newLine);
    // myInput.typeContent="";
    pageScroll();
    }
  else if(event.which<=90&&event.which>=65||event.which===32)
    myInput.input(event.key);


});

showTextInput();
showBlockInput("#000000");

function showBlockInput(colorBlock){
  ctx2.clearRect(0, 0, c2.width, c2.height);
  colorSwitch++;
  myInput.showBlock(colorBlock);
  if(colorSwitch%2){
    colorBlock="#000000"
  }
  else
  colorBlock="rgba(255, 255, 255, 0)"
  // colorBlock="#000000"
  setTimeout(function(){ showBlockInput(colorBlock) }, 300)
}

function showTextInput(){

  myInput.showText() ;


  setTimeout(function(){ showTextInput() }, 0)
}
