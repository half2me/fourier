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
    redirect_uri: window.location.origin + '/auth-callback',
    scope: scopes.join(' '),
    show_dialog: 'false',
    //state: '',
  };

  const params = new URLSearchParams();
  for (const [key, val] of Object.entries($queryParams)) {params.append(key, val)}
  window.location = 'https://accounts.spotify.com/authorize?' + params.toString();
};
