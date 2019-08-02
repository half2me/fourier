<template lang="pug">
  #app
    nav.navbar.is-primary(aria-label='main-navigation')
      router-link(:to="{name: 'home'}" :class="{'is-active': $route.name === 'home'}")
        img.logo(src="./assets/logo-grey.svg")
      .navbar-brand
        router-link(:to="{name: 'home'}" :class="{'is-active': $route.name === 'home'}").navbar-item.home
          b-icon(icon="home")
        router-link(:to="{name: 'spotify'}" :class="{'is-active': $route.name === 'spotify'}").navbar-item.spotify
          b-icon(pack="fab" icon="spotify")
        router-link(:to="{name: 'apple-music'}" :class="{'is-active': $route.name === 'apple-music'}").navbar-item.apple
          b-icon(pack="fab" icon="itunes-note")
        router-link(:to="{name: 'settings'}" :class="{'is-active': $route.name === 'settings'}").navbar-item.settings
          b-icon(icon="cog")
    router-view
    footer.footer
      .socials
        a(target="_blank" href="http://fb.me/fourierAudio")
          b-icon(pack="fab" icon="facebook-square")
        a(target="_blank" href="http://twitter.com/fourierAudio")
          b-icon(pack="fab" icon="twitter-square")
      p &copy; 2019 Fourier Audio. All rights reserved
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

  .tooltip.is-slow:not([data-label=""]):hover:before,
  .tooltip.is-slow:not([data-label=""]):hover:after {
    transition-delay: 0.5s;
  }

</style>
