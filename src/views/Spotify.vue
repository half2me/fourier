<template lang="pug">
  .columns
    .column
      playlists(v-model="selectedPlaylist")
    .column
      tracks(:playlist="selectedPlaylist" v-model="selectedTrack")
    .column
      info-panel(:track="selectedTrack")
      br
      now-playing(:track="selectedTrack")
</template>

<script>
  import Playlists from '@/components/spotify/Playlists'
  import Tracks from '@/components/spotify/Tracks'
  import InfoPanel from '@/components/spotify/InfoPanel'
  import {mapActions, mapGetters, mapState} from 'vuex'
  import {requestAccessToken} from '@/spotify'
  import NowPlaying from "../components/spotify/NowPlaying";

  export default {
    name: 'spotify',
    components: {
        NowPlaying,
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
      async player() {
        await this.initSpotifyPlayer();
        await this.connectSpotifyPlayer();
        return this.spotifyPlayer;
      }
    },
    computed: {
      ...mapGetters(['spotify', 'spotifyAccessToken']),
      ...mapState(['spotifyPlayer']),
    },
    methods: {
      ...mapActions(['initSpotifyPlayer', 'connectSpotifyPlayer'])
    },
  }
</script>
