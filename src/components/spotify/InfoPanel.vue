<template lang="pug">
  .info-panel(v-if="track && spotifyPlayer")
    br
    .columns.album
      .column.is-10.is-offset-1
        img(v-if="albumCover" :src="albumCover.url")
    .columns
      .column.is-1
        a(@click.prevent="changeSong(track.track.uri)")
          b-icon(:icon="currentTrack.uri === track.track.uri ? 'pause' : 'play'")
      .column.is-9
        p.track {{ track.track.name }} - {{ track.track.artists.map(a => a.name).join(', ') }}
        p.album {{ track.track.album.name }}
      .column.is-2
        b-icon(icon="clock")
        p {{ millis }}
    a(:href="track.track.uri") {{ "Open in Spotify" }}
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'

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
                return Number(((this.track?.track.duration_ms % 60000) / 1000).toFixed(0)) === 60
                    ? (Math.floor(this.track?.track.duration_ms / 60000) + 1) + ":00"
                    : Math.floor(this.track?.track.duration_ms / 60000)
                    + ":"
                    + (Number(((this.track?.track.duration_ms % 60000) / 1000).toFixed(0)) < 10 ? "0" : "")
                    + Number(((this.track?.track.duration_ms % 60000) / 1000).toFixed(0));
            },
        },
        computed: {
            ...mapState(['spotifyPaused', 'spotifyPlayer', 'currentTrack']),
            ...mapGetters(['spotify']),
            albumCover() {
                return this.track?.track.album.images[0]
            }
        },
        methods: {
            ...mapActions(['togglePlayer', 'changeSong'])
        },
    }
</script>
