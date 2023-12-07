// Get access token using client Id and secret
    //https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
const clientTag = "1485320a3c124602a";
const clientPass = "57e56b5fac7bd4f"
const client_s_token = "92fa55f6bbed40c"
const client_s_key = "38c85f572aeb0fa99"
const client_id = clientTag + clientPass;
const client_secret = client_s_token + client_s_key;

//Get token function - returns access_token
async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        },
    });
    return await response.json();
}

// Define onSpotifyIframeApiReady 
window.onSpotifyIframeApiReady = (IFrameAPI) => {
    
};
// Use iframe provided by Spotify to play the track
window.onSpotifyIframeApiReady = async (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        // Use the provided URI or a default one
        uri:  "spotify:track:6gx1y86TaoNZPTXImnw1fX"  
    };

    const callback = (EmbedController) => {
        playerControls(EmbedController)
    };
    await IFrameAPI.createController(element, options, callback);
};

//Manage user controls
async function playerControls(EmbedController){
    //Lets Click on Parent div of option
    let optionSection = document.querySelector('#optionSection');
    let title = document.querySelector("#songTitle");
    
    let artVideo = document.getElementById('artVideo');
    let playerToogleBtn = document.querySelector("#playerToogleBtn");
    let trackSlider = document.querySelector("#trackSlider");
    
    //Variable for duration
    let duration = 0; 
    let songNumber = 0;

    //Tracks Holder
    let allTracks;

    //Click on the play button
    let spotifyPlay = document.querySelector('#spotifyPlay');
    let nextBtn = document.querySelector("#spotifyNext");
    let prevBtn = document.querySelector("#spotifyPrev");

    // Similar Playlists Event listener
    let similarPlaylists = document.querySelector('#similarPlaylists');
    let nextTracks = document.querySelector('#nextTracks');
    
    //Event listener for cards on index page
    optionSection.addEventListener('click', async(event) => {
        //console.log(event)
        // Only trigger if the element has dataset
        if(event.target.dataset.search){
            // console.log(event.target.dataset.search)
        
            searchText = event.target.dataset.search;
            allTracks = await fetchDataManager(searchText);
            await loadTrack(allTracks, EmbedController, songNumber);

            trackSlider.onchange = ()=>{
                EmbedController.seek(trackSlider.value)
            }
            //Timer of the song
            EmbedController.addListener('playback_update', e => {
                document.getElementById('timer').innerText = `- ${trackTime(duration - parseInt(e.data.position / 1000, 10))}`;
                document.getElementById('currentTimer').innerText = trackTime(timeConvertor(e.data.position));
                trackSlider.value = parseInt(e.data.position / 1000, 10);

                //Auto play next song on 0:00
                if (trackSlider.value > 5 ){
                    if(trackTime(duration - parseInt(e.data.position / 1000, 10)) == '0:00'){
                        if(songNumber < allTracks.length - 1){
                            songNumber += 1;
                        } else {
                            songNumber = 0;
                        }
    
                        
                        //Convert time into seconds
                        duration = timeConvertor(allTracks[songNumber].track.duration_ms);
    
                        title.innerText = allTracks[songNumber].track.name;
                        EmbedController.loadUri(allTracks[songNumber].track.uri);
                        EmbedController.play();
                    }
                }

                });

        }
    })

    // Event Listerner for Play button
    spotifyPlay.addEventListener('click', ()=>{
        //Check if the HTML element has pause (sync with button)
        if(playerToogleBtn.classList.contains("fa-pause")){
            //Pause here
            EmbedController.pause();
            playerToogleBtn.classList.remove("fa-pause");
            playerToogleBtn.classList.add("fa-play");
            artVideo.pause();

        } else {
            //Play here
            EmbedController.togglePlay();
            playerToogleBtn.classList.add("fa-pause")
            playerToogleBtn.classList.remove("fa-play")
            artVideo.play();
        }
    })

    //If Clicked Next
    nextBtn.addEventListener('click', (event)=>{
        //console.log("PLAY")
        if(songNumber < allTracks.length - 1){
            songNumber += 1;
        } else {
            songNumber = 0;
        }

        //Convert time into seconds
        duration = timeConvertor(allTracks[songNumber].track.duration_ms);
        // console.log(allTracks[songNumber].track.name ,"Song Duration: ", duration)
        trackSlider.max = duration;

        
        title.innerText = allTracks[songNumber].track.name;
        EmbedController.loadUri(allTracks[songNumber].track.uri);
        EmbedController.play();
    })

    //If Clicked Previous
    prevBtn.addEventListener('click', (event)=>{
        if(songNumber == 0){
            songNumber = allTracks.length - 1;
        } else {
            songNumber -= 1;
        }
        //Format duration from ms into seconds
        duration = timeConvertor(allTracks[songNumber].track.duration_ms);
        // console.log(allTracks[songNumber].track.name ,"Song Duration: ", duration)
        trackSlider.max = duration

        title.innerText = allTracks[songNumber].track.name;
        EmbedController.loadUri(allTracks[songNumber].track.uri);
        EmbedController.play();

    })

    //Event listener for similar albums section
    similarPlaylists.addEventListener('click', async(event) => {

        if(event.target.dataset.playlist){
            // Play similar albums
            let newPlaylist = await getPlaylistInfo(event.target.dataset.playlist);
            // Update all tracks here
            allTracks = newPlaylist.tracks.items;
            loadTrack(allTracks, EmbedController, songNumber)
        }
    })

    // Event listener for next tracks section
    nextTracks.addEventListener('click', (event) => {
        if(event.target.dataset.song){
            console.log("clicked on the button");
            songNumber = event.target.dataset.song;
            loadTrack(allTracks, EmbedController, songNumber);
        }
    })

}

// Then make an api call using token
async function fetchDataManager(searchText) {
    if(searchText){ //If element has saerch text
        try {
            const response = await getToken();
            // Run search here and return the result
            const searchResult = await getSearchResult(response.access_token, searchText);
            //Get Album Data 
            const findTrackResult = await findTrack(searchResult)
            
            //GetTrack
            const getTrackResult = await getPlaylistInfo(findTrackResult)
    
            //Manage Tracks
            const manageTrackResult = await manageTrack(getTrackResult.tracks.items);
    
            if (manageTrackResult){
                console.log("Success");
                return manageTrackResult;
            }
    
            // Rest of the code...
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

//This function returns track info
async function getTrackInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
    });

    return await response.json();
}

//This function searches albums
async function getSearchResult(token, searchText) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=artist%2Cplaylist&limit=6`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });
    let searchRes = response.json()
    // console.log("Search Result, Playlist: ", searchRes)
    return searchRes
}

//This function returns Album info
async function getPlaylistInfo(playlist) {
    const token = await getToken();
    const response = await fetch(playlist, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token.access_token},
    });
    return await response.json();
    }

async function findTrack(data){
    //List of tracks
    // console.log("First album from search: ", data.playlists.items);
    let totalItems = data.playlists.items.length
    let optionCards = document.querySelector("#optionCards");
    let playerSection = document.querySelector("#player");

    if(totalItems) {
        optionCards.classList.add('hideSection');
        playerSection.classList.remove('hideSection');
    }
    // let imageEl = document.querySelector("#searchResults");
    // imageEl.innerHTML = ""

    //Update the current music to the player
    let songArt = document.querySelector("#songArt");
    let playlistTitle = document.querySelector("#playlistTitle");
    let similarPlaylistsEl = document.querySelector("#similarPlaylists")
    songArt.removeAttribute("src");
    songArt.setAttribute("src", data.playlists.items[0].images[0].url);
    playlistTitle.innerText = data.playlists.items[0].name;

    //If more than 1 limit used during search
    for(let i = 1; i < totalItems; i++){
        let newCard = document.createElement("div");
        newCard.classList.add("card","playlistCard","mb-0");

        // new row in card for image and body
        let fullBodyCard = document.createElement("div");
        fullBodyCard.classList.add("row","g-0");

        // Col fo image
        let imageCol = document.createElement("div");
        imageCol.classList.add("col-md-4");

        // Col fo image
        let bodyCol = document.createElement("div");
        bodyCol.classList.add("col-md-8");
        
        let playlistImg = document.createElement("img");
        playlistImg.classList.add("card-img-top","overlayImage");
        playlistImg.setAttribute("src", data.playlists.items[i].images[0].url);

        // data.playlists.items[i].images[0].url

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardHeading = document.createElement("h5");
        cardHeading.innerText = data.playlists.items[i].name;

        let frameVinylImg = document.createElement("img");
        frameVinylImg.setAttribute("src", './assets/images/frameVinyl.png');
        frameVinylImg.classList.add('albumFrame')

        let cardBtn = document.createElement("button");
        cardBtn.classList.add("fa-solid","fa-play","fa-2xl");
        cardBtn.setAttribute("data-playlist" , data.playlists.items[i].href);



        newCard.append(fullBodyCard);
        imageCol.append(playlistImg)
        // Add image to col
        fullBodyCard.appendChild(imageCol);
        // Add heading
        bodyCol.append(cardHeading);
        bodyCol.append(frameVinylImg)
        bodyCol.append(cardBtn)
        fullBodyCard.appendChild(bodyCol);
        similarPlaylistsEl.append(newCard);
        // console.log("Similar playlists: ",data.playlists.items[i].name);
        // console.log("Playlist Name" ,data.playlists.items[0].name)
    }

    //Return url of the album
    return data.playlists.items[0].href;
}

async function manageTrack(data){
    // console.log("List of Tracks: ", data)
    if (data.length){
        return data;
    }
}

// Function to convert ms into seconds
function timeConvertor(milliseconds){
    seconds = Math.floor(milliseconds / 1000);
    // console.log(seconds," Seconds"); // 21:12:09
    return seconds;
}

// Length of the song updater 
function trackTime(timeLeft){
    //Convert Seconds into minutes
    const minutes = Math.floor(timeLeft / 60);
    const seconds = (timeLeft - minutes * 60);

    //Convert (9 into 09)
    function n(n){
        return n > 9 ? "" + n: "0" + n;
    }
    return minutes+":"+n(seconds)
}

// Function to play the track and display the image and the title
function loadTrack(allTracks, EmbedController, songNumber){

    let title = document.querySelector("#songTitle");
    let artVideo = document.getElementById('artVideo');
    let trackSlider = document.querySelector("#trackSlider");
    let nextTracks = document.querySelector('#nextTracks');
    let mediaPlayerEl = document.querySelector('#mediaPlayer');
    let playerToogleBtn = document.querySelector("#playerToogleBtn");

    nextTracks.innerText="";
    //Update Song Art
    let songArt = document.querySelector("#songArt");

    //Plan to show next 8 songs
    let noOfTracks = allTracks.length - songNumber;
    let loopLimit;
    // console.log("Play song no ", songNumber)
    // console.log("No of tracks ", noOfTracks)
    //Variable to start the loop from
    if(noOfTracks < 8){
        //We can not have 8 cards on the screen
        loopLimit = allTracks.length - songNumber;
    } else {
        loopLimit = allTracks.length;
    }

    for(let i = parseInt(songNumber)+1; i < loopLimit; i++){

        // console.log("Track ", i , " ", allTracks[i].track);
        let songDiv = document.createElement('div');
        songDiv.classList.add('tracksList');

        let listSpan = document.createElement('span');
        
        listSpan.innerText=allTracks[i].track.name;
        songDiv.appendChild(listSpan);

        //Inside the song div, add a button
        let controlUl = document.createElement('ul');
        controlUl.classList.add('controls');
        let controlLi = document.createElement('li');
        let controlA = document.createElement('button');
        controlA.classList.add("fa-solid","fa-play","fa-2xl");
        controlA.setAttribute("data-song", i);

        // Add image
        let songListImg = document.createElement("img");
        songListImg.classList.add("card-img-top");
        songListImg.setAttribute("src", allTracks[i].track.album.images[0].url);
        songDiv.append(songListImg)
        // console.log("Image",allTracks[i].track.album.images[0].url)

        controlLi.appendChild(controlA);
        controlUl.appendChild(controlLi);
        songDiv.appendChild(controlUl)
        nextTracks.append(songDiv);
    }

    // Convert music duration from ms to seconds
    duration = timeConvertor(allTracks[songNumber].track.duration_ms);
    trackSlider.max = duration

    // console.log("Song Duration: ", formattedTime)
    EmbedController.loadUri(allTracks[songNumber].track.uri);

    //console.log(allTracks[1].track.album.images[0].url)
    songArt.setAttribute("src", allTracks[1].track.album.images[0].url);

    // Update Song Title 
    title.innerText = allTracks[songNumber].track.name

    //Play the track
    EmbedController.play();
    //Play the art Video background
    artVideo.play();

    // Toggle Play Pause icon on the player 
    playerToogleBtn.classList.remove("fa-play");
    playerToogleBtn.classList.add("fa-pause");
    mediaPlayerEl.classList.remove("hidden");
}