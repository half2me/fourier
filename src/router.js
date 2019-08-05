import Vue from 'vue'
import Router from 'vue-router'
import Spotify from './views/Spotify.vue'
import Home from './views/Home'

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
