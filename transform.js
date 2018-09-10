function Transform(context) {
	this.matrix = new Array(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
	this.context = context;
}

Transform.prototype.setIdentity = function() {
	this.matrix[0] = 1.0;
	this.matrix[1] = 0.0;
	this.matrix[2] = 0.0;
	this.matrix[3] = 1.0;
	this.matrix[4] = 0.0;
	this.matrix[5] = 0.0;

	this.setTransform(this.matrix);
}
Transform.prototype.cloneMatrix = function() {
	return [this.matrix[0], this.matrix[1], this.matrix[2], this.matrix[3], this.matrix[4], this.matrix[5]];
}
Transform.prototype.copyMatrix = function(matrix) {
	matrix[0] = this.matrix[0];	
	matrix[1] = this.matrix[1];
	matrix[2] = this.matrix[2];	
	matrix[3] = this.matrix[3];
	matrix[4] = this.matrix[4];
	matrix[5] = this.matrix[5];
}
Transform.prototype.setTransform = function(matrix) {
	this.context.setTransform(matrix[0],matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
}
Transform.prototype.translate = function(x, y) {
	this.matrix[4] += this.matrix[0]*x + this.matrix[2]*y;
	this.matrix[5] += this.matrix[1]*x + this.matrix[3]*y;
	
	this.setTransform(this.matrix);
}
Transform.prototype.rotate = function(theta) {
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	
	var m11 = this.matrix[0] * c + this.matrix[2] * s;
    var m12 = this.matrix[1] * c + this.matrix[3] * s;
    var m21 = this.matrix[0] * -s + this.matrix[2] * c;
    var m22 = this.matrix[1] * -s + this.matrix[3] * c;
    this.matrix[0] = m11;
    this.matrix[1] = m12;
    this.matrix[2] = m21;
    this.matrix[3] = m22;

    this.setTransform(this.matrix);
}
Transform.prototype.scale = function(sx, sy) {
        this.matrix[0] *= sx;
        this.matrix[1] *= sx;
        this.matrix[2] *= sy;
        this.matrix[3] *= sy;

        this.setTransform(this.matrix);
}

Transform.prototype.transformPts = function(pts) {
	var len = pts.length;
	var pt, ptp;
	ptp = new Point(0, 0);
	for (var i=0; i<len; i++) {
		pt = pts[i];
		ptp.x = this.matrix[0]*pt.x + this.matrix[2]*pt.y + this.matrix[4];
		ptp.y = this.matrix[1]*pt.x + this.matrix[3]*pt.y + this.matrix[5];
		pt.x = ptp.x;
		pt.y = ptp.y;
	}
}