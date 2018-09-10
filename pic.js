function Pic(fBook) {
	this.fBook = fBook;
	this.imgArray = new Array();
	this.picInd = 0;
	
	var picObj = this;
	
	$("#picSelectButton").click(function(e) {
		e.preventDefault();
		picObj.selectPic(picObj);
		$("#pictureDiv").hide();		
	}
	);
	
	$("#picCancelButton").click(function(e) {
		$("#pictureDiv").hide();
	}
	);
	
	$("#picLoginButton").click(function(e) {
		fBook.login(fBook);
	}
	);
	
	$("#picForwardButton").click(function(e) {
		picObj.showPic(true, false, picObj);
	}
	);
	
	$("#picBackwardButton").click(function(e) {
		picObj.showPic(false, true, picObj);
	}
	);
}

Pic.prototype.init = function() {
	$("#picLoginDiv").hide();
	$("#picSelectButton").hide();		
	$("#picSelectDiv").hide();
	$("#picImg").get(0).src = "";	
	$("#picSorryDiv").hide();	
	$("#picLoadingDiv").show();	
	var fBook = this.fBook;
	fBook.setCallbacks(this);	
	fBook.timeoutID = window.setTimeout(function() {
		if (! fBook.isApiLoaded()) {
			$("#picLoadingDiv").hide();			
			$("#picLoginDiv").hide();
			$("#picSelectButton").hide();		
			$("#picSelectDiv").hide();
			$("#picSorryDiv").show();
		}								
	}, 10000);
	window.setTimeout(function() {
		if (! fBook.isInit) {
			fBook.init(fBook);
		}
		else if (! fBook.isApiLoaded()) {		
			$("#picLoadingDiv").hide();			
			$("#picLoginDiv").hide();
			$("#picSelectButton").hide();		
			$("#picSelectDiv").hide();
			$("#picSorryDiv").show();
		}	
		else {			
			fBook.loginStatus(fBook);
		}				
	},100);
}

Pic.prototype.callbackInit = function(fBook, isLoggedIn) {
	window.clearTimeout(fBook.timeoutID);
	if (isLoggedIn) {
		$("#picLoadingDiv").hide();
		$("#picSorryDiv").hide();		
		$("#picLoginDiv").hide();
		$("#picSelectButton").show();		
		$("#picSelectDiv").show();
		fBook.getPicsAlbumName(fBook, "Timeline Photos");
	}
	else {
		$("#picLoadingDiv").hide();
		$("#picSorryDiv").hide();		
		$("#picSelectDiv").hide();
		$("#picSelectButton").hide();		
		$("#picLoginDiv").show();	
	}
}

Pic.prototype.callbackLogin = function(fBook) {
	$("#picLoginDiv").hide();
	$("#picSelectButton").show();	
	$("#picSelectDiv").show();	
	fBook.getPicsAlbumName(fBook, "Timeline Photos");
}

Pic.prototype.callbackPics = function(fBook, data) {
	var imgArray = fBook.callbackObj.imgArray;
		
	for (var i=0; i<data.length; i++) {
		var imgs = data[i].images;
		var img = imgs[imgs.length-1];
		var width = img.width;
		var height = img.height;
		if (width > height) {
			if (width > 200) {
				height = Math.floor((height*200)/width);				
				width = 200;
			}
		}
		else if (height > width) {
			if (height > 200) {
				width = Math.floor((width*200)/height);				
				height = 200;
			}			
		}
		else {
			if (width > 200) {
				width = 200;
				height = 200;
			}
		}

		var bigImg = img;		
		for (j=imgs.length-2; j>=0; j--) {
			bigImg = imgs[j];
			if (bigImg.width >= 360 && bigImg.height >= 360) {
				break;
			}
		}
		if (bigImg.width >= 360 && bigImg.height >= 360) {		
			imgArray[imgArray.length] = { source: img.source, width: width, height: height,
				bigSource: bigImg.source, bigWidth: bigImg.width, bigHeight: bigImg.height};
		}
	}
	
	if (fBook.callbackObj.picInd >= imgArray.length) {
		fBook.callbackObj.picInd = 0;
	}
	
	if (imgArray.length > 0) {
		fBook.callbackObj.showPic(false, false, fBook.callbackObj);		//code
	}
	else {
		$("#picSelectButton").hide();		
		$("#picSelectDiv").hide();			
		$("#picLoginDiv").hide();	
		$("#picLoadingDiv").hide();
		$("#picSorryDiv").show();		
	}
}

Pic.prototype.showPic = function(inc, dec, picObj) {
	$("#picLoginDiv").hide();
	$("#picSorryDiv").hide();	
	$("#picLoadingDiv").hide();
	$("#picSelectButton").show();		
	$("#picSelectDiv").show();
	
	var picImg = $("#picImg").get(0);	
	if (inc) {
		++picObj.picInd;
		if (picObj.picInd >= picObj.imgArray.length) {
			picObj.picInd = 0;
		}
	}
	else if (dec) {
		--picObj.picInd;
		if (picObj.picInd < 0) {
			picObj.picInd = picObj.imgArray.length - 1;
		}
	}
	picImg.src = picObj.imgArray[picObj.picInd].source;
	picImg.onload = function() {
		picImg.width = picObj.imgArray[picObj.picInd].width;
		picImg.height = picObj.imgArray[picObj.picInd].height;
		picImg.style.marginTop = (200 - picImg.height) + "px";	
	};
	//$("#picImg").css("margin-top", 200 - picImg.height);
}

Pic.prototype.selectPic = function(picObj) {		
	var canvas = document.createElement('canvas');
	var imgObj = picObj.imgArray[picObj.picInd];
	var img = document.createElement('img');	
	img.setAttribute('crossOrigin','anonymous');		
	img.onload = function() {
		img.onload = null;
		var width = imgObj.bigWidth;
		var height = imgObj.bigHeight;
		var newWidth = width;
		var newHeight = height;
		var x = 0;
		var y = 0;

		if (width < height) {
			newHeight = width;
			y = Math.floor((height - newHeight) / 2);
		}
		else if (height < width) {
			newWidth = height;
			x = Math.floor((width - newWidth) / 2);	
		}
		
		canvas.width = 360;
		canvas.height = 360;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, x, y, newWidth, newHeight, 0, 0, 360, 360);	
		Config.prototype.createPicImages(canvas);				
	};
	img.src = imgObj.bigSource;
	
	
	//$("#debugDiv").append(img);
}

