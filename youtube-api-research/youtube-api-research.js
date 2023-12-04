// console.log("hello")

// // Happy div
// function happy(){
//   var videoEl = document.getElementById("video");
//   var id = fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUwobzUc3z-0PrFpoRxNszXQ&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
//   .then(res => res.json())
// //   .then(data => {
//     console.log(data);
// console.log(id)
// }

function happy(){
var videoEl = document.getElementById("video");
var id = fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUwobzUc3z-0PrFpoRxNszXQ&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
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
      var youtubeUrl = "https://www.youtube.com/embed/" + videoId;

      console.log(youtubeUrl)
      var iframeElement = document.createElement('iframe');
      iframeElement.src = youtubeUrl;
      videoEl.appendChild(iframeElement);
      
  });
}

var happyButton = document.querySelector(".happy");
var videoEL = document.getElementById("video")
happyButton.addEventListener('click', function(e) {
  videoEL.innerHTML = '';
  happy();
});





// console.log("test")


// video IDs
// happy id MBRCnjVecq8&ab
// stress id BtXPQimVhg&ab
//  anxious id 79kpoGF8KWU&ab
// lFcSrYw-ARY&ab


// var videoEl = document.getElementById("video");

// var happyPLaylist = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=" + "PLAQ7nLSEnhWTEihjeM1I-ToPDJEKfZHZu&" + "key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego"

// console.log(happyPLaylist)

// var id = fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=" + "PLAQ7nLSEnhWTEihjeM1I-ToPDJEKfZHZu&" + "key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//     console.log(data.items[0].snippet.title);
//     videoEl.innerText = data.items[0].snippet.title;
//     console.log(data.items[0].snippet.resourceId
//       .videoId)
//       var videoId = data.items[0].snippet.resourceId
//       .videoId
//       console.log(videoId)
//       var youtubeUrl = "https://www.youtube.com/embed/" + videoId;

//       console.log(youtubeUrl)
//       var iframeElement = document.createElement('iframe');
//       iframeElement.src = youtubeUrl;
//       document.body.appendChild(iframeElement);
      
//   });

