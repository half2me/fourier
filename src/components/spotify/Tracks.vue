<template lang="pug">
  .tracks
    b-field(label="Tracks").has-text-centered
      b-input(v-model="search" placeholder="Search for a Track" icon="music")
    b-table(:data="tracks" narrowed selectable :selected.sync="selectedTrack")
      template(slot-scope="props")
        b-table-column(:width="20")
          b-icon(icon="plus" size="is-small" type="is-primary")
        b-table-column(field="track.name" label="Name")
          a {{ props.row.track.name }}
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Tracks',
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      playlist: {
        type: Object,
        default: () => null,
      },
      selected: {
        type: Object,
        default: () => null,
      }
    },
    data() {
      return {
        search: '',
      }
    },
    asyncComputed: {
      tracks: {
        get() {
          if (this.playlist?.id) {
            return this.spotify.getPlaylistTracks(this.playlist.id).then(r => r.items)
          } else {
            return this.spotify.getMySavedTracks().then(r => r.items);
          }
        },
        default: [],
      },
    },
    computed: {
      ...mapGetters(['spotify']),
      selectedTrack: {
        get() {
          return this.selected
        },
        set(val) {
          this.$emit('change', val)
        },
      },
    },
    methods: {},
  }
</script>
