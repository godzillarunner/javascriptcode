function Wheel(imgSrc, width, height) {
    this.img = document.createElement("img");
    this.img.src = imgSrc;
	this.img.width = width;
	this.img.height = height;
    this.height = height;
    this.width = width;	
	this.x = 70+38;
	this.y = 60+38;
	this.tx = this.x + (this.width / 2);
	this.ty = this.y + (this.height / 2);
	this.theta = 0.0;
	this.thetaInc = 0.0; //Math.PI / 18.0;
	this.thetaIncInc = Math.PI / 180.0;
	this.thetaIncMax = (Math.PI / 18.0) - 0.05;
	this.active = false;
	this.count = 0;
	this.restMax = 17;
	this.restCount = 0;
	this.countMax = 70;
	this.pi2 = (Math.PI * 2);
	this.scale = 0.0;
	this.scaleInc = 0.2;
	this.scaleRestCount = 12;
}

Wheel.prototype.show = function(context) {
	if (! this.active) {
		return;
	}
	context.save();
    context.translate(this.tx, this.ty);

	if (this.restCount > this.scaleRestCount) {
		this.scale -= this.scaleInc;
		context.scale(this.scale, this.scale);
	}
	else if (this.scale < 1.0) {
		this.scale += this.scaleInc;
		context.scale(this.scale, this.scale);
	}	
    context.rotate(this.theta);
    context.translate(-this.tx, -this.ty);

	this.theta = this.theta + this.thetaInc;
	if (this.theta >= this.pi2) {
		this.theta = this.theta - this.pi2;
	}
	if (this.thetaInc < this.thetaIncMax && this.count <= this.countMax) {
		this.thetaInc = this.thetaInc + this.thetaIncInc;
	}
	context.drawImage(this.img, this.x, this.y, this.width, this.height);
	context.restore();
	++this.count;
	if (this.count > this.countMax) {
		++this.restCount;
		this.thetaInc = this.thetaInc - this.thetaIncInc;
		if (this.restCount > this.restMax) {
			this.count = 0;
			this.restCount = 0;
			this.thetaInc = 0.0;
			this.scale = 0.0;
			this.active = false;
		}
	}
}

Wheel.prototype.activate = function() {
	this.active = true;
}

Wheel.prototype.isActive = function() {
	return this.active;
}