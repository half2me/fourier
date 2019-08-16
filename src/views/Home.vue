<template lang="pug">
  .page-container
    back-to-top
      button(type="button").btn-to-top
        b-icon(icon="chevron-up")
    nav.navbar(aria-label='main-navigation')
      router-link(:to="{name: 'home'}" :class="{'is-active': $route.name === 'home'}")
        img.logo(src="@/assets/logo-red.svg")
    div
      .columns.top-child
        .column.is-5.is-offset-1
          .main-item
            img(src="@/assets/logo-white.svg" width="15%")
            br
            br
            h1 Don't just listen to music
            br
            h2 Experience it
            br
            router-link(:to="{name: 'playlists'}").button Let's do this
            br
            br
            a(v-scroll-to="'#go'" href="#").go
              p Learn more
              b-icon(icon="chevron-down" size="is-small")
        .column.is-5
          router-link(:to="{name: 'playlists'}")
            img(src="@/assets/screenshot.png").top-padding.glow
      .waveWrapper.waveAnimation
        .waveWrapperInner.bgTop
          .wave.waveTop(style="background-image: url('http://front-end-noobs.com/jecko/img/wave-top.png')")
        .waveWrapperInner.bgMiddle
          .wave.waveMiddle(style="background-image: url('http://front-end-noobs.com/jecko/img/wave-mid.png')")
        .waveWrapperInner.bgBottom
          .wave.waveBottom(style="background-image: url('http://front-end-noobs.com/jecko/img/wave-bot.png')")


      .second-child#go
        h1 OVERVIEW
        br
        .columns
          .column.is-2.is-offset-3
            b-icon(pack="fab" icon="spotify" size="is-large" type="is-primary")
            br
            br
            h3 Seamless Spotify Integration
            p With full Spotify integration, it's as simple as signing in and you're ready to start your experience!
          .column.is-2
            b-icon(icon="money-bill-wave" size="is-large" type="is-primary")
            br
            br
            h3 Free To Use
            p No accounts means no payments! Our audio analysis tool is completely free to use!
            span
              p Please note: A Spotify Premium account is required
          .column.is-2
            b-icon(icon="chart-pie" size="is-large" type="is-primary")
            br
            br
            h3 Visualisation
            p View all songs like you've never seen them before using our visualisation tools!

      .third-child
        h1 FEATURES
        br
        .columns
          .column.is-6
            p
          .column.is-6
            p

      .fourth-child
        h1 CONTACT US
        br
        .columns

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
  .btn-to-top {
    background-color: #ca3e47;
    color: white;
    width: 50px;
    border: none;
    height: 50px;
    border-radius: 50%;
    font-size: 15px;
    line-height: 15px;
  }

  .glow:hover {

    box-shadow: 0 0 25px #fff;
  }
  span p {
      font-size: 10px;
    color: #aaa;
  }

  .third-child {
    background-color: #333333;
    padding: 3rem 1.5rem 3rem;
    text-align: center;
  }
  .fourth-child {
    text-align: center;
    color: #191414;
    background-color: #fefefe;
    padding: 3rem 1.5rem 3rem;
  }

  .top-padding {
    top: 50vh;
    transform: translateY(-30vh) rotate(4deg);
    border-radius: 10px;
    position: relative;
    border: 3px solid white;
    //transform: rotate(4deg);
  }
  .go:hover {
    color: #fff;
    text-shadow: 0 0 5px #ccc;
  }

  .button {
    border: 1px solid $white;
    background: none;
    color: $white;
    width: 30%;
    font-family: 'Staatliches', sans-serif;
    font-size: 24px;
  }

  .button:hover {
    background: rgba(0,0,0,0.2);
  }

  .main-item {
    position: relative;
    top: 50vh;
    transform: translateY(-30vh);
    text-align: center;
  }

  h2, h3 {
    font-family: 'Staatliches', sans-serif;
  }

  h2 {
margin-top: -10%;
    font-size: 5rem!important;
  }
  h1 {
    text-transform: uppercase;
    font-size: 2rem!important;
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
    text-align: center;
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
