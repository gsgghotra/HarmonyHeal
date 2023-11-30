console.log("hello")
// // youtube api - search endpoint



// const url = 'https://youtube138.p.rapidapi.com/auto-complete/?q=desp&hl=en&gl=US';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8412d21c6amsh6caf2d6964fecb0p154d87jsn1175739824ca',
// 		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
// 	}
// };

// fetch('https://youtube138.p.rapidapi.com/search/?q=despacito&hl=en&gl=US', options )
//   .then(function (response) {
//     return response.json();
//   }).then(function (data) {
//   console.log(data)
//   });

// youtube api - playlist endpoint

// const url = 'https://youtube138.p.rapidapi.com/playlist/details/?id=PLcirGkCPmbmFeQ1sm4wFciF03D_EroIfr&hl=en&gl=US';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8412d21c6amsh6caf2d6964fecb0p154d87jsn1175739824ca',
// 		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
// 	}
// };

// fetch('https://youtube138.p.rapidapi.com/playlist/details/?id=PLcirGkCPmbmFeQ1sm4wFciF03D_EroIfr&hl=en&gl=US', options )
//   .then(function (response) {
//     return response.json();
//   }).then(function (data) {
//   console.log(data)
//   });

  // youtube api - video endpoint

// const url = 'https://youtube138.p.rapidapi.com/video/details/?id=kJQP7kiw5Fk&hl=en&gl=US';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8412d21c6amsh6caf2d6964fecb0p154d87jsn1175739824ca',
// 		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
// 	}
// };

// fetch(url, options )
//   .then(function (response) {
//     return response.json();
//   }).then(function (data) {
//   console.log(data)
//   });

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
      var youtubeUrl = "https://www.youtube.com/watch?v=" + videoId 

      console.log(youtubeUrl)
      var iframeElement = document.createElement('iframe');
      
  });


