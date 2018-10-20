import Vue from 'vue'
import Vuex from 'vuex'
import Spotify from 'spotify-web-api-js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    spotify: new Spotify()
  },
  getters: {
    spotify: state => state.spotify,
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
  actions: {

  }
})
