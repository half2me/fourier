import Vue from 'vue'
import Vuex from 'vuex'
import Spotify from 'spotify-web-api-js'
import {requestAccessToken as getSpotifyAT} from '@/spotify'
import {loadSpotifyPlayerSDK} from "./spotify";
import {debounce} from 'lodash-es'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    spotify: new Spotify(),
    spotifyPlayer: null,
    spotifyPaused: false,
    currentTrack: '',
    position: '',
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
    setSpotifyPlayer: (state, name = 'fourier-player') => state.spotifyPlayer = new window.Spotify.Player({
      name,
      getOAuthToken: f => f(state.spotify.getAccessToken())
    }),
    setSpotifyPaused: (state, val) => {
      state.spotifyPaused = val;
    },
    setCurrentTrack: (state, val) => {
      state.currentTrack = val;
    },
    setPosition: (state, val) => {
      console.log(val);
      state.postion = val;
    }
  },
  actions: {
    initSpotifyPlayer: async ({commit, state: {spotifyPlayer}}) => {
      await loadSpotifyPlayerSDK();
      if (!spotifyPlayer) {
        commit('setSpotifyPlayer');
      }
    },
    connectSpotifyPlayer: ({commit, state: {spotifyPlayer: p, spotifyPaused}}) => {
      p.addListener('initialization_error', msg => console.error(msg));
      p.addListener('authentication_error', msg => console.error(msg));
      p.addListener('account_error', msg => console.error(msg));
      p.addListener('playback_error', msg => console.error(msg));
      p.addListener('player_state_changed', ({paused}) => commit('setSpotifyPaused', paused));
      p.addListener('player_state_changed', state => commit('setCurrentTrack', state.track_window.current_track));
      p.addListener('player_state_changed', state => commit('setPosition', state.position));
      return p.connect()
    },
    togglePlayer: ({state: {spotifyPlayer: p}}) => p.togglePlay(),
    next: ({state: {spotifyPlayer: p}}) => p.nextTrack(),
    prev: ({state: {spotifyPlayer: p}}) => p.previousTrack(),
  }
})
