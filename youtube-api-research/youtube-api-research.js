console.log("hello")


var videoEl = document.getElementById("video");
var id = fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUwobzUc3z-0PrFpoRxNszXQ&key= [api]")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    console.log(data.items[0].snippet.title);
    videoEl.innerText = data.items[0].snippet.title;
    console.log(data.items[0].snippet.resourceId
      .videoId)
      var videoId = data.items[0].snippet.resourceId
      .videoId
      console.log(videoId)
      var youtubeUrl = "https://www.youtube.com/embed?v=" + videoId 

      console.log(youtubeUrl)
      var iframeElement = document.createElement('iframe');
      iframeElement.src = youtubeUrl;
      document.body.appendChild(iframeElement);
      
  });


