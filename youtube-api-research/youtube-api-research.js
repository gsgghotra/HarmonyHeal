function happy(){
var videoEl = document.getElementById("video");
fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=DgUgm2Ww1T4&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    console.log(data.items[0].snippet.title);
    var pEl = document.createElement('p');
    pEl.textContent = data.items[0].snippet.title;
    videoEl.appendChild(pEl);

      var videoId = data.items[0].id
      console.log(videoId)
      var youtubeUrl = "https://www.youtube.com/embed/" + videoId

      console.log(youtubeUrl)
      var iframeElement = document.createElement('iframe');

      iframeElement.width = 800;  
      iframeElement.height = 450; 

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

function stress(){
  var videoEl = document.getElementById("video");
  fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=6ZKYJjU9zLY&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(data.items[0].snippet.title);
      var pEl = document.createElement('p');
      pEl.textContent = data.items[0].snippet.title;
      videoEl.appendChild(pEl);
  
        var videoId = data.items[0].id
        console.log(videoId)

        var youtubeUrl = "https://www.youtube.com/embed/" + videoId
  
        console.log(youtubeUrl)
        var iframeElement = document.createElement('iframe');
  
        iframeElement.width = 800;  
        iframeElement.height = 450; 
  
        iframeElement.src = youtubeUrl;
        videoEl.appendChild(iframeElement);
        
    });
  }
  
  var stressButton = document.querySelector(".stress");
  var videoEl = document.getElementById("video")
  stressButton.addEventListener('click', function(e) {
    videoEl.innerHTML = '';
    stress();
  });

  
function anxious(){
  var videoEl = document.getElementById("video");
  fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=79kpoGF8KWU&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(data.items[0].snippet.title);
      var pEl = document.createElement('p');
      pEl.textContent = data.items[0].snippet.title;
      videoEl.appendChild(pEl);
  
        var videoId = data.items[0].id
        console.log(videoId)

        var youtubeUrl = "https://www.youtube.com/embed/" + videoId
  
        console.log(youtubeUrl)
        var iframeElement = document.createElement('iframe');
  
        iframeElement.width = 800;  
        iframeElement.height = 450; 
  
        iframeElement.src = youtubeUrl;
        videoEl.appendChild(iframeElement);
        
    });
  }
  
  var anxiousButton = document.querySelector(".anxious");
  var videoEl = document.getElementById("video")
  anxiousButton.addEventListener('click', function(e) {
    videoEl.innerHTML = '';
    anxious();
  });

  function Calm(){
    var videoEl = document.getElementById("video");
    fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=-odmbQd7b2A&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(data.items[0].snippet.title);
        var pEl = document.createElement('p');
        pEl.textContent = data.items[0].snippet.title;
        videoEl.appendChild(pEl);
    
          var videoId = data.items[0].id
          console.log(videoId)
  
          var youtubeUrl = "https://www.youtube.com/embed/" + videoId
    
          console.log(youtubeUrl)
          var iframeElement = document.createElement('iframe');
    
          iframeElement.width = 800;  
          iframeElement.height = 450; 
    
          iframeElement.src = youtubeUrl;
          videoEl.appendChild(iframeElement);
          
      });
    }
    
    var CalmButton = document.querySelector(".Calm");
    var videoEl = document.getElementById("video")
    CalmButton.addEventListener('click', function(e) {
      videoEl.innerHTML = '';
      Calm();
    });

    function Energetic(){
      var videoEl = document.getElementById("video");
      fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=hF7BkvLJwqg&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          console.log(data.items[0].snippet.title);
          var pEl = document.createElement('p');
          pEl.textContent = data.items[0].snippet.title;
          videoEl.appendChild(pEl);
      
            var videoId = data.items[0].id
            console.log(videoId)
    
            var youtubeUrl = "https://www.youtube.com/embed/" + videoId
      
            console.log(youtubeUrl)
            var iframeElement = document.createElement('iframe');
      
            iframeElement.width = 800;  
            iframeElement.height = 450; 
      
            iframeElement.src = youtubeUrl;
            videoEl.appendChild(iframeElement);
            
        });
      }
      
      var EnergeticButton = document.querySelector(".Energetic");
      var videoEl = document.getElementById("video")
      EnergeticButton.addEventListener('click', function(e) {
        videoEl.innerHTML = '';
        Energetic();
      });

      function Sleepy(){
        var videoEl = document.getElementById("video");
        fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=rQxMs3v61CI&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
          .then(res => res.json())
          .then(data => {
            console.log(data);
            console.log(data.items[0].snippet.title);
            var pEl = document.createElement('p');
            pEl.textContent = data.items[0].snippet.title;
            videoEl.appendChild(pEl);
        
              var videoId = data.items[0].id
              console.log(videoId)
      
              var youtubeUrl = "https://www.youtube.com/embed/" + videoId
        
              console.log(youtubeUrl)
              var iframeElement = document.createElement('iframe');
        
              iframeElement.width = 800;  
              iframeElement.height = 450; 
        
              iframeElement.src = youtubeUrl;
              videoEl.appendChild(iframeElement);
              
          });
        }
        
        var SleepyButton = document.querySelector(".Sleepy");
        var videoEl = document.getElementById("video")
        SleepyButton.addEventListener('click', function(e) {
          videoEl.innerHTML = '';
          Sleepy();
        });


        function Focus(){
          var videoEl = document.getElementById("video");
          fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=BdRoLg1tAkw&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
            .then(res => res.json())
            .then(data => {
              console.log(data);
              console.log(data.items[0].snippet.title);
              var pEl = document.createElement('p');
              pEl.textContent = data.items[0].snippet.title;
              videoEl.appendChild(pEl);
          
                var videoId = data.items[0].id
                console.log(videoId)
        
                var youtubeUrl = "https://www.youtube.com/embed/" + videoId
          
                console.log(youtubeUrl)
                var iframeElement = document.createElement('iframe');
          
                iframeElement.width = 800;  
                iframeElement.height = 450; 
          
                iframeElement.src = youtubeUrl;
                videoEl.appendChild(iframeElement);
                
            });
          }
          
          var FocusButton = document.querySelector(".Focus");
          var videoEl = document.getElementById("video")
          FocusButton.addEventListener('click', function(e) {
            videoEl.innerHTML = '';
            Focus();
          });

          function Heroic(){
            var videoEl = document.getElementById("video");
            fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=7C4oraQgylU&key=AIzaSyA-sowA9l04T8uxLu2Shh1Wefl0ha8zego")
              .then(res => res.json())
              .then(data => {
                console.log(data);
                console.log(data.items[0].snippet.title);
                var pEl = document.createElement('p');
                pEl.textContent = data.items[0].snippet.title;
                videoEl.appendChild(pEl);
            
                  var videoId = data.items[0].id
                  console.log(videoId)
          
                  var youtubeUrl = "https://www.youtube.com/embed/" + videoId
            
                  console.log(youtubeUrl)
                  var iframeElement = document.createElement('iframe');
            
                  iframeElement.width = 800;  
                  iframeElement.height = 450; 
            
                  iframeElement.src = youtubeUrl;
                  videoEl.appendChild(iframeElement);
                  
              });
            }
            
            var HeroicButton = document.querySelector(".Heroic");
            var videoEl = document.getElementById("video")
            HeroicButton.addEventListener('click', function(e) {
              videoEl.innerHTML = '';
              Heroic();
            });          






