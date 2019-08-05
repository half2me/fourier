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
          a(@click="minimizePlayer")
            b-icon(icon="minus")
          a(@click="spotifyPlayer.disconnect()")
            b-icon(icon="times")
    .columns
      .column.is-2.from
        p {{ position | formatMs }}
      .column.is-8
        input(type="range" :max="currentTrack.duration_ms" :value="position" @change="e => spotifyPlayer.seek(e.target.value)").playingPos
      .column.is-2
        p {{ currentTrack.duration_ms | formatMs }}
    .columns.player
      .column.is-4
        a(@click="spotifyPlayer.previousTrack()")
          b-icon(icon="backward")
      .column.is-4
        a(@click="spotifyPlayer.togglePlay()")
          b-icon(:icon="spotifyPaused ? 'play' : 'pause'")
      .column.is-4
        a(@click="spotifyPlayer.nextTrack()")
          b-icon(icon="forward")
    .columns
      .column.is-1.is-offset-1
        a(href="#")
          b-icon(icon="desktop")

</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import {formatMs} from "@/filters";

    export default {
        name: "NowPlaying",
        filters: {
            formatMs,
        },
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
            ...mapActions(['togglePlayer', 'next', 'prev', 'seek', 'minimizePlayer']),
        },
    }
</script>

<style lang="scss" scoped>

  .now-playing {
    background-color: $spotify-invert;
    z-index: 999;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 33%;
  }

  .now-playing p {
    color: $white;
  }

  .player a {
    color: $white;
  }

  .columns.now-play, .columns.player {
    margin: 0 !important;
  }

  .player a:hover {
    color: $spotify;
  }

  .trackName {
    font-size: 22px;
  }

  .artistName {
    font-size: 18px;
  }

  .playingPos {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 7px; /* Specified height */
    background: $grey; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    overflow: hidden;
  }

  .playingPos::-webkit-slider-thumb {

    -webkit-appearance: none; /* Override default look */
    appearance: none;
    box-shadow: -100vw 0 0 100vw $spotify;
    overflow: hidden;
    width: 7px; /* Set a specific slider handle width */
    height: 7px; /* Slider handle height */
    background: #fff; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .playingPos::-moz-range-thumb {
    border-radius: 5px;
    width: 10px; /* Set a specific slider handle width */
    height: 10px; /* Slider handle height */
    background: $spotify; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
  .player {
    text-align: center;
    background-color: $spotify-invert;
    bottom: 0;
    width: 100%;
  }
  .from {
    text-align: right;
  }


</style>
