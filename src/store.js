import Vue from 'vue'
import Vuex from 'vuex'
import Spotify from 'spotify-web-api-js'
import {requestAccessToken as getSpotifyAT} from '@/spotify'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    spotify: new Spotify(),
  },
  getters: {
    spotifyAccessToken: state => state.spotify.getAccessToken(),
    // A wrapper around the spotify client to automatically handle auth on failure
    spotify: state => new Proxy(state.spotify, {
      get: (target, name) => (...a) => target[name](...a).catch(e => {
        if (e.status === 401) {
          // Get a new access token
          return getSpotifyAT();
        }
        throw e;
      }),
    }),
  },
  mutations: {
    initialiseStore: state => {
      if (localStorage.getItem('spotify_token')) {
        state.spotify.setAccessToken(localStorage.getItem('spotify_token'))
      }
    },
    updateSpotifyToken: (state, token) => {
      state.spotify.setAccessToken(token);
      localStorage.setItem('spotify_token', token);
    },
  },
  actions: {}
})
