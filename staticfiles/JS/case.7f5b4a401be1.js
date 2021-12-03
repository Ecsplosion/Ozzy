console.log('Case Script Loaded')
var videosX = document.getElementsByTagName('video');
var videos = document.getElementsByClassName('my-video')
var general_view_button = document.getElementById('general-view-button');
var top_view_button = document.getElementById('top-view-button');
var bottom_view_button = document.getElementById('bottom-view-button');
var left_view_button = document.getElementById('left-view-button');
var right_view_button = document.getElementById('right-view-button');
var front_view_button = document.getElementById('front-view-button');
var videoType = document.getElementById('video-header');
let general_video = 'general-view-video';
let top_video = 'top-view-video';
let bottom_video = 'bottom-view-video';
let left_video = 'left-view-video';
let right_video = 'right-view-video';
let front_video = 'front-view-video';
//Functions:
if(general_view_button) {
general_view_button.addEventListener("click", function(){
    videoType.innerText = 'General View';   
  for (i=0; i<=videos.length; i++){
    if (videos[i].id == general_video){ 
        if(!videos[i].classList.contains('my-active')){
            videos[i].classList.add('my-active');
        }
    } else {
        videos[i].classList.remove('my-active');  
        videos[i].pause();
    }
  }
  });
}
top_view_button.addEventListener("click", function(){
    for (i=0; i<=videos.length; i++){
      if (videos[i].id == top_video){ 
        if(!videos[i].classList.contains('my-active')){
            videos[i].classList.add('my-active');
        }
      } else {
          videos[i].classList.remove('my-active');  
          videos[i].pause();
      }
    }
  });
  
bottom_view_button.addEventListener("click", function(){
  for (i=0; i<=videos.length; i++){
    if (videos[i].id == bottom_video){ 
      if(!videos[i].classList.contains('my-active')){
          videos[i].classList.add('my-active');
      }
    } else {
        videos[i].classList.remove('my-active');  
        videos[i].pause();
    }
  }
});

left_view_button.addEventListener("click", function(){
  for (i=0; i<=videos.length; i++){
    if (videos[i].id == left_video){ 
      if(!videos[i].classList.contains('my-active')){
          videos[i].classList.add('my-active');
      }
    } else {
        videos[i].classList.remove('my-active');  
        videos[i].pause();
    }
  }
});

right_view_button.addEventListener("click", function(){
  
  for (i=0; i<=videos.length; i++){
    if (videos[i].id == right_video){ 
      if(!videos[i].classList.contains('my-active')){
          videos[i].classList.add('my-active');
      }
    } else {
        videos[i].classList.remove('my-active');  
        videos[i].pause();
    }
  }
});

front_view_button.addEventListener("click", function(){
  for (i=0; i<=videos.length; i++){
    if (videos[i].id == front_video){ 
      if(!videos[i].classList.contains('my-active')){
          videos[i].classList.add('my-active');
      }
    } else {
        videos[i].classList.remove('my-active');  
        videos[i].pause();
    }
  }
}); 


