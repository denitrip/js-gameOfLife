// DOM
var canvas = document.getElementById('canvas'); 
var dropD = document.getElementById('sel');
var sBtn = document.getElementById('start');
var cBtn = document.getElementById('clear');
var pBtn = document.getElementById('pause');
var popData = document.getElementById('population');
var genData = document.getElementById('generation');
var canvasContext = canvas.getContext('2d');
var messages = document.getElementById('messages');

// params
var canData=[]; //storage for the canvas data
var population=0;
var generation=0;
var gameStatus = 0; //0-stopped, 1-started, 2-paused;
var size=[{x: 10, y:10},{x: 20, y:20},{x:40, y:40}];
var rules=["Выберите размер точки.","Нажмите 'старт' для начала игры.","Для закрытия данного меню нажмите на кнопку '?'."]

// default cell size
var dotSize=0;
var storageSize =0;



// set all data in 2d storage = 0
function setCanvasData(){
	for ( var i=0;i<storageSize;i++) {
		canData[i]=[];
		for ( var j=0;j<storageSize;j++) {
			canData[i][j]=0;
		}
	}
}

function loadSizes() {
	size.forEach(function(e){
		dropD.innerHTML+="<option>"+e.x+"x"+e.y+"</option>"
	});	
	dropD.value="";
}
loadSizes()

function setSizes() {
	if (gameStatus==0) {
	dotSize=dropD.value.split('x')[0];
	storageSize=400/dotSize
	clearField() //flash canvas, storage
	if (dropD.value != "") {sBtn.disabled=false; pBtn.disabled=false;}
	else {sBtn.disabled=true; pBtn.disabled=true;}
	}
}

function Pause(){
	gameStatus=2;
	enableInput()
}

function unPause() {
	gameStatus=1;
	disableInput()
}

function disableInput() {
	dropD.disabled=true;
	sBtn.disabled=true;
	cBtn.disabled=true;
}
function enableInput() {
	sBtn.disabled=false;
	cBtn.disabled=false
}