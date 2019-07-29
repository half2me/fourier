<template lang="pug">
  .now-playing(v-if="spotifyPlayer")
    .columns.now-play
      .column.is-3
        img(v-if="currentTrack" :src="currentTrack.album.images[0].url")
      .column.is-9
        p.trackName
          b {{currentTrack.name}}
        p.artistName {{ currentTrack.artists.map(a => a.name).join(', ') }}
        p {{ currentTrack.album.name}}
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
            ...mapState(['spotifyPaused', 'spotifyPlayer', 'currentTrack']),
            ...mapGetters(['spotify']),
        },
        methods: {
            ...mapActions(['togglePlayer', 'next','prev'])
        },
    }
</script>
