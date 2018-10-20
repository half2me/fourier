<template>
  <div id="app">
    <button @click="auth">Auth</button>
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import {requestAccessToken as auth} from './spotify'
  export default {
    name: 'App',
    mounted() {
    },
    methods: {
      auth,
    },
  }
</script>
