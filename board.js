function Board() {
	this.boardImg = null;
	this.squares = new Array();
	this.xOffset = 70;
	this.yOffset = 60;
	this.boardXOffset = 30;
	this.boardYOffset = 20;
	this.sqrSize = 0;
}

Board.prototype.init = function() {
	this.initNoMix();	
	this.mix();	
}

Board.prototype.initNoMix = function() {
	this.boardImg = new Image();
	this.boardImg.src = 'image/board.png';
	
	for (var i=1; i<Config.prototype.tileCount; i++) {
		var sqr = new Square();
		sqr.init(this, i);	
		this.squares[i] = sqr;
		this.xyFromIndex(sqr, i);		
	}
	this.sqrSize = this.squares[1].size;
	this.squares[Config.prototype.tileCount] = null;
}

Board.prototype.switchPics = function() {
	for (var i=1; i<=Config.prototype.tileCount; i++) {
		var sqr = this.squares[i];
		if (sqr != null) {
			sqr.switchPic();				//code		
		}		
	}	
}

Board.prototype.mix = function() {
	var mixCount = Math.floor((Math.random()*100)+297);
	var index;
	var lastSqr = null;
	var row, col;
	
	for (var i = 0; i<mixCount; i++) {
		var blank = this.blankIndex();
		var cc = Math.floor((Math.random()*4)+1);
		
		if (cc==1) {
			col = (blank-1) % Config.prototype.size;
			if (col > 0) {
				index = blank - 1;
				if (lastSqr==null || lastSqr.index != this.squares[index].index) this.squares[index].moveRightNow(index);				
			}
			else {
				index = blank + 1;
				if (lastSqr==null || lastSqr.index != this.squares[index].index) this.squares[index].moveLeftNow(index);				
			}
		}
		else if (cc==2) {
			col = (blank-1) % Config.prototype.size;
			if (col < (Config.prototype.size-1)) {
				index = blank + 1;
				if (lastSqr==null || lastSqr.index != this.squares[index].index) this.squares[index].moveLeftNow(index);				
			}
			else {
				index = blank - 1;
				if (lastSqr==null || lastSqr.index != this.squares[index].index) this.squares[index].moveRightNow(index);				
			}
		}
		else if (cc==3) {
			row = Math.floor((blank-1)/Config.prototype.size);			
			if (row < (Config.prototype.size-1)) {
				index = blank + Config.prototype.size;
				if (lastSqr==null || lastSqr.index != this.squares[index].index) this.squares[index].moveUpNow(index);				
			}
			else {
				index = blank - Config.prototype.size;
				if (lastSqr==null || lastSqr.index != this.squares[index].index) this.squares[index].moveDownNow(index);				
			}
		}
		else if (cc==4) {
			row = Math.floor((blank-1)/Config.prototype.size);			
			if (row > 0) {
				index = blank - Config.prototype.size;
				if (lastSqr==null || lastSqr.index != this.squares[index].index) this.squares[index].moveDownNow(index);				
			}
			else {
				index = blank + Config.prototype.size;
				if (lastSqr==null || lastSqr.index != this.squares[index].index) this.squares[index].moveUpNow(index);				
			}
		}		
		var sqr = this.squares[index];
		if (lastSqr==null || lastSqr.index != sqr.index) {
			lastSqr = sqr;
			this.squares[blank] = sqr;
			this.squares[index] = null;
		}
	}
}

Board.prototype.xyFromIndex = function(sqr, pos)
{
	var row = 0;
	var col = 0;
	
	row = Math.floor((pos-1)/Config.prototype.size);
	col = (pos-1) % Config.prototype.size;
			
	sqr.x = this.xOffset + (sqr.size * col);
	sqr.y = this.yOffset + (sqr.size * row);							
}

Board.prototype.indexFromXY = function(x, y) {
	var col = Math.floor(x / this.sqrSize);
	var row = Math.floor(y / this.sqrSize);
	return (row*Config.prototype.size)+col+1;
}

Board.prototype.blankIndex = function() {
	for (var i=1; i<=Config.prototype.tileCount; i++) {
		if (this.squares[i] == null) {
			return i;
		}
	}
	return 0;
}

Board.prototype.drawBoard = function(context) {
	context.drawImage(this.boardImg, this.boardXOffset, this.boardYOffset);	
}

Board.prototype.drawSquare = function(context, squareNum)
{
	for (var i=1; i<=Config.prototype.tileCount; i++) {
		if (this.squares[i] != null) {
			this.squares[i].moveSquare(context);
		}
	}
}

Board.prototype.squareMove = function(index) {
	var blank = this.blankIndex();
	var col, row;
	
	if (blank==index-1) {
		col = (index-1) % Config.prototype.size;
		if (col > 0) {
			this.squares[index].moveLeft(index);
		}
	}
	else if (blank==index+1) {
		col = (index-1) % Config.prototype.size;
		if (col < (Config.prototype.size-1)) {		
			this.squares[index].moveRight(index);
		}
	}
	else if (blank==index+Config.prototype.size) {
		this.squares[index].moveDown(index);
	}
	else if (blank==index-Config.prototype.size) {
		this.squares[index].moveUp(index);
	}
}

Board.prototype.mouseClick = function(x, y) {
	x -= this.xOffset;
	y -= this.yOffset;
	if (x >= 0 && y >= 0 && x < Config.prototype.boardSize && y < Config.prototype.boardSize) {
		var col = Math.floor(x / this.sqrSize);
		var row = Math.floor(y / this.sqrSize);
		var index = (row*Config.prototype.size)+col+1;
		this.squareMove(index);
	}
}

Board.prototype.isSolved = function() {
	for (var i=1; i<Config.prototype.tileCount; i++) {
		var sqr = this.squares[i];
		if (sqr == null || sqr.index != i) {
			return false;
		}
	}
	return true;
}

Board.prototype.sqrCallback = function(index) {
	var blank = this.blankIndex();
	var sqr = this.squares[index];
	this.squares[blank] = sqr;
	this.squares[index] = null;
	
	if (this.isSolved()) {
		gameDone();		
	}	
}
