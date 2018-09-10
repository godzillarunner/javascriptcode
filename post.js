function Post(fBook) {
	this.fBook = fBook;
	this.caption = "";
	this.timeStr = "";
	var postObj = this;

	this.setCaption(false);
	$("#postPostButton").click(function(e) {
		e.preventDefault();
		var tStr = "";
		if ($("#postCB").is(":checked")) {
			tStr = postObj.timeStr;
		}
		fBook.feed(fBook, postObj.caption, $("#postText").val(), tStr);
		$("#postDiv").hide();		
	}
	);
	
	$("#postCancelButton").click(function(e) {
		$("#postDiv").hide();
	}
	);
	
	$("#postLoginButton").click(function(e) {
		fBook.login(fBook);
	}
	);
}

Post.prototype.setCaption = function(solved) {
	if (solved) {
        var sizeStr = "3 by 3";
        if (Config.prototype.size == 4) {
            sizeStr = "4 by 4";
        }
        else if (Config.prototype.size == 5) {
            sizeStr = "5 by 5";
        }	
        this.caption = "I solved the " + sizeStr + " Tile Slider puzzle.";
		this.timeStr = "Time: " + gameTimer.timerString();		
        $("#trPostTime").show();
	}
	else {
		this.caption = "I played the Tile Slider puzzle.";
		this.timeStr = "";
	}
}

Post.prototype.init = function() {				
	$("#postLoginDiv").hide();	
	$("#postSorryDiv").hide();
	$("#postPostDiv").hide();	
	$("#postPostButton").hide();
	$("#postLoadingDiv").show();	
	var fBook = this.fBook;
	fBook.setCallbacks(this);	
	fBook.timeoutID = window.setTimeout(function() {
		if (! fBook.isApiLoaded()) {	
			$("#postLoadingDiv").hide();			
			$("#postLoginDiv").hide();
			$("#postPostButton").hide();		
			$("#postPostDiv").hide();
			$("#postSorryDiv").show();
		}								
	}, 10000);
	window.setTimeout(function() {
		if (! fBook.isInit) {
			fBook.init(fBook);
		}
		else if (! fBook.isApiLoaded()) {
			$("#postLoadingDiv").hide();			
			$("#postLoginDiv").hide();
			$("#postPostButton").hide();		
			$("#postPostDiv").hide();
			$("#postSorryDiv").show();
		}	
		else {			
			fBook.loginStatus(fBook);
		}				
	},100);
}

Post.prototype.callbackInit = function(fBook, isLoggedIn) {
	window.clearTimeout(fBook.timeoutID);
	if (isLoggedIn) {
		$("#postLoadingDiv").hide();
		$("#postSorryDiv").hide();		
		$("#postLoginDiv").hide();
		$("#postPostButton").show();		
		$("#postPostDiv").show();		
		//fBook.getPicsAlbumName(fBook, "Timeline Photos");
	}
	else {
		$("#postLoadingDiv").hide();
		$("#postSorryDiv").hide();		
		$("#postPostDiv").hide();
		$("#postPostButton").hide();		
		$("#postLoginDiv").show();	
	}
}

Post.prototype.callbackLogin = function(fBook) {
	$("#postLoginDiv").hide();
	$("#postPostButton").show();	
	$("#postPostSelectDiv").show();	
	$("#postPostDiv").show();	
	//fBook.getPicsAlbumName(fBook, "Timeline Photos");
}

Post.prototype.callbackFeed = function(fBook) {
}



