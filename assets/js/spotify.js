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


console.log(getToken());


// Then make an api call using token
async function getTrackInfo(access_token) {
const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token },
});

return await response.json();
}


// Call the API
getToken().then(response => {
    getTrackInfo(response.access_token).then(profile => {
        console.log(profile)
    })
});

// Modify the api to get playlists

// retrieve playlists

// Use iframe provided by spotify to play those playlists