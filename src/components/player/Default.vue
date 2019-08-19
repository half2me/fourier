<template lang="pug">
  .default
    .columns
      .column.is-4.is-offset-4
        br
        img(:src="this.details.album.images[0].url")
    .columns
      .column.is-12
        h1 {{this.details.name}}
        h2 {{this.details.artists.map(a => a.name).join(', ') }}
        p.author {{this.details.album.name}}
    .columns
      .column.is-1.is-offset-1
        p 0:00
      .column.is-8
        b-progress(:max="this.details.duration_ms" type="is-primary")
      .column.is-1
        p {{ this.details.duration_ms | formatMs}}
    .columns
      .column.is-1.is-offset-1
        b-icon(icon="shuffle" pack="mdi")
      .column.is-1.is-offset-2
        b-icon(icon="skip-previous" pack="mdi")
      .column.is-2
        b-icon(icon="play" pack="mdi")
      .column.is-1
        b-icon(icon="skip-next" pack="mdi")
      .column.is-1.is-offset-2
        b-icon(icon="repeat-off" pack="mdi")
</template>

<script>
import {mapGetters} from 'vuex'
import {mapRouterParams} from '@halftome/vue-router-mapper';
import {formatMs} from '@/filters';

export default {
  name: 'Default',
  filters: {
    formatMs,
  },
  asyncComputed: {
    details: {
      get() {
        if (this.trackId) {
          return this.spotify.getTrack(this.trackId)
        }
      },
    },
    analysis: {
      get() {
        if(this.trackId) {
          return this.spotify.getAudioAnalysisForTrack(this.trackId);
        }
      },
    },
    features: {
      get() {
        if(this.trackId) {
          return this.spotify.getAudioFeaturesForTrack(this.trackId);
        }
      },
    },
  },
  computed: {
    ...mapRouterParams(['trackId']),
    ...mapGetters(['spotify']),
  },
}
</script>

<style scoped>

</style>
