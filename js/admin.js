
var pageAccessToken;
var pageId = '741456956032836';
var loggedin = false;

var locations = {
  "international" : {
  },
  "us" : {
      "countries": [
        "US"
      ],
  },
  "local" : {
      "countries": [
        "US"
      ],
      "zips": [
        {
          "key": "US:60615"
        }
      ]
   }
}

var photoTypes = {
  "wedding" : [3, 4], //married, engaged
  "engagement" : [1, 2, 4], //single, in a relationship, engaged
  "anniversary" : [3] //married
};

//start of fb init
window.fbAsyncInit = function() {
    FB.init({
      appId      : '186309531858497',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
         loggedInAction();
      }
      else{
          showSignIn();
          updateName();
      }
    });
  };

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
//end of fb init


function fbLogin(){
  FB.login(function(response) {
       if(response.status === 'connected'){
          loggedInAction();
       }
    }, {scope: 'publish_pages, manage_pages, publish_actions, read_insights'});
}

function loggedInAction(){
  showSignOut();
  updateName();
  getPageAccessToken();
}

function fbLogout(){
  console.log("logging out");
  FB.logout(function(response) {
        console.log(response);
        showSignIn();
        updateName();
    });
}

function updateName(){
  if(!loggedin){
     $("#fb-name").html('');
  }
  else{
    FB.api('me?fields=name','get', function(response){
        $("#fb-name").html(', ' + response.name);
    });
  }
}

function getPageAccessToken(){
  FB.api('/' + pageId + '?fields=access_token', 'get', function(response){
     console.log(response);
      pageAccessToken = response.access_token;
      getPosts();
      getPageViewNumber();
  });
}


function post(){
    var message_val = $("#message").val();
    var imageUrl = $("#imageUrl").val();
    var linkUrl = $("#linkUrl").val();
    if(!loggedin){
        $("#top-a").click();
    }
    else{
      FB.api('/'+pageId+'/feed', 'post', 
      { 
         message     : message_val,
         link        : linkUrl,
         picture     : imageUrl,
         access_token: pageAccessToken,
       }, 
      function(response) {
        console.log(JSON.stringify(response));
          if(response["id"] != null){
              showSucessMessage('Your post has been published.', '#success-post');
              $('#post-form').trigger("reset");
              getPosts();
          }
          else{
              showErrorMessage('#success-post');
          }
      });
    }
}

function postad(){
  var phototype = $("input[name='photo-type']:checked"). val();
  var location = $("input[name='location']:checked"). val();
  var message_val = $("#ad-message").val();
  var imageUrl = $("#ad-imageUrl").val();
  var linkUrl = $("#ad-linkUrl").val();
  console.log(phototype + location);
    if(!loggedin){
        $("#top-a").click();
    }
    else{
      FB.api('/'+pageId+'/feed', 'post', 
      { 
         "message"     : message_val,
         "link"        : linkUrl,
         "picture"     : imageUrl,
         "access_token": pageAccessToken,
         "feed_targeting": {
            "geo_locations": locations[location],
            "relationship_statuses": photoTypes[phototype]
         },
         "published":  false
       }, 
      function(response) {
         console.log(JSON.stringify(response));
          if(response["id"] != null){
              showSucessMessage('Your unpublished post has been created.', '#success-ad');
              $('#ad-form').trigger("reset");
              getPosts();
          }
          else{
              showErrorMessage('#success-ad');
          }
      });
    }
}

//newly written
function getPosts(){
  FB.api(
    pageId + '/promotable_posts?fields=is_published,message',
    'get',
     getPostsCallback
    );
}

function getPostsCallback(response){
  $("#published-posts").html("");
  $("#unpublished-posts").html("");
  for(var i = 0; i < response.data.length; i++){
    var ele = response.data[i];
    if(ele == null || ele.message == null) continue;
    var listid = ele.is_published? "published-posts" : "unpublished-posts";
    updateList(listid, ele.id, ele.message);
    getPostViewerNumber(ele.id);
  }
}

function updateList(listid, id, message){
   $("#" + listid).append('<li class="list-group-item"> <span class="hidden" id="' + id + '" ></span>' + message + '</li>');
}

function getPostViewerNumber(postId){
  FB.api(
     postId +'/insights/post_impressions_unique?access_token=' + pageAccessToken, 
    'get', 
    function(response){
      var num = response.data[0].values[0].value;
      $("#"+postId).parent().append('<span class="badge">' + num + '</span>');
    });
 }

function getPageViewNumber(){
  FB.api('/'+ pageId +'/insights/page_views_total?period=days_28&access_token=' + pageAccessToken, 'get', function(response){
     console.log(JSON.stringify(response));
     var vararr=response.data[0].values;
     var pageViewNum = vararr[vararr.length - 1].value;
     $("#total-page-view").html(". Current page view is " + pageViewNum);
    }
  );
 }

 function share(){
      FB.ui({
      method: 'send',
      link: 'https://qilehe.github.io'
    }, function(response){
      console.log(JSON.stringify(response));
  });
}

function showSignOut(){
   $("#sign-in").hide();
   $("#not-you").show();
   $("#sign-out").show();
   loggedin = true;
 }

 function showSignIn(){
   $("#sign-in").show();
   $("#sign-out").hide();
   $("#not-you").hide();
   loggedin = false;
 }

function showSucessMessage(message, id){
    $(id).html("<div class='alert alert-success'>");
    $(id + ' > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
    $(id + ' > .alert-success').append("<strong>"+message+"</strong>");
    $(id + '> .alert-success').append('</div>');
}

function showErrorMessage(id){
    $(id).html("<div class='alert alert-danger'>");
    $(id +' > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
    $(id + ' > .alert-danger').append("<strong>Sorry it seems something went wrong. Please validate your input!");
    $(id + ' > .alert-danger').append('</div>');
}
