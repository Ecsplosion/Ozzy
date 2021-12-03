var top_view_button = document.getElementById('top-view-button');
var bottom_view_button = document.getElementById('bottom-view-button');
var left_view_button = document.getElementById('left-view-button');
var right_view_button = document.getElementById('right-view-button');
var front_view_button = document.getElementById('front-view-button');
var videoPlayer= document.getElementById('video-viewer')

front_view_button.addEventListener("click", function(){
    videoPlayer.setAttribute('src', front_view_url)
})
top_view_button.addEventListener("click", function(){
    videoPlayer.setAttribute('src', top_view_url)
})
bottom_view_button.addEventListener("click", function(){
    videoPlayer.setAttribute('src', bottom_view_url)
})
right_view_button.addEventListener("click", function(){
    videoPlayer.setAttribute('src', right_view_url)
})
left_view_button.addEventListener("click", function(){
    videoPlayer.setAttribute('src', left_view_url)
})