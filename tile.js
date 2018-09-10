// JavaScript Document
window.addEventListener('load', eventWindowLoaded, false);
var backColor = '#f6f67b'; //'#cccccc';#f6f67b#f3f347
var gameStart = false;
var gameIsDone = false;
var theCanvas;
var context;
var transform;
var gameTimer;
var drawCounter;
var glyph1;
var fBook;
var pic;
var post;
var wheel;

var board;

function eventWindowLoaded() {
	canvasApp();
	initApp();	
}

function initApp() {
	drawCounter = 0;
	$("#menuButton").click(function(e) {
		$("#pictureDiv").hide();
		$("#postDiv").hide();			
		$("#textBox").html("Click on a tile next to the open space to move the tile. Order the tiles left to right.");		
		$("#navDiv").toggle();
	}
	);
	
	$("#mixButton").click(function(e) {
		$("#textBox").html("Click on a tile next to the open space to move the tile. Clicking starts the timer.");		
		board.mix();
		//$("#postButton").hide();		
		$("#navDiv").show();
		gameTimer.resetTimer();
		gameStart = false;
		gameIsDone = false;
	}
	);
	
	$("#timerButton").click(function(e) {
		$("#textBox").html("The <em>Timer</em> button toggles the timer.");	
		var t = $('#timeSpan');
		if( t.is(':visible') ) {
			t.hide();
		}
		else {
			t.show();
		}
	}
	);
	
	$(".rdoButton").click(function(e) {
		//$("#postButton").hide();
		var inOrder = board.isSolved();
		var val = $("input:radio[name='rdoSize']:checked").val();
		Config.prototype.setSize(+val);
		if (inOrder) {
			board.initNoMix();
		}
		else {
			board.init();
			gameTimer.resetTimer();		
			gameStart = false;
			gameIsDone = false;			
		}

		if (! Config.prototype.isNumbers) {
			Config.prototype.createPicImages(Config.prototype.bigCanvas);
		}
	}
	);
	
	$("#pictureButton").click(function(e) {
		$("#postDiv").hide();	
		$("#pictureDiv").show();		
		pic.init();
	}
	);
	
	$("#numbersButton").click(function(e) {
		$("#numbersButton").hide();
		Config.prototype.isNumbers = true;
		switchPics();
	}
	);

	$("#postButton").click(function(e) {
		$("#pictureDiv").hide();	
		$("#postDiv").show();		
		post.init();
	}
	);
}

function canvasSupport () {
	return Modernizr.canvas;
}

function canvasApp(){
	if (!canvasSupport()) {
		return;
	}
	else {
		theCanvas = document.getElementById("canvas");
		//theCanvas.addEventListener("mousemove", onMouseMove, false);
		theCanvas.addEventListener("click", onMouseClick, false);	
		context = theCanvas.getContext("2d"); 
		
		transform = new Transform(context);
		board = new Board();
		board.init();
		gameTimer = new GameTimer();
		$("#radio3").prop("checked", true);			
		glyph1 = new Glyph("image/blueball.png", 40, 40);
		glyph2 = new Glyph("image/yellowball.png", 40, 40);
		glyph3 = new Glyph("image/orangeball.png", 40, 40);	
		wheel = new Wheel("image/wheel.png", 284, 284);
		fBook = new FBook();
		pic = new Pic(fBook);
		post = new Post(fBook);
	}

	window.setInterval(drawScreen, 60);
}

function drawScreen() {
	transform.setIdentity();
	context.fillStyle = this.backColor;
	context.fillRect(0, 0, 600, 500);
	board.drawBoard(context);
	glyph1.show(context);
	glyph2.show(context);
	glyph3.show(context);
	board.drawSquare(context, 1);
	wheel.show(context);	

	++drawCounter;
	if (drawCounter >= 3) {
		$("#timeSpan").html(gameTimer.timerString());
		drawCounter = 0;
	}
}

function onMouseMove(e) {
	var mouseX = e.clientX - theCanvas.offsetLeft;
	var mouseY = e.clientY - theCanvas.offsetTop;
}

function onMouseClick(e) {
	if (! gameStart) {
		if (! gameTimer.isRunning()) {
			gameTimer.startTimer();
		}
		if ($("#navDiv").length) {
			$("#navDiv").hide();
		}
		//$("#postButton").hide();
		gameStart = true;
	}

	var mouseX = e.clientX - theCanvas.offsetLeft;
	var mouseY = e.clientY - theCanvas.offsetTop;
	$("#textBox").html("Click on a tile next to the open space to move the tile. Order the tiles left to right.");
	var solved = board.mouseClick(mouseX, mouseY);
	//console.log('x,y=' + mouseX + ',' + mouseY);	
}

function gameDone() {
	gameTimer.stopTimer();
	$("#navDiv").show();
	//$("#postButton").show();
	post.setCaption(true);
	$("#textBox").html("<em>You</em> solved the puzzle! Post to your Timeline.");
	if (! gameIsDone) {
		wheel.activate();
	}
	gameIsDone = true;	
}

function switchPics() {
	board.switchPics();
	if (Config.prototype.isNumbers) {
		$("#numbersButton").hide();
	}
	else {
		$("#numbersButton").show();
	}
}
