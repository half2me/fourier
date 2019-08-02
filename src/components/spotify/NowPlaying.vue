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
        p {{ Number(((position % 60000) / 1000).toFixed(0)) === 60 ? (Math.floor(position / 60000) + 1) + ":00" : Math.floor(position/60000) + ":"+ (Number(((position % 60000) / 1000).toFixed(0)) < 10 ? "0" : "") + Number(((position % 60000) / 1000).toFixed(0))}}
      .column.is-8
        input(type="range" :max="currentTrack.duration_ms" :value="position" @change="e => seek(e.target.value)")
      .column.is-2
        p {{ Number(((currentTrack.duration_ms % 60000) / 1000).toFixed(0)) === 60 ? (Math.floor(currentTrack.duration_ms / 60000) + 1) + ":00" : Math.floor(currentTrack.duration_ms/60000) + ":"+ (Number(((currentTrack.duration_ms % 60000) / 1000).toFixed(0)) < 10 ? "0" : "") + Number(((currentTrack.duration_ms % 60000) / 1000).toFixed(0))}}
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
            ...mapActions(['togglePlayer', 'next', 'prev', 'disconnectSpotifyPlayer', 'seek', 'minimisePlayer'])
        },
    }
</script>
