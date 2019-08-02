import Vue from 'vue'
import Router from 'vue-router'
import Spotify from './views/Spotify.vue'
import AppleMusic from './views/AppleMusic'
import Settings from './views/Settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'spotify' },
    },
    {
      path: '/spotify',
      name: 'spotify',
      component: Spotify
    },
    {
      path: '/apple-music',
      name: 'apple-music',
      component: AppleMusic,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/spotify/auth-callback',
      name: 'authCallback',
      component: () => import(/* webpackChunkName: "callback" */ './views/AuthCallback')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "callback" */ './views/NotFound') }
  ]
})
