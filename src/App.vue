<template lang="pug">
    #app
      nav.navbar.is-primary(aria-label='main-navigation')
        img.logo(src="./assets/logo-black.png")
        .navbar-brand
          router-link(:to="{name: 'spotify'}" :class="{'is-active': $route.name === 'spotify'}").navbar-item.spotify
            b-icon(pack="fab" icon="spotify")
          router-link(:to="{name: 'apple-music'}" :class="{'is-active': $route.name === 'apple-music'}").navbar-item.apple
            b-icon(pack="fab" icon="apple")
      router-view
</template>

<script>
  export default {
    name: 'App',
    mounted() {
    },
    methods: {},
  }


</script>

<style lang="scss">
@import './assets/css/style.css';
</style>
