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
async function getPlaylistInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX5cZuAHLNjGz", {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
    });
    
    return await response.json();
    }

// Call the API
getToken().then(response => {
    getPlaylistInfo(response.access_token).then(data => {
        console.log(data)
    })
});

// Modify the api to get playlists

//https://api.spotify.com/v1/playlists/{playlist_id}

// retrieve playlists

// Use iframe provided by spotify to play those playlists