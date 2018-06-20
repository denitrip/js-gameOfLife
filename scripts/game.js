//Drawing default pictuire on canvas
function setDefaults(e){
	if (gameStatus==0 && storageSize !=0) {
	var x = e.offsetX;
	var y = e.offsetY;
	x = Math.floor(x/dotSize); 
	y = Math.floor(y/dotSize); 
	canData[y][x]=1;
	canvasContext.fillRect(x*dotSize, y*dotSize, dotSize, dotSize);  //draw a dot
	}
}

function clearField() {
	canvasContext.clearRect(0, 0, 400, 400); //flash the canvas context
	setCanvasData(); //flash the storage
	gameStatus=0; //set the game status to default
	dropD.disabled=false; //enable to set the grid
	genData.value=0; //set generation = 0 (on the screen)
	popData.value=0; // set population = 0 (on the screen)
	population = 0;
	generation = 0;
}

function refreshCanvas(){ //reload the picture with a new data
	canvasContext.clearRect(0, 0, 400, 400);
	for (var i=0; i<storageSize; i++){
		for (var j=0; j<storageSize; j++){
			if (canData[i][j]==1){
				canvasContext.fillRect(j*dotSize, i*dotSize, dotSize, dotSize);
			}
		}
	}
}

function letTheGameBegin(){
	if (gameStatus == 0) {gameStatus=1;} 
	population=0;
	var tmp = [];
	for (var i=0; i<storageSize; i++){
		tmp[i]=[];
		for (var j=0; j<storageSize; j++){
			if (countNeighbors(i,j)==2 || countNeighbors(i,j)==3) { 
				tmp[i][j]=1;
				population++;	
			}
			else 
				{ tmp[i][j]==0; }
		}
	}
	canData = tmp;
	refreshCanvas();
	genData.value=generation;
	popData.value=population;
	generation++;
	if (gameStatus == 1 && population>0) { //stop the game if population becomes 0
		timer = setTimeout(letTheGameBegin, 200);
	}
}


function cb(i){
	if(i==0) return storageSize;
	else return i;
}

function cu(i){
	if(i==storageSize-1) return -1;
	else return i;
}

function countNeighbors (i,j) {
	var rCells = 0;
		if (canData[cb(i)-1][j]==1) rCells++;
		if (canData[i][cu(j)+1]==1) rCells++;
		if (canData[cu(i)+1][j]==1) rCells++;
		if (canData[i][cb(j)-1]==1) rCells++;
		if (canData[cb(i)-1][cu(j)+1]==1) rCells++;
		if (canData[cu(i)+1][cu(j)+1]==1) rCells++;		
		if (canData[cu(i)+1][cb(j)-1]==1) rCells++;
		if (canData[cb(i)-1][cb(j)-1]==1) rCells++;
		return rCells
}
