<template lang="pug">
  .playlists
    b-field(label="Playlists").has-text-centered
      b-input(rounded v-model="search" placeholder="Search for a playlist")
    b-table(:data="playlists" narrowed selectable :selected.sync="selectedPlaylist")
      template(slot-scope="props")
        b-table-column(field="tracks.total" label="" numeric width="20")
          b-tag(type="is-primary") {{ props.row.tracks.total }}
        b-table-column(field="name" label="Name")
          p {{ props.row.name }}
</template>

<script>
  import {requestAccessToken} from '@/spotify'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Playlists',
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      selected: {
        type: Object,
        default: () => null,
      }
    },
    asyncComputed: {
      playlists: {
        get() {
          return this.spotify.getUserPlaylists()
            .catch(e => {
              if (e.status === 401) {
                requestAccessToken()
              }
            })
            .then(r => r.items);
        },
        default: [],
      }
    },
    computed: {
      ...mapGetters(['spotify']),
      selectedPlaylist: {
        get() {
          return this.selected
        },
        set(val) {
          this.$emit('change', val)
        },
      },
    },
    data() {
      return {
        search: '',
      }
    },
    methods: {},
  }
</script>
