var accessToken = 'EAACpcpF29kEBAHe5U68IjS7ddP6XnYSG9OQrN7cNDdjZC7ir63VUXysVEFPZApxocOY4FPVSHlVcUJ9KnGza0IS97p7RKeW9zfYH2lVo62mmZBZBJAm1I5o7IDDC5tPaQhh15XZCeZCa6xzQlDxcMROzUqPFwLCSYZD';

window.fbAsyncInit = function() {
    FB.init({
      appId      : '186309531858497',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
  };
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

//get photos from album
function loadPicture(){
  FB.api('748550208656844/photos?type=uploaded&access_token=' + accessToken, 'get', loadPhotosCallback);
}

function loadPhotosCallback(response){
    console.log(JSON.stringify(response));
    var isFirst = true;
    for(var i = 0; i < response.data.length; i++){
      initSlidesIndicators(i)
      loadImage(response.data[i].id, isFirst);
      isFirst = false;
    }
}

function loadImage(id, isFirst){
    FB.api(id + '?fields=likes,images&access_token=' + accessToken, 'get', function (response){
      loadImageCallback(isFirst, response);
    });
}

function loadImageCallback(isFirst, response){
    console.log(JSON.stringify(response));
    var url = response.images[1]["source"];
    var likeCount = 0;
    if(response.likes != null)
      likeCount = response.likes.data.length;
    $('#gallery').append('<div class="item' + (isFirst? " active ":"") + '"><img class="d-block img-fluid center-block" src="' + url + '" > <div class="carousel-caption d-none d-md-block"> <p>' + likeCount + ' people like this photo on facebook </p></div></div>');
}

function initSlidesIndicators(i){
  $('#indicators-group').append('<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '"' + (i == 0? ' class="active"':'') +  '></li>');
}




