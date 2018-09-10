function Glyph(imgSrc, width, height) {
    this.img = document.createElement("img");
    this.img.src = imgSrc;
	this.img.width = width;
	this.img.height = height;
    this.height = height;
    this.width = width;	
    this.xBoundL = 70;
    this.xBoundR = 429;
    this.yBoundT = 60;
    this.yBoundB = 419;
    this.x = Math.floor(Math.random()*(360-this.width)+this.xBoundL);
    this.y = Math.floor(Math.random()*(360-this.height)+this.yBoundT);
    this.xSpeed = 8;
    this.ySpeed = 10;
	this.active = true;
}

Glyph.prototype.show = function(context) {  
    this.move(context);
}

Glyph.prototype.move = function(context) {
	var xr;
	var yr;
    
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
 
    if (this.x < this.xBoundL) {
		xr = this.xBoundL - this.x;
		this.x = this.xBoundL + xr;
		this.xSpeed = -this.randSpeed(this.xSpeed);
    }
    else if ((this.x+this.width-1) > this.xBoundR) {
		xr = (this.x+this.width-1) - this.xBoundR;
		this.x = this.xBoundR - xr -this.width;
		this.xSpeed = -this.randSpeed(this.xSpeed);		
    }
    
    if (this.y < this.yBoundT) {
		yr = this.yBoundT - this.y;
		this.y = this.yBoundT + yr;
		this.ySpeed = -this.randSpeed(this.ySpeed);		
    }
    else if ((this.y+this.height-1) > this.yBoundB) {
		yr = (this.y+this.height-1) - this.yBoundB;
		this.y = this.yBoundB - yr - this.height;
		this.ySpeed = -this.randSpeed(this.ySpeed);			
    }    
 
	context.drawImage(this.img, this.x, this.y, this.width, this.height);
}

Glyph.prototype.setImg = function(imgSrc) {
    this.imgSrc = imgSrc;
    this.img.src = imgSrc;
}

Glyph.prototype.setSpeed = function(xSpeed, ySpeed) {
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
}

Glyph.prototype.setBounds = function(xBoundL, xBoundR, yBoundT, yBoundB) {
    this.xBoundL = xBoundL;
    this.xBoundR = xBoundR;
    this.yBoundT = yBoundT;
    this.yBoundB = yBoundB;
}

Glyph.prototype.activate = function(active) {
    this.active = active;
}

Glyph.prototype.randSpeed = function(speed) {
	var ran = Math.floor(Math.random()*3.0)+1; 
	if (ran == 1) {
		return speed;
	}
	else if (ran == 2) {
		if ((speed >= 0 && speed < 16) || speed < -6) {
			return speed + 1;
		}
	}
	else if (ran == 3) {
		if (speed > 6 || (speed <= 0 && speed > -16)) {
			return speed - 1;
		}
	}
	return speed;
}