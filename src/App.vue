<template lang="pug">
  doctype html
  html
    head
      title= title

      link(rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
        integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous')

      link(rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')

      link(rel='stylesheet', href='/stylesheets/style.css')

    body
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
