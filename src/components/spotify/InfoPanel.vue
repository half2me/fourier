<template lang="pug">
  .info-panel(v-if="track")
    img(v-if="albumCover" :src="albumCover.url")
    .columns
      .column
        p.track {{ track.track.name }}
        p.artist {{ track.track.artists.map(a => a.name).join(', ') }}
        p.album {{ track.track.album.name }}
      .column
        b-icon(pack="far" icon="clock")
        p {{ millis }}
    a(:href="track.track.uri") {{ "Open in Spotify" }}
    b-taglist(attached=true)
      b-tag(type="is-dark") popularity
      b-tag(type="is-primary") {{ track.track.popularity }}
      //b-tag(v-show="track.track.explicit" type="is-warning") explicit
</template>

<script>
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
          return this.spotify.getAudioAnalysisForTrack(this.track.track.id)
        }
      },
      audioFeatures() {
        if (this.track) {
          return this.spotify.getAudioFeaturesForTrack(this.track.track.id)
        }
      },
      millis() {
          return Math.floor(this.track?.track.duration_ms / 60000) + ":" + ((this.track?.track.duration_ms % 60000) / 1000).toFixed(0);
      }
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
