<template lang="pug">
  div
    .mainCenter.white-fade
      .columns
        .column.is-5
          img(src="@/assets/logo-stacked.png" width="75%")
          p.subtitle Your audio admin tool
        .column.is-7
          p.welcome Unleash the power of
          img(src="@/assets/Spotify_Logo_CMYK_White.png" width="50%")
    .container
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 32px!important;
  }

  .mainCenter {
    width: 100%;
    text-align: center;
  }

  .welcome {
    font-family: 'Staatliches', sans-serif;
    font-size: 48px;
  }

  .white-fade {
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(102,204,153,1) 90%);
  }
</style>
