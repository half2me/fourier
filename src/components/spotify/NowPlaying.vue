<template lang="pug">
  .now-playing(v-if="spotifyPlayer && currentTrack")
    .columns.now-play
      template(v-if="currentTrack")
        .column.is-3
          img(:src="currentTrack.album.images[0].url")
        .column.is-7
          p.trackName
            b {{currentTrack.name}}
          p.artistName {{ currentTrack.artists.map(a => a.name).join(', ') }}
          p {{ currentTrack.album.name}}
        .column.is-2
          a(@click="minimisePlayer")
            b-icon(icon="minus")
          a(@click="disconnectSpotifyPlayer")
            b-icon(icon="times")
    .columns
      .column.is-2.from
        p {{ minutes(position) }}
      .column.is-8
        input(type="range" :max="currentTrack.duration_ms" :value="position" @change="e => seek(e.target.value)")
      .column.is-2
        p {{ minutes(currentTrack.duration_ms) }}
    .columns.player
      .column.is-4
        a(@click="prev")
          b-icon(icon="backward")
      .column.is-4
        a(@click="togglePlayer")
          b-icon(:icon="spotifyPaused ? 'play' : 'pause'")
      .column.is-4
        a(@click="next")
          b-icon(icon="forward")
    .columns
      .column.is-1.is-offset-1
        a(href="#")
          b-icon(icon="desktop")

</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import config from '../../settings'

    export default {
        name: "NowPlaying",
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
            ...mapState(['spotifyPaused', 'spotifyPlayer', 'currentTrack', 'position']),
            ...mapGetters(['spotify']),
        },
        methods: {
            ...mapActions(['togglePlayer', 'next', 'prev', 'disconnectSpotifyPlayer', 'seek', 'minimisePlayer']),
            minutes(val) {
                return config.msToMin(val);
            },
        },
    }
</script>

<style lang="scss" scoped>

  .now-playing {
    background-color: #191414;
    z-index: 999;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 33%;
  }

  .now-playing p {
    color: white;
  }

  .player a {
    color: white;
  }

  .columns.now-play, .columns.player {
    margin: 0 !important;
  }

  .player a:hover {
    color: #1DB954;
  }

  .trackName {
    font-size: 22px;
  }

  .artistName {
    font-size: 18px;
  }

  input {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 7px; /* Specified height */
    background: #333; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    overflow: hidden;
  }

  input::-webkit-slider-thumb {

    -webkit-appearance: none; /* Override default look */
    appearance: none;
    box-shadow: -100vw 0 0 100vw #1DB954;
    overflow: hidden;
    width: 7px; /* Set a specific slider handle width */
    height: 7px; /* Slider handle height */
    background: #fff; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  input::-moz-range-thumb {
    border-radius: 5px;
    width: 10px; /* Set a specific slider handle width */
    height: 10px; /* Slider handle height */
    background: #1DB954; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
  .player {
    text-align: center;
    background-color: #191414;
    bottom: 0;
    width: 100%;
  }
  .from {
    text-align: right;
  }


</style>
