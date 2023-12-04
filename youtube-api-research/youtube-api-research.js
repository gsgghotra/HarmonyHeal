function happy(){
var videoEl = document.getElementById("video");
fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=DgUgm2Ww1T4&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    console.log(data.items[0].snippet.title);
    videoEl.innerText = data.items[0].snippet.title;

      var videoId = data.items[0].id
      console.log(videoId)
      var channelId = data.items[0].snippet.channelTitle

      console.log(channelId)
      var youtubeUrl = "https://www.youtube.com/embed/" + videoId

      console.log(youtubeUrl)
      var iframeElement = document.createElement('iframe');
      iframeElement.src = youtubeUrl;
      videoEl.appendChild(iframeElement);
      
  });
}


var happyButton = document.querySelector(".happy");
var videoEl = document.getElementById("video")
happyButton.addEventListener('click', function(e) {
  videoEl.innerHTML = '';
  happy();
});







