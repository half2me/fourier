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
  @import "~bulma/sass/utilities/_all";

  $primary: #66cc99;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099FF;
  $twitter-invert: findColorInvert($twitter);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  @import url('https://fonts.googleapis.com/css?family=Darker+Grotesque|Barlow|Staatliches&display=swap');

  .tooltip.is-slow:not([data-label=""]):hover:before,
  .tooltip.is-slow:not([data-label=""]):hover:after {
    transition-delay: 0.5s;
  }


  html, body {
    font-family: 'Barlow', sans-serif;
    margin: 0;
    padding: 0;
    border: 0;
  }

  #app {
    position: relative;
    min-height: 100vh;
  }

  .page-container {
    padding-bottom: 100px;
  }

  #app, p {
    font-family: 'Barlow', sans-serif;
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
    color: #191414 !important;
  }

  footer {
    position: absolute;
    bottom: 0;
    height: 100px;
    text-align: center;
    width: 100%;
  }
  #app, .columns, .column, .playlists, .tracks {
    height: 100%;
  }
  .top {
     height: 10%;
   }

</style>
