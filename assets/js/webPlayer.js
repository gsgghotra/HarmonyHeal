// Replace 'YOUR_CLIENT_ID' with your Spotify App Client ID
const client_id = '';
const client_secret = '';

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

    // Return token only
    const data = await response.json();
    return data.access_token;
}

getToken()
    .then((tokenPassed) => {
       console.log("Token passed - ", tokenPassed)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
