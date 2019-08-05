<template lang="pug">
  #app
    .page-container
      nav.navbar.is-primary(aria-label='main-navigation')
        router-link(:to="{name: 'home'}" :class="{'is-active': $route.name === 'home'}")
          img.logo(src="./assets/logo-grey.svg")
        .navbar-brand
          router-link(:to="{name: 'home'}" :class="{'is-active': $route.name === 'home'}").navbar-item.home
            b-icon(icon="home")
          router-link(:to="{name: 'spotify'}" :class="{'is-active': $route.name === 'spotify'}").navbar-item.spotify
            b-icon(pack="fab" icon="spotify")
      router-view
    footer.footer
      .socials
        a(target="_blank" :href="config.fb")
          b-icon(pack="fab" icon="facebook-square")
        a(target="_blank" :href="config.twitter")
          b-icon(pack="fab" icon="twitter-square")
      p &copy; 2019 Fourier Audio. All rights reserved
</template>

<script>
    import config from "./settings"

    export default {
        name: 'App',
        data() {
            return {
                config,
            }
        },
        mounted() {
        },
        methods: {},
    }


</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Darker+Grotesque|Barlow|Staatliches&display=swap');

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  #app, .columns, .column, .playlists, .tracks {
    height: 100%;
  }

</style>
<style lang="scss" scoped>

  #app {
    position: relative;
    min-height: 100vh;
  }

  .page-container {
    padding-bottom: 100px;
  }
  nav {
    height: 50px;
    background-color: #1DB954;
  }

  nav img {
    height: 90%;
    margin-top: 2px;
    margin-left: 10px;
    top: 50%;
  }

  .navbar-brand {
    position: absolute;
    right: 0;
    top:0;
    color: #fff;
  }

  .navbar-brand a {
    color: #fff;
  }

  .is-active {
    color: $spotify-invert !important;
  }

  footer {
    position: absolute;
    bottom: 0;
    height: 100px;
    text-align: center;
    width: 100%;
  }
  .top {
    height: 10%;
  }
</style>
