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
    },
    computed: {
      ...mapGetters(['spotify']),
    },
  }
</script>
