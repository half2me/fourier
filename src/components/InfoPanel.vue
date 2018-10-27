<template lang="pug">
  .info-panel(v-if="track")
    img(v-if="albumCover" :src="albumCover.url" :height="albumCover.height" :width="albumCover.width")
    p Spotify ID:
      a(:href="track.track.uri") {{ track.track.id }}
    p Name: {{ track.track.name }}
    p Artist: {{ track.track.artists.map(a => a.name).join(', ') }}
    p Album: {{ track.track.album.name }}
    p Duration: {{ track.track.duration_ms }} ms
    b-taglist-attached
      b-tag(type="is-dark") popularity
      b-tag(type="is-primary") {{ track.track.popularity }}
      b-tag(v-show="track.track.explicit" type="is-warning") explicit
</template>

<script>
  import {requestAccessToken} from '@/spotify'
  import {mapGetters} from 'vuex'

  export default {
    name: 'InfoPanel',
    props: {
      track: {
        type: Object,
        default: () => null,
      },
    },
    asyncComputed: {
      audioAnalysis() {
        if (this.track) {
          return this.spotify.getAudioAnalysisForTrack(this.track.track.id).catch(e => {if (e.status === 401) {requestAccessToken()}})
        }
      },
      audioFeatures() {
        if (this.track) {
          return this.spotify.getAudioFeaturesForTrack(this.track.track.id).catch(e => {if (e.status === 401) {requestAccessToken()}})
        }
      },
    },
    computed: {
      ...mapGetters(['spotify']),
      albumCover() {
        return this.track?.track.album.images[0]
      }
    },
    methods: {},
  }
</script>
