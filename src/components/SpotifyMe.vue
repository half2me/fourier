<template>
  <div class="hello">
    <p>Hello</p>
  </div>
</template>

<script>
  import {requestAccessToken} from '@/spotify'
  import {mapGetters} from 'vuex'

  export default {
    name: 'SpotifyMe',
    computed: {
      ...mapGetters(['spotify']),
    },
    mounted() {
      this.spotify.getMySavedTracks()
        .catch(e => {
          if (e.status === 401) {
            requestAccessToken();
          }
        })
        .then(r => console.log(r));
    },
    methods: {},
  }
</script>
