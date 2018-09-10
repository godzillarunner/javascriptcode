
function FBook() {
  this.isInit = false;
  this.isLoggedIn = false;
  this.albumId = 0;
  this.callbackObj = null;
  this.callbackInit = null;
  this.callbackLogin = null;  
  this.callbackPics = null;
  this.callbackFeed = null;
  this.timeoutID = 0;
}

FBook.prototype.setCallbacks = function(callbackObj ) {
  this.callbackObj = callbackObj;
  this.callbackInit = callbackObj.callbackInit;
  this.callbackLogin = callbackObj.callbackLogin;
  if (callbackObj.callbackPics) {
	this.callbackPics = callbackObj.callbackPics;
  }
  if (callbackObj.callbackFeed) {
	this.callbackFeed = callbackObj.callbackFeed;
  }
}

FBook.prototype.init = function(fBook) {
  this.isInit = true;

  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '250090135155220',
      //channelUrl : '//www.muddysock.com/tile/channel.html', // Channel file for x-domain comms
      status     : true,                                 // Check Facebook Login status
      xfbml      : true                                  // Look for social plugins on the page
    });
	
	FB.getLoginStatus(function(response) {
	  var isLoggedIn = false;	  
	  if (response.status === 'connected') {
		isLoggedIn = true;
	  } else if (response.status === 'not_authorized') {

	  } else {

	  }
	  if (fBook.callbackInit) {
		fBook.callbackInit(fBook, isLoggedIn);
	  }
	 });
  };
  
 // Load the SDK asynchronously
  var result = (function(d, s, id){
     var js;
	 //var fjs = d.getElementsByTagName(s)[0];
	 var fjs = d.getElementById("fb-foot");
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}

FBook.prototype.isApiLoaded = function() {
  return typeof(FB) == "object";
}

FBook.prototype.loginStatus = function(fBook) {
  
  FB.getLoginStatus(function(response) {
	var isLoggedIn = false;	  
	if (response.status === 'connected') {
	  isLoggedIn = true;
	} else if (response.status === 'not_authorized') {

	} else {

	}
	if (fBook.callbackInit) {
	  fBook.callbackInit(fBook, isLoggedIn);
	}
   });  
}

FBook.prototype.getPicsAlbumName = function(fBook, albumName) {
   
   FB.api('/me/albums', 'get', {},
	  function(response) {
		  var albumId = 0;
		  var album;
		  if (response.data.length > 0) {
			for (var i=0; i<response.data.length; i++) {
			  album = response.data[i];
			  if (album.name == albumName) {
				albumId = album.id;
				fBook.getPicsAlbumId(fBook, albumId);
				return;
			  }
			}
			album = response.data[0];
			albumId = album.id;
			fBook.getPicsAlbumId(fBook, albumId);			
		  }
		  else {

		  }
	  });  
}

FBook.prototype.getPicsAlbumId = function(fBook, albumId) {
  FB.api('/' + albumId + '/photos', 'get', {limit: 24},
	  function(response) {
		  if (response && !response.error) {
			if (fBook.callbackPics) {
			  fBook.callbackPics(fBook, response.data);
			}
		  }
		  else {
		  }
	  });
}

FBook.prototype.login = function(fBook) {
   
   FB.login(function(response) {
   if (response.authResponse) {
     FB.api('/me', function(response) {
	  if (fBook.callbackLogin) {
		fBook.callbackLogin(fBook);
	  }
     });
   } else {
	 
   }
 },{scope: 'user_photos,publish_actions'});
}

FBook.prototype.feed = function(fBook, caption, comment, timeStr) {
	var mess = caption + " " + comment;
	if (timeStr.length > 0) {
		mess = mess + " " + timeStr;
	}
	FB.api("/me/feed", "post", { 
			message     : mess,
			link        : 'https://apps.facebook.com/rjwapps',
			picture     : 'http://www.muddysock.com/tile/image/tspost.jpg', //'https://secure39.webhostinghub.com/~muddys6/tile/image/tspost.jpg'
			name        : 'TileSlider',
			description : 'Tile Slider Puzzle'
		}, 
		fBook.callbackFeed);
}



