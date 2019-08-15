<template lang="pug">
  .page-container
    nav.navbar(aria-label='main-navigation')
      router-link(:to="{name: 'home'}" :class="{'is-active': $route.name === 'home'}")
        img.logo(src="@/assets/logo-red.svg")
      .navbar-brand
        router-link(v-for="item in menuItems" :key="item" :to="{name: item}" :class="{'is-active': $route.path.startsWith(`/spotify/${item}`)}").navbar-item
          p.is-uppercase {{ item }}
    router-view
</template>

<script>
import Playlists from '@/components/spotify/Playlists'
import Tracks from '@/components/spotify/Tracks'
import InfoPanel from '@/components/spotify/InfoPanel'
import {mapActions, mapGetters, mapState} from 'vuex'
import {requestAccessToken} from '@/spotify'
import NowPlaying from '@/components/spotify/NowPlaying';

export default {
  name: 'Spotify',
  components: {
    NowPlaying,
    Playlists, Tracks, InfoPanel,
  },
  data() {
    return {
      menuItems: ['playlists', 'albums', 'artists', 'tracks'],
      selectedPlaylist: null,
      selectedTrack: null,
    }
  },
  asyncComputed: {
    devices: {
      get() {
        return this.spotify.getMyDevices().catch(e => {
          if (e.status === 401) {
            requestAccessToken()
          }
        }).then(r => r.devices)
      },
      default: [],
    },
    playbackState() {
      return this.spotify.getMyCurrentPlaybackState();
    },
    async player() {
      await this.initSpotifyPlayer();
      await this.connectSpotifyPlayer();
      return this.spotifyPlayer;
    },
  },
  computed: {
    ...mapGetters(['spotify', 'spotifyAccessToken']),
    ...mapState(['spotifyPlayer']),
  },
  methods: {
    ...mapActions(['initSpotifyPlayer', 'connectSpotifyPlayer']),
  },
}
</script>

<style lang="scss" scoped>
  .page-container {
    background: rgb(25,20,20);
    background: linear-gradient(0deg, rgba(25,20,20,1) 30%, rgba(51,51,51,1) 100%);
  }

  h2 {
    text-transform: uppercase;
    color: #666;
  }

  li.is-active {
    background-color: #333333;
  }

  .columns {
   // padding-bottom: 100px;
  }

  .columns:last-child {
    margin-bottom: 0!important;
  }

  .info-panel img, .now-playing img {
    width: 100%;
  }

  .side-menu {
    background-color: #313131;
    border-right: 1px solid #eee;
    color: #fff;
    height: 100vh;
    position: relative;
    padding: 1.5rem;
  }

  .side-menu a {
    color: $red;
  }
</style>
