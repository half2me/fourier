<template lang="pug">
  .tracks
    b-field(label="Tracks").has-text-centered
      b-input(rounded v-model="search" placeholder="Search for a Track")
    b-table(:data="tracks" narrowed selectable :selected.sync="selectedTrack")
      template(slot-scope="props")
        b-table-column(:width="20")
          b-icon(icon="plus" size="is-small" type="is-primary")
        b-table-column(field="track.name" label="Name")
          a {{ props.row.track.name }}
</template>

<script>
  import {requestAccessToken} from '@/spotify'
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
          return this.playlist ?
            this.spotify.getPlaylistTracks(this.playlist.id)
              .catch(e => {
                if (e.status === 401) {
                  requestAccessToken()
                }
              })
              .then(r => r.items)
            :
            this.spotify.getMySavedTracks()
              .catch(e => {
                if (e.status === 401) {
                  requestAccessToken()
                }
              })
              .then(r => r.items);
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
