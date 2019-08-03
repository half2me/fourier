<template lang="pug">
  .info-panel(v-if="track && spotifyPlayer")
    br
    .columns
      .column.is-10.is-offset-1
        img(v-if="albumCover" :src="albumCover.url").album
        a(:href="track.track.uri").spotify-qr
          img(v-if="qr" :src="qr" alt="Open In Spotify" title="Open In Spotify").imgQr
    .columns
      .column.is-1
        a(@click.prevent="changeSong(track.track.uri)")
          b-icon(:icon="currentTrack.uri === track.track.uri && !spotifyPaused ? 'pause' : 'play'")
      .column.is-9
        p.track {{ track.track.name }} - {{ track.track.artists.map(a => a.name).join(', ') }}
        p.album {{ track.track.album.name }}
      .column.is-2
        b-icon(icon="clock")
        p {{ minutes }}
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import config from '../../settings'

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
        },
        computed: {
            ...mapState(['spotifyPaused', 'spotifyPlayer', 'currentTrack']),
            ...mapGetters(['spotify']),
            albumCover() {
                return this.track?.track.album.images[0]
            },
            qr() {
                return this.track ? config.code + this.track.track.uri : null;
            },
            minutes() {
                return config.msToMin(this.track?.track.duration_ms);
            },
        },
        methods: {
            ...mapActions(['togglePlayer', 'changeSong'])
        },
    }
</script>
<style lang="scss" scoped>
  .imgQr {
    margin-top: -3%;
  }
  .spotify-qr {
    transition: .2s all;
  }
  .spotify-qr:hover {
      opacity: 0.4;
  }
  p.track {
    color: #191414;
    font-weight: bold;
    font-size: 18px;
  }

  p.artist {
    font-size: 16px;
  }

  p.album {
    font-size: 14px;
  }
  .info-panel {
    position: relative;
    height: 75%;
  }


</style>
