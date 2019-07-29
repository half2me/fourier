<template lang="pug">
  .columns
    .column
      playlists(v-model="selectedPlaylist")
    .column
      tracks(:playlist="selectedPlaylist" v-model="selectedTrack")
    .column
      info-panel(:track="selectedTrack")
</template>

<script>
  import Playlists from '@/components/spotify/Playlists'
  import Tracks from '@/components/spotify/Tracks'
  import InfoPanel from '@/components/spotify/InfoPanel'
  import {mapGetters} from 'vuex'
  import {requestAccessToken} from '@/spotify'

  export default {
    name: 'spotify',
    components: {
      Playlists, Tracks, InfoPanel
    },
    data() {
      return {
        selectedPlaylist: null,
        selectedTrack: null,
      }
    },
    asyncComputed: {
      devices: {
        get() {
          return this.spotify.getMyDevices().catch(e => {
            if (e.status === 401) {
              requestAccessToken()
            }
          }).then(r => r.devices)
        },
        default: [],
      },
      playbackState() {
        return this.spotify.getMyCurrentPlaybackState();
      },
      player() {
        return this.loadSpotifyPlayer().then(() => {
          const p = new window.Spotify.Player({
            name: 'Fourier Player',
            getOAuthToken: f => f(this.spotifyAccessToken)
          });

          p.addListener('initialization_error', msg => console.error(msg));
          p.addListener('authentication_error', msg => console.error(msg));
          p.addListener('account_error', msg => console.error(msg));
          p.addListener('playback_error', msg => console.error(msg));
          p.addListener('player_state_changed', state => console.log(state));
          p.addListener('ready', device_id => console.log(device_id));
          p.addListener('not_ready', device_id => console.log(device_id));
          p.connect(); // Promise

          return p;
        });
      }
    },
    computed: {
      ...mapGetters(['spotify', 'spotifyAccessToken']),
    },
    mounted() {
    },
    beforeDestroy() {
      if (this.player) {
        this.player.disconnect();
      }
    },
    methods: {
      loadSpotifyPlayer() {
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
      },
    },
  }
</script>
