// Get access token using client Id and secret
    //https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow

var client_id = '';
var client_secret = '';
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

// Use iframe provided by Spotify to play the track
window.onSpotifyIframeApiReady = async (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        // Use the provided URI or a default one
        uri:  "spotify:track:6ygiy70ujkNOYXM1tQuMNe"  
    };

    const callback = (EmbedController) => {
        playerControls(EmbedController)
    };
    await IFrameAPI.createController(element, options, callback);
};

//Manage user controls
async function playerControls(EmbedController){
    //Click on the play button
    let spotifyPlay = document.querySelector('#spotifyPlay');
    spotifyPlay.addEventListener('click', ()=>{
        if (spotifyPlay.innerHTML === "Play") {
            spotifyPlay.innerHTML = "Pause";
            EmbedController.togglePlay();
        } else {
            spotifyPlay.innerHTML = "Play";
            EmbedController.togglePlay();
        }
        
    })



    //Lets Click on Parent div of option
    let optionSection = document.querySelector('#optionSection');
    let title = document.querySelector("#songTitle");
    let mediaPlayerEl = document.querySelector('#mediaPlayer')
    optionSection.addEventListener('click', async(event) => {
        // Only trigger if the element has dataset
        if(event.target.dataset.search){
            // console.log(event.target.dataset.search)
            let songNumber = 1;
            searchText = event.target.dataset.search;
            let allTracks = await fetchDataManager(searchText);

            console.log("Lets play new Track: ", allTracks[songNumber].track.uri)
            EmbedController.loadUri(allTracks[songNumber].track.uri);
            EmbedController.play();
            mediaPlayerEl.classList.remove("hidden");
            spotifyPlay.innerHTML = "Pause";

            //If Clicked Next
            let nextBtn = document.querySelector("#spotifyNext");
            nextBtn.addEventListener('click', (event)=>{
                if(songNumber < allTracks.length - 1){
                    songNumber += 1;
                } else {
                    songNumber = 0;
                }
                console.log("Next Song ", songNumber , "of", allTracks.length - 1);
                console.log("Lets play new Track: ", allTracks[songNumber].track.name);
                //Update title of next song
                title.innerText = allTracks[songNumber].track.name;
                EmbedController.loadUri(allTracks[songNumber].track.uri);
                EmbedController.play();
                spotifyPlay.innerHTML = "Pause";
            })

                        //If Clicked Next
            let prevBtn = document.querySelector("#spotifyPrev");
            prevBtn.addEventListener('click', (event)=>{
                if(songNumber == 0){
                    songNumber = allTracks.length - 1;
                } else {
                    songNumber -= 1;
                }
                console.log("Prev Song ", songNumber , "of", allTracks.length);
                console.log("Lets play new Track: ", allTracks[songNumber].track.name , allTracks[songNumber]);
                //Update title of next song
                title.innerText = allTracks[songNumber].track.name;
                EmbedController.loadUri(allTracks[songNumber].track.uri);
                EmbedController.play();
                spotifyPlay.innerHTML = "Pause";
            })

        }
    })

    //Timer of the song
    EmbedController.addListener('playback_update', e => {
        document.getElementById('timer').innerText = `${parseInt(e.data.position / 1000, 10)} s`;
        });
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
            console.log("playlists", getTrackResult.tracks.items)
    
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
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=artist%2Cplaylist&limit=1`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });
    let searchRes = response.json()
    console.log("Search Result: ", searchRes)
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
    let imageEl = document.querySelector("#searchResults");
    imageEl.innerHTML = ""

    //If more than 1 limit used during search
    for(let i = 0; i < totalItems; i++){
        console.log(data.playlists.items[i].name)

        let title = document.querySelector("#songTitle");
        let songArt = document.querySelector("#songArt");
        songArt.removeAttribute("src");

        songArt.setAttribute("src", data.playlists.items[i].images[0].url);
        title.innerText = data.playlists.items[i].name

        console.log(data.playlists.items[i].images[0].url)
    }

    //Return url of the album
    return data.playlists.items[0].href;
}

async function manageTrack(data){
    console.log("List of Tracks: ", data)
    if (data.length){
        return data;
    }
}

