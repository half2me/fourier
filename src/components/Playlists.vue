<template lang="pug">
  .playlists
    b-field(label="Playlists").has-text-centered
      b-input(rounded v-model="search" placeholder="Search for a playlist")
    b-table(:data="playlists" narrowed)
      template(slot-scope="props")
        b-table-column(field="tracks.total" label="" numeric width="20")
          b-tag(type="is-primary") {{ props.row.tracks.total }}
        b-table-column(field="name" label="Name")
          a {{ props.row.name }}
</template>

<script>
  import {requestAccessToken} from '@/spotify'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Playlists',
    computed: {
      ...mapGetters(['spotify']),
    },
    data() {
      return {
        playlists: [],
        search: '',
      }
    },
    mounted() {
      this.spotify.getUserPlaylists()
        .catch(e => {if (e.status === 401) {requestAccessToken()}})
        .then(r => this.playlists = r.items);
    },
    methods: {
      selectPlaylist(a) {
        console.log(a)
      },
    },
  }
</script>
