// Replace 'YOUR_CLIENT_ID' with your Spotify App Client ID
const SPOTIFYTOKEN = '';
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

async function getDevices() {
    const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: {
            'Authorization': 'Bearer ' + await getToken(),
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to get devices. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.devices;
}

getDevices()
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = SPOTIFYTOKEN;
    const player = new Spotify.Player({
        name: 'HarmonyHeal',
        spotify_uri: "spotify:track:72vuBPMhwFNlSYpTSf6fVD",
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });
    // console.log("Player: ", player);

    // Spotify's error handlers
      // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    // Connected

    player.connect();



    player.connect().then(success => {
    if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
    }
    })

    let togglePlay = document.querySelector('#togglePlay');
    togglePlay.addEventListener('click', ()=>{
        player.togglePlay();
        console.log(getTrackInfo(token))

        player.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            console.log("State Object: ",state)
            
            var current_track = state.track_window.current_track;
            var next_track = state.track_window.next_tracks[0];
            
            //Add Song title to the page
            let songEl = document.querySelector("#songTitle")
            songEl.innerText = current_track.name

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
        });
    })

    //This function returns track info
    async function getTrackInfo() {
        const response = await fetch("https://api.spotify.com/v1/tracks/72vuBPMhwFNlSYpTSf6fVD", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + await getToken() },
        });
        
        console.log("Track:", response.json())
        }
        // getTrackInfo()



}

