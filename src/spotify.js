export const scopes = [
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-modify-playback-state',
  'streaming',
  'app-remote-control',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-read-private',
  'user-read-birthdate',
  'user-read-email',
  'user-read-private',
  'user-follow-modify',
  'user-follow-read',
  'user-library-read',
  'user-library-modify',
  'user-read-recently-played',
  'user-top-read',
];

const clientId = '906b3c4adbf04d2f988aeb9c30910439';

export const requestAccessToken = () => {
  const $queryParams = {
    client_id: clientId,
    response_type: 'token',
    redirect_uri: window.location.origin + '/spotify/auth-callback',
    scope: scopes.join(' '),
    show_dialog: 'false',
  };

  const params = new URLSearchParams();
  for (const [key, val] of Object.entries($queryParams)) {params.append(key, val)}
  window.location = 'https://accounts.spotify.com/authorize?' + params.toString();
};

export const loadSpotifyPlayerSDK = () => {
  return new Promise((resolve, reject) => {
    const scriptId = 'spotify-sdk-script';
    if (! document.getElementById(scriptId)) {
      const script = document.getElementById(scriptId) || document.createElement('script');
      window.onSpotifyWebPlaybackSDKReady = resolve;
      script.id = scriptId;
      script.onerror = reject;
      script.async = true;
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
};
