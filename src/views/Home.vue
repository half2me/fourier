<template lang="pug">
.container-flex
  .mainCenter.white-fade
    p.welcome
      b Fourier
    p.subtitle Your audio admin tool
  .container
   p Hello
  footer
    .socials
      a(target="_blank" href="http://fb.me/fourierAudio")
        b-icon(pack="fab" icon="facebook-square")
      a(target="_blank" href="http://twitter.com/fourierAudio")
        b-icon(pack="fab" icon="twitter-square")
    p &copy; 2019 Fourier Audio. All rights reserved
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>
