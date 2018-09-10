function Square() {
    this.x = 0;
    this.y = 0;
    this.size = Config.prototype.pixelSize;
    this.xSpeed = 24;
    this.ySpeed = 24;
    this.xMoveSpeed = 0;
    this.yMoveSpeed = 0;
    this.xMoveAdjust = 0;
    this.yMoveAdjust = 0;	
    this.moveCount = 0;
    this.move = 0;  // 1 = left, 2 = right, 3 = down, 4 = up
	this.index = 0;
	this.moveIndex = 0;
    this.img = null;
	this.board = null;
}

Square.prototype.init = function(board, index)
{
	this.board = board;
	this.img = new Image();
	this.img.src = Config.prototype.sqrImages[index];
    this.x = 0;
    this.y = 0;
	this.index = index;
}

Square.prototype.switchPic = function() {
	if (Config.prototype.isNumbers) {
		this.img.src = Config.prototype.sqrImages[this.index]
	}
	else {
		this.img.src = Config.prototype.sqrImages[0];		
	}
}

Square.prototype.moveSquare = function(context)
{
    if (this.move)
    {
        --this.moveCount;
        this.x += this.xMoveSpeed;
        this.y += this.yMoveSpeed;
        if (this.moveCount <= 0)
        {
			this.x += this.xMoveAdjust;
			this.y += this.yMoveAdjust;
            this.move = 0;
			board.sqrCallback(this.moveIndex);
			this.moveIndex = 0;
        }      
    }
	
	if (Config.prototype.isNumbers) {
		context.fillStyle = '#4ad5cd';
		context.fillRect(this.x, this.y, this.size, this.size);	
		context.drawImage(this.img, this.x, this.y);
	}
	else {
		context.drawImage(picImages[this.index], this.x, this.y);
		context.drawImage(this.img, this.x, this.y); 			
	}
}

Square.prototype.moveLeft = function(index)
{
	if (this.move == 0) {
		this.xMoveSpeed = -this.xSpeed;
		this.yMoveSpeed = 0;
		this.moveCount = Math.floor(this.size / this.xSpeed);
		this.xMoveAdjust = -(this.size - (this.xSpeed * this.moveCount));
		this.yMoveAdjust = 0;
		this.move = 1;
		this.moveIndex = index;
	}
}

Square.prototype.moveRight = function(index)
{
	if (this.move == 0) {
		this.xMoveSpeed = this.xSpeed;
		this.yMoveSpeed = 0;
		this.moveCount = Math.floor(this.size / this.xSpeed);
		this.xMoveAdjust = this.size - (this.xSpeed * this.moveCount);
		this.yMoveAdjust = 0;
		this.move = 2;
		this.moveIndex = index;		
	}
}

Square.prototype.moveDown = function(index)
{
	if (this.move == 0) {	
		this.xMoveSpeed = 0;
		this.yMoveSpeed = this.ySpeed;
		this.moveCount = Math.floor(this.size / this.ySpeed);
		this.yMoveAdjust = this.size - (this.ySpeed * this.moveCount);
		this.xMoveAdjust = 0;
		this.move = 3;
		this.moveIndex = index;		
	}
}

Square.prototype.moveUp = function(index)
{
	if (this.move == 0) {	
		this.xMoveSpeed = 0;
		this.yMoveSpeed = -this.ySpeed;
		this.moveCount = Math.floor(this.size / this.ySpeed);
		this.yMoveAdjust = -(this.size - (this.ySpeed * this.moveCount));
		this.xMoveAdjust = 0;
		this.move = 4;
		this.moveIndex = index;		
	}
}


Square.prototype.moveLeftNow = function(index)
{
	this.x = this.x - this.size;
}

Square.prototype.moveRightNow = function(index)
{
	this.x = this.x + this.size;
}

Square.prototype.moveDownNow = function(index)
{
	this.y = this.y + this.size;
}

Square.prototype.moveUpNow = function(index)
{
	this.y = this.y - this.size;
}







