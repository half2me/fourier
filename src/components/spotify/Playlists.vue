<template lang="pug">
  .playlists
    b-field(label="PLAYLISTS").has-text-centered
      b-input(v-model="search" placeholder="Search for a playlist" icon="search")
    b-table(:data="shownPlaylists" narrowed selectable :selected.sync="selectedPlaylist" :loading="$asyncComputed.playlists.updating")
      template(slot-scope="props")
        b-table-column(field="name")
            p {{ props.row.name }}
        b-table-column(field="tracks.total" label="" numeric width="20")
            b-tag(type="is-primary") {{ props.row.tracks.total }}
</template>

<script>
  import {mapGetters} from 'vuex'
  import AddToAppleMusic from '@/components/apple-music/AddToAppleMusic'

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
          return this.spotify.getUserPlaylists().then(r => r.items);
        },
        default: [],
      }
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
    data() {
      return {
        search: '',
      }
    },
    methods: {
      addToAppleMusic(playlist) {
        this.$modal.open({
          parent: this,
          component: AddToAppleMusic,
          props: {
            playlist,
          },
          hasModalCard: true
        })
      },
    },
  }
</script>
