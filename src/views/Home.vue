<template lang="pug">
  .page-container
    nav.navbar(aria-label='main-navigation')
      router-link(:to="{name: 'home'}" :class="{'is-active': $route.name === 'home'}")
        img.logo(src="@/assets/logo-red.svg")
    div
      .columns.top-child
        .column.is-10
          .main-item
            h1 Unleash the power of
            img(src="@/assets/Spotify_Logo_CMYK_White.png" width="50%")
            br
            router-link(:to="{name: 'playlists'}" tag="button").button Let's do this
            br
            br
            b-tooltip.is-slow(label="Learn More" animated)
              b-button(@click="scrollMeTo('go')")
                b-icon(icon="arrow-down")

      div.waveWrapper.waveAnimation
        div.waveWrapperInner.bgTop
          div.wave.waveTop(style="background-image: url('http://front-end-noobs.com/jecko/img/wave-top.png')")
        div.waveWrapperInner.bgMiddle
          div.wave.waveMiddle(style="background-image: url('http://front-end-noobs.com/jecko/img/wave-mid.png')")
        div.waveWrapperInner.bgBottom
          div.wave.waveBottom(style="background-image: url('http://front-end-noobs.com/jecko/img/wave-bot.png')")


      div.second-child(ref="go")
        .columns
          .column.is-2.is-offset-3
            b-icon(pack="fab" icon="spotify" size="is-large" type="is-primary")
            h2 Seamless Spotify Integration
            p Just sign in to Spotify and browse your library
          .column.is-2
            b-icon(icon="money-bill-wave" size="is-large" type="is-primary")
            h2 Free
          .column.is-2
            b-icon(icon="chart-pie" size="is-large" type="is-primary")
            h2 Visualisation Graphs
            p View information about a track in a clean format
</template>

<script>
import config from '@/settings'
export default {
  name: 'Home',
  data() {
    return {
      config,
    }
  },
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
  },
}
</script>

<style lang="scss" scoped>
  .button {
    border: 1px solid $white;
    background: none;
    color: $white;
    width: 15%;
    font-family: 'Staatliches', sans-serif;
    font-size: 24px;
  }

  .button:hover {
    background: rgba(0,0,0,0.2);
  }

  .main-item {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  h1, h2 {
    font-family: 'Staatliches', sans-serif;
  }

  .divider {
    background-image: url('../../src/assets/divider.png');
    height: 50px;
    position: relative;
  }

  @keyframes move_wave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.55)
    }
    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1)
    }
  }
  .waveWrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  .waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100vh;
    background-image: linear-gradient(to top, #8a1b22 20%, #ca3e47 80%);
  }
  .bgTop {
    z-index: 15;
    opacity: 0.5;
  }
  .bgMiddle {
    z-index: 10;
    opacity: 0.75;
  }
  .bgBottom {
    z-index: 5;
  }
  .wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100vh;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }
  .waveTop {
    background-size: 50% 100px;
  }
  .waveAnimation .waveTop {
    animation: move-wave 3s;
    -webkit-animation: move-wave 3s;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }
  .waveMiddle {
    background-size: 50% 120px;
  }
  .waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
  }
  .waveBottom {
    background-size: 50% 100px;
  }
  .waveAnimation .waveBottom {
    animation: move_wave 15s linear infinite;
  }
  .second-child {
    background-color: #fefefe;
    color: #000;
    text-align: center;
    padding: 3rem 1.5rem 6rem;
  }


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
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(202,62,71,1) 90%);
  }

  .top-child {
    height: 100vh;
    margin-bottom: -40px;
  }

  .second-child {
    margin-bottom: -10px;
  }

  .columns {
    position: relative;
    z-index: 999;
    text-align: center;
  }

  div.audio {
    position: absolute;
    width: 100%;
    margin-top: 10%;
  }

/*
  span {
    display: block;
    bottom: 0px;
    width: 13px;
    height: 200px;
    border-radius: 4px;
    position: absolute;
    animation: audio-wave 5s  ease-in-out;
  }

  span:nth-child(2) {
    left: 17px;
    animation-delay: 0.5s;
  }

  span:nth-child(3) {
    left: 34px;
    animation-delay: 1s;
  }

  span:nth-child(4) {
    left: 51px;
    animation-delay: 1.5s;
  }

  span:nth-child(5) {
    left: 68px;
    animation-delay: 2s;
  }
  span:nth-child(6) {
    left: 85px;
    animation-delay: 2.5s;
  }
  span:nth-child(7) {
    left: 102px;
    animation-delay: 3s;
  }
  span:nth-child(8) {
    left: 119px;
    animation-delay: 3.5s;
  }
  span:nth-child(9) {
    left: 136px;
    animation-delay: 4s;
  }
  span:nth-child(10) {
    left: 153px;
    animation-delay: 4.5s;
  }
*/
  @keyframes audio-wave {
    0% {height:10px;transform:translateY(0px);background: #fefefe;}
    25% {height:100px;transform:translateY(50px);background: #fefefe;}
    /*effect is to animate the height of each span from 5px to 30px*/
    /*translateY makes Y axis move down to give the effect that it is growing from the center*/

    50% {height:10px;transform:translateY(0px);background:#fefefe;}
    100% {height:10px;transform:translateY(0px);background:#fefefe;}
  }
</style>
