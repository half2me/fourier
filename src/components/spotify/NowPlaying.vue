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
        a(@click="devices = true")
          b-icon(icon="desktop")
      .column.is-1.is-offset-8
        a(@click="open = true")
          b-icon(icon="expand")

    vue-modaltor(:visible="open" @hide="open=false")
      p hello
    vue-modaltor(:visible="devices" @hide="devices=false")
      p hello
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import {formatMs} from '@/filters';
import Vue from 'vue';
import VueModalTor from 'vue-modaltor';
Vue.use(VueModalTor);

export default {
  name: 'NowPlaying',
  filters: {
    formatMs,
  },
  components: {
    modal: {
      template:'#modal-template',
    },
  },
  props: {
    track: {
      type: Object,
      default: () => null,
    },
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      devices: false,
    }
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
    hideModal() {
      this.open = false;
    },
  },
}
</script>

<style lang="scss" scoped>

  .now-playing {
    background-color: $spotify-grey;
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
    background-color: $spotify-grey;
    bottom: 0;
    width: 100%;
  }
  .from {
    text-align: right;
  }
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
