<template lang="pug">
  .player
    b-tabs(v-model="activeTab")
      b-tab-item(label="Player Home")
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
      b-tab-item(label="Audio Analysis")
        .columns
          .column
            p {{this.analysis.bars[0]}}
      b-tab-item(label="Audio Features")
        .columns.is-multiline
          .column.is-3
            b-tooltip(animate type="is-primary" label="Danceability")
              b-icon(icon="child")
            apexchart(type="radialBar" labels="['dance']"  :options="chartOptions" :series="[this.features.danceability*100 | round]")
          .column.is-3
            b-tooltip(animate type="is-primary" label="Energy")
              b-icon(icon="bolt")
            apexchart(type="radialBar" :options="chartOptions" :series="[this.features.energy*100 | round]")
          .column.is-3
            b-tooltip(animate type="is-primary" label="Key")
              b-icon(icon="music-accidental-sharp" pack="mdi")
            h2 {{this.features.key | key}}
          .column.is-3
            b-tooltip(animate type="is-primary" label="Loudness")
              b-icon(icon="volume-up")
            h2 {{this.features.loudness}}dB
          .column.is-3
            b-tooltip(animate type="is-primary" label="Mode")
              b-icon(icon="music-clef-treble" pack="mdi")
            h2 {{this.features.mode | mode}}
          .column.is-3
            b-tooltip(animate type="is-primary" label="Speechiness")
              b-icon(icon="comment")
            apexchart(type="radialBar" :options="chartOptions" series="[this.features.speechiness*100 | round]")
          .column.is-3
            b-tooltip(animate type="is-primary" label="Acousticness")
              b-icon(icon="guitar")
            apexchart(type="radialBar" :options="chartOptions" :series="[this.features.acousticness*100 | round]")
          .column.is-3
            h1 Instrumentalness
            apexchart(type="radialBar" :options="chartOptions" :series="[this.features.instrumentalness*100 | round]")
          .column.is-3
            b-tooltip(animate type="is-primary" label="Liveness")
              b-icon(icon="microphone")
            apexchart(type="radialBar" :options="chartOptions" :series="[this.features.liveness*100 |round]")
          .column.is-3
            b-tooltip(animate type="is-primary" label="Valence")
              b-icon(icon="smile")
            apexchart(type="radialBar" :options="chartOptions" :series="[this.features.valence*100 | round]")
          .column.is-3
            b-tooltip(animate type="is-primary" label="Tempo")
              b-icon(icon="music-note" pack="mdi")
            h2 {{this.features.tempo | floor}}bpm
          .column.is-3
            h1 Time Signature
            h2 {{this.features.time_signature}}/4
</template>


<script>
import {mapGetters} from 'vuex'
import {mapRouterParams} from '@halftome/vue-router-mapper';
import {formatMs, floor, key, mode, round} from '@/filters';

export default {
  name: 'Player',
  filters: {
    formatMs,
    floor,
    key,
    mode,
    round,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example',
        },
        labels: [''],
        colors: ['#ca3e47'],
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            track: {
              background: '#333',
              startAngle: -135,
              endAngle: 135,
            },
          },
        },
      },
    }
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

<style lang="scss" scoped>

  .on-top, .author {
    color: #666;
  }
  h1 {
    font-family: 'Staatliches', sans-serif;
    font-size: 2rem;
  }
  h2 {
    font-family: 'Staatliches', sans-serif;
    font-size: 1.5rem;
  }
  .player {
    text-align: center;
  }
</style>
