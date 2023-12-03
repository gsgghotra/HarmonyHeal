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

    //Click on option1
    let option1 = document.querySelector('#option1');

    //Operate Serach
    option1.addEventListener('click', async (event)=>{

        // EmbedController.loadUri('spotify:track:09T2kn41rmuRgKozR3fJlH');
        //Play after Choosing Audio source
        // EmbedController.play();
        let searchText;
        console.log(event.target.dataset.search)
        if(event.target.dataset.search){
            searchText = event.target.dataset.search;
            let newTrack = await fetchDataManager(searchText);
            console.log("Lets play new Track: ", newTrack)
            EmbedController.loadUri(newTrack);
            EmbedController.play();
        }
        //fetchDataManager()
    })

    //Lets Click on Parent div of option
    let optionSection = document.querySelector('#optionSection');
    optionSection.addEventListener('click', event => {
        console.log(event.target.id)
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
            const getTrackResult = await getAlbumInfo(findTrackResult)
    
            //Manage Tracks
            const manageTrackResult = await manageTrack(getTrackResult);
    
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
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=artist%2Calbum&limit=1`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });
    let searchRes = response.json()
    //console.log("Search Result: ", searchRes)
    return searchRes
}

//This function returns Album info
async function getAlbumInfo(album) {
    const token = await getToken();
    const response = await fetch(album, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token.access_token},
    });
    return await response.json();
    }

async function findTrack(data){
    //List of tracks
    console.log("First album from search: ", data.albums.items);
    let totalItems = data.albums.items.length
    let imageEl = document.querySelector("#searchResults");

    //If more than 1 limit used during search
    for(let i = 0; i < totalItems; i++){
        console.log(data.albums.items[i].name)

        let title = document.createElement("h5");
        let image = document.createElement("img");
        image.setAttribute("src", data.albums.items[i].images[0].url);
        title.innerText = data.albums.items[i].name+ " - " +data.albums.items[i].artists[0].name
        imageEl.append(image);
        imageEl.append(title)
        console.log(data.albums.items[i].images[0].url)
    }

    //Return url of the album
    return data.albums.items[0].href;
}

async function manageTrack(data){
    console.log("List of Tracks: ", data.tracks.items[0].uri)
    if (data.tracks.items[0].uri){
        return data.tracks.items[0].uri
    }
}