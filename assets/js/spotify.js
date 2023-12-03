//   ------------  Plan -------------

// Get access token using client Id and secret
    //https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow

var client_id = '';
var client_secret = '';

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


// Then make an api call using token

//This function returns track info
async function getTrackInfo(access_token) {
const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token },
});

return await response.json();
}

//This function returns playlist info
async function getAlbumInfo( album) {
    let token = await getToken();
    const response = await fetch(album, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token.access_token},
    });
    
    return await response.json();
    }


//This function searches albums
async function getSearchResult(access_token) {
    const response = await fetch("https://api.spotify.com/v1/search?q=calmly&search?q=Sleep&type=artist%2Calbum&limit=1", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
    });
    let searchRes = response.json()
    //console.log("Search Result: ", searchRes)
    return searchRes
}

// Call the API
getToken()
.then(response => {
    //Run search here and retuen the result
    return getSearchResult(response.access_token);
})
.then(data => {
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
})
.then( data => {
    console.log ("Lets get the album ", data)

    console.log(getAlbumInfo(data))
})

// Modify the api to get playlists

//https://api.spotify.com/v1/playlists/{playlist_id}

// retrieve playlists



// Use iframe provided by Spotify to play the track
window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        uri:  "spotify:track:0vtp6L7PjGRNfbNefNWpjc"  // Use the provided URI or a default one
    };
    const callback = (EmbedController) => {

        //Play on the click button
        let togglePlay = document.querySelector('#togglePlay');
        togglePlay.addEventListener('click', ()=>{
        EmbedController.play();
        })
        //Click on option1
        let option1 = document.querySelector('#option1');
        option1.addEventListener('click', ()=>{
            EmbedController.loadUri('spotify:track:09T2kn41rmuRgKozR3fJlH');
            //Play after Choosing Audio source
            EmbedController.play();
        })

        //Lets Click on Parent div of option
        let optionSection = document.querySelector('#optionSection');
        optionSection.addEventListener('click', event => {
            console.log(event.target.id)
        })

    };
    IFrameAPI.createController(element, options, callback);
};

