<template lang="pug">
  .columns
    .column.is-one-quarter
      playlists(v-model="selectedPlaylist")
    .column.is-one-third
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
          const p = new Spotify.Player({
            name: 'Fourier',
            getOAuthToken: f => f(this.spotify.token)
          });
        });
      }
    },
    computed: {
      ...mapGetters(['spotify']),
    },
    mounted() {

    },
    methods: {
      loadSpotifyPlayer() {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          window.onSpotifyWebPlaybackSDKReady = resolve;
          script.async = true;
          script.src = 'https://sdk.scdn.co/spotify-player.js';
          document.head.appendChild(script);
        });
      }
    },
  }
</script>
