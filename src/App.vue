<template lang="pug">
  #app
    router-view
    footer.footer
      .socials
        a(target="_blank" :href="config.fb")
          b-icon(pack="fab" icon="facebook-square")
        a(target="_blank" :href="config.twitter")
          b-icon(pack="fab" icon="twitter-square")

      a(target="_blank" href="mailto:info@fourieraudio.co.uk") info@fourieraudio.co.uk
      p &copy; 2019 Fourier Audio. All rights reserved
</template>

<script>
import config from './settings'

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


  .page-container {
    padding-bottom: 150px;
    color: white;
  }
  nav {
    height: 50px;
  }

  nav img {
    height: 90%;
    margin-top: 2px;
    margin-left: 10px;
    top: 50%;
  }

  .navbar {
    background-color: #fff!important;
    border-bottom: 1px solid #f1f1f1;
  }

  .navbar-brand {
    position: absolute;
    right: 0;
    top:0;
    color: #fff;
  }

  .navbar-brand a {
    color: $red;
  }

  .navbar-brand a:active {
    color: $black;
  }

  a {
    color: $white;
  }

  #app, .column {
    height: 100%;
  }
  .table, .table thead th {
    color: white;
    background-color: rgba(0,0,0,0);
  }

  .table td {

    border-bottom: rgba(255,255,255,0.2) solid 1px;
  }

</style>
<style lang="scss" scoped>

  footer {
    position: absolute;
    background-color: #333333;
    color: #fff;
    bottom: 0;
    height: 100px;
    text-align: center;
    width: 100%;
  }

  footer a:hover {
    color: $red;
  }

  #app {
    position: relative;
    min-height: 100vh;
  }


  .is-active {
    color: $spotify-grey !important;
  }

  .top {
    height: 10%;
  }

</style>
