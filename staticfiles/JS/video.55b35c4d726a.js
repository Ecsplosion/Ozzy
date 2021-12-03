let playbackButton = document.getElementById("play-pause");
let video = document.querySelector('.video');
let juice = document.querySelector('.orange-juice')
let progress = document.querySelector('.orange-bar')
console.log(juice)
playbackButton.addEventListener("click", function(){
    if(video.paused){
        playbackButton.className = 'pause';
        video.play()
    } else{
        playbackButton.className = 'play';
        video.pause()
    }
})
video.addEventListener('timeupdate', function(){
    var juiscePos = video.currentTime / video.duration;
    juice.style.width = juiscePos * 100 + "%";
})
progress.addEventListener("click" ,function(e){
    const progressTime = (e.offsetX/ progress.offsetWidth) * video.duration;
    video.currentTime = progressTime; 
})