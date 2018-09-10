function GameTimer() {
	this.startTime = null;
	this.timeStr = "00:00.0";
	this.runTimer = false;

}

GameTimer.prototype.startTimer = function() {
	this.timeStr = "00:00.0";	
    this.startTime = new Date().getTime();
	this.runTimer = true;
}

GameTimer.prototype.timerString = function() {
    if (this.runTimer) {
        var timeDiff = new Date().getTime() - this.startTime;
        var minutes = ~~((timeDiff / 1000) / 60);
        var remainder = timeDiff - (minutes * 60 * 1000);
        var seconds = ~~(remainder / 1000);
        remainder = remainder - (seconds * 1000);
        var tenths = ~~(remainder / 100);
 
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;

        this.timeStr = minutes + ":" + seconds + "." + tenths;
        return this.timeStr;
    }
    else {
        return this.timeStr;
    }
}
GameTimer.prototype.resetTimer = function() {
	this.runTimer = false;
	this.timeStr = "00:00.0";
}

GameTimer.prototype.stopTimer = function() {
	this.runTimer = false;
}

GameTimer.prototype.isRunning = function() {
	return this.runTimer;
}