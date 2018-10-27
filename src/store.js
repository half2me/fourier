import Vue from 'vue'
import Vuex from 'vuex'
import Spotify from 'spotify-web-api-js'
import {requestAccessToken as getSpotifyAT} from '@/spotify'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    spotify: new Spotify()
  },
  getters: {
    // A wrapper around the spotify client to automatically handle auth on failure
    spotify: state => new Proxy(state.spotify, {
      get(target, name) {
        if (typeof target[name] !== 'function') {
          // Transparently return anything that is not a function
          return target[name]
        } else {
          const result = target[name]();
          if (typeof result.then === 'function') {
            // If the result is a Promise, then we add our handler
            result.catch(e => {
              if (e.status === 401) {
                // Get a new access token
                getSpotifyAT();
              } else {
                // Some other error type, lets pass this on
                throw e;
              }
            });
          }
          return () => result;
        }
      },
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
  actions: {

  }
})
