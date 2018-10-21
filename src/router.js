import Vue from 'vue'
import Router from 'vue-router'
import Spotify from './views/Spotify.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'spotify',
      component: Spotify
    },
    {
      path: '/auth-callback',
      name: 'authCallback',
      component: () => import(/* webpackChunkName: "callback" */ './views/AuthCallback')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "callback" */ './views/NotFound') }
  ]
})
