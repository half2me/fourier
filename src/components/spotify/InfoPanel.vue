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
        p {{ track.track.duration_ms | formatMs }}
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import settings from '@/settings'
import {formatMs} from '@/filters';

export default {
  name: 'InfoPanel',
  filters: {
    formatMs,
  },
  props: {
    track: {
      type: Object,
      default: () => null,
    },
    context: {
      type: Object,
      default: () => null,
    },
  },
  asyncComputed: {
  },
  computed: {
    ...mapState(['spotifyPaused', 'spotifyPlayer', 'currentTrack']),
    ...mapGetters(['spotify']),
    albumCover() {
      return this.track?.track.album.images[0]
    },
    qr() {
      return this.track ? settings.code + this.track.track.uri : null;
    },
  },
  methods: {
    ...mapMutations(['setCurrentTrack']),
    ...mapActions(['togglePlayer', 'player', 'changeSong']),
    //async changeSong({commit, uri}) {


    /*
      let id = '';
      const test = (await this.spotify.getMyDevices());

      for(let i=0; i < test.devices.length; i++) {
        if (test.devices[i].is_active) {
          id = '';
          break;
        }
        if (test.devices[i].name === settings.name) {
          id = test.devices[i].id;
        }
      }
      if((!this.spotifyPaused && this.currentTrack.uri !== uri) || this.currentTrack.uri !== uri) {
        if(id !== '') {
          if (this.context) {
            await this.spotify.play({device_id: id, context_uri: this.context?.uri, offset: {uri: uri}})
          } else {
            await this.spotify.play({device_id: id, uris: [uri]})
          }
        } else {
          if (this.context) {
            await this.spotify.play({context_uri: this.context?.uri, offset: {uri: uri}})
          } else {
            await this.spotify.play({uris: [uri]})
          }
        }
      } else  {
        await this.spotifyPlayer.togglePlay();
      }
      */
    //},
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
    font-weight: bold;
  }

  p.album {
    font-size: 0.8rem;
  }
  .info-panel {
    position: relative;
    height: 75%;
  }


</style>
