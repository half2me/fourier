<template lang="pug">
  #app
    nav.navbar.is-primary(aria-label='main-navigation')
      img.logo(src="./assets/logo-black.png")
      .navbar-brand
        router-link(:to="{name: 'spotify'}" :class="{'is-active': $route.name === 'spotify'}").navbar-item.spotify
          b-icon(pack="fab" icon="spotify")
        router-link(:to="{name: 'apple-music'}" :class="{'is-active': $route.name === 'apple-music'}").navbar-item.apple
          b-icon(pack="fab" icon="apple")
        router-link(:to="{name: 'settings'}" :class="{'is-active': $route.name === 'settings'}").navbar-item.settings
          b-icon(icon="cog")
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
  @import "~bulma/sass/utilities/_all";

  $primary: #1DB954;
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

  .tooltip.is-slow:not([data-label=""]):hover:before,
  .tooltip.is-slow:not([data-label=""]):hover:after {
    transition-delay: 0.5s;
  }

  .column img {
    border: 2px #191414 solid;
  }
</style>
