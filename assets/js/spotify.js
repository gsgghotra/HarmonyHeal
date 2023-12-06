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
    let mediaPlayerEl = document.querySelector('#mediaPlayer');
    let artVideo = document.getElementById('artVideo');
    let playerToogleBtn = document.querySelector("#playerToogleBtn");
    let trackSlider = document.querySelector("#trackSlider");
    
    //Variable for duration
    let duration = 0; 
    let songNumber = 1;

    //Tracks Holder
    let allTracks;

    //Click on the play button
    let spotifyPlay = document.querySelector('#spotifyPlay');
    let nextBtn = document.querySelector("#spotifyNext");
    let prevBtn = document.querySelector("#spotifyPrev");

    optionSection.addEventListener('click', async(event) => {
        //console.log(event)
        // Only trigger if the element has dataset
        if(event.target.dataset.search){
            // console.log(event.target.dataset.search)
            
            searchText = event.target.dataset.search;
            allTracks = await fetchDataManager(searchText);

            // Convert music duration from ms to seconds
            duration = timeConvertor(allTracks[songNumber].track.duration_ms);
            trackSlider.max = duration

            // console.log("Song Duration: ", formattedTime)
            EmbedController.loadUri(allTracks[songNumber].track.uri);

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
            // spotifyPlay.innerHTML = "Pause";

                trackSlider.onchange = ()=>{
                    EmbedController.seek(trackSlider.value)
                }
                //Timer of the song
                EmbedController.addListener('playback_update', e => {
                    document.getElementById('timer').innerText = `- ${trackTime(duration - parseInt(e.data.position / 1000, 10))}`;
                    trackSlider.value = parseInt(e.data.position / 1000, 10);

                    if(trackTime(duration - parseInt(e.data.position / 1000, 10)) == '0:00'){
                        console.log("Play Next Song")
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
                    });

        }
    })

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
        console.log("PLAY")
        if(songNumber < allTracks.length - 1){
            songNumber += 1;
        } else {
            songNumber = 0;
        }

        //Convert time into seconds
        duration = timeConvertor(allTracks[songNumber].track.duration_ms);
        console.log(allTracks[songNumber].track.name ,"Song Duration: ", duration)
        trackSlider.max = duration

        
        title.innerText = allTracks[songNumber].track.name;
        EmbedController.loadUri(allTracks[songNumber].track.uri);
        EmbedController.play();
        // spotifyPlay.innerHTML = "Pause";
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
        console.log(allTracks[songNumber].track.name ,"Song Duration: ", duration)
        trackSlider.max = duration

        // console.log("Prev Song ", songNumber , "of", allTracks.length);
        // console.log("Lets play new Track: ", allTracks[songNumber].track.name , allTracks[songNumber]);
        //Update title of next song
        title.innerText = allTracks[songNumber].track.name;
        EmbedController.loadUri(allTracks[songNumber].track.uri);
        EmbedController.play();
        // spotifyPlay.innerHTML = "Pause";
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
    console.log("Search Result, Playlist: ", searchRes)
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
    console.log("First album from search: ", data.playlists.items);
    let totalItems = data.playlists.items.length
    // let imageEl = document.querySelector("#searchResults");
    // imageEl.innerHTML = ""

    //Update the current music to the player
    let songArt = document.querySelector("#songArt");
    let playlistTitle = document.querySelector("#playlistTitle");
    songArt.removeAttribute("src");
    songArt.setAttribute("src", data.playlists.items[0].images[0].url);
    playlistTitle.innerText = data.playlists.items[0].name;

    //If more than 1 limit used during search
    for(let i = 0; i < totalItems; i++){
        console.log("Similar playlists: ",data.playlists.items[i].name)
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