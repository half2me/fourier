import Vue from 'vue'
import Vuex from 'vuex'
import Spotify from 'spotify-web-api-js'
import {requestAccessToken as getSpotifyAT} from '@/spotify'
import {loadSpotifyPlayerSDK} from "./spotify"
import config from '@/settings'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    spotify: new Spotify(),
    spotifyPlayer: null,
    spotifyPaused: false,
    currentTrack: '',
    position: 0,
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
    setSpotifyPlayer: (state, name = config.name) => state.spotifyPlayer = new window.Spotify.Player({
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
      state.position = parseInt(val);
    },
  },
  actions: {
    pollSpotifyPosition: async ({commit, dispatch, state}) => {
      if (state.spotifyPlayer && !state.spotifyPaused) {
        const {position} = await state.spotifyPlayer.getCurrentState();
        commit('setPosition', position);
        window.setTimeout(() => {
          dispatch('pollSpotifyPosition');
        }, 1000);
      }
    },
    initSpotifyPlayer: async ({commit, state: {spotifyPlayer}}) => {
      await loadSpotifyPlayerSDK();
      if (!spotifyPlayer) {
        commit('setSpotifyPlayer');
      }
    },
    connectSpotifyPlayer: ({dispatch, commit, state: {spotifyPlayer: p}}) => {
      p.addListener('player_state_changed', async pState => {
        if (pState) {
          const {paused, position, track_window: {current_track}} = pState;
          commit('setSpotifyPaused', paused);
          commit('setCurrentTrack', current_track);
          commit('setPosition', position);
          await dispatch('pollSpotifyPosition');
        }
      });
      return p.connect();
    },
  }
})
