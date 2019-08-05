<template lang="pug">
  .playlists
    .top
      b-field(label="Playlists").has-text-centered
        b-input(v-model="search" placeholder="Search for a playlist" icon="search")
    b-table(:data="shownPlaylists" narrowed selectable :selected.sync="selectedPlaylist" :loading="$asyncComputed.playlists.updating")
      template(slot-scope="{row: {name, tracks}}")
        b-table-column(field="name")
            p
              b {{ name }}
            b-taglist(attached=true)
              b-tag(type="is-dark") Tracks
              b-tag(type="is-primary") {{ tracks.total }}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Playlists',
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    selected: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  asyncComputed: {
    playlists: {
      get() {
        return this.spotify.getUserPlaylists().then(r => r.items);
      },
      default: [],
    },
  },
  computed: {
    ...mapGetters(['spotify']),
    shownPlaylists() {
      return this.playlists.filter(
        p => p.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    selectedPlaylist: {
      get() {
        return this.selected
      },
      set(val) {
        this.$emit('change', val)
      },
    },
  },
  methods: {
  },
}
</script>
