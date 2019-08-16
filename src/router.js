import Vue from 'vue'
import Router from 'vue-router'
import Spotify from './views/Spotify.vue'
import Home from './views/Home'
import Playlists from './components/spotify/Playlists';
import Albums from './components/spotify/Albums';
import Artists from './components/spotify/Artists';
import Tracks from './components/spotify/Tracks';
import Playlist from './components/spotify/Playlist';
import Album from './components/spotify/Album';
import Artist from './components/spotify/Artist';
import Player from './components/spotify/Player';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/spotify',
      name: 'spotify',
      component: Spotify,
      children: [
        {
          path:'player/:trackId',
          name: 'player',
          component: Player,
        },
        {
          path:'playlists',
          name:'playlists',
          component: Playlists,
        },
        {
          path:'playlists/:playlistId',
          name:'playlist',
          component: Playlist,
          meta: {category: 'playlist'},
        },
        {
          path:'albums',
          name:'albums',
          component: Albums,
        },
        {
          path:'album/:id',
          name: 'album',
          component: Album,
        },
        {
          path:'artists',
          name:'artists',
          component: Artists,
        },
        {
          path:'artist/:id',
          name:'artist',
          component: Artist,
        },
        {
          path:'tracks',
          name:'tracks',
          component: Tracks,
        },
      ],
    },
    {
      path: '/spotify/auth-callback',
      name: 'authCallback',
      component: () => import(/* webpackChunkName: "callback" */ './views/AuthCallback'),
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "callback" */ './views/NotFound') },
  ],
})
