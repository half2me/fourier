<template>
  <div>
    <h1>AuthCallback</h1>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'AuthCallback',
  mounted() {
    const params = this.$route.hash.substr(1).split('&').reduce(
      (prev, item) => ({[item.split('=')[0]]: item.split('=')[1], ...prev}), {},
    );
    this.updateSpotifyToken(params.access_token);
    this.$router.push({name: 'playlists'});
  },
  methods: {
    ...mapMutations(['updateSpotifyToken']),
  },
}
</script>
