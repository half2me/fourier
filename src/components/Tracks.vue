<template lang="pug">
  .tracks
    b-field(label="Tracks").has-text-centered
      b-input(rounded v-model="search" placeholder="Search for a Track")
    b-table(:data="playlists" narrowed)
      template(slot-scope="props")
        b-table-column(field="name" label="Name")
          a {{ props.row.name }}
</template>

<script>
  import {requestAccessToken} from '@/spotify'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Tracks',
    computed: {
      ...mapGetters(['spotify']),
    },
    mounted() {
      this.spotify.getUserTracks()
        .catch(e => {if (e.status === 401) {requestAccessToken()}})
        .then(r => this.playlists = r.items);
    },
    methods: {},
  }
</script>
