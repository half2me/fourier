<template lang="pug">
  .tracks
    b-field(label="Tracks").has-text-centered
      b-input(v-model="search" placeholder="Search for a Track" icon="music")
    b-table(:data="shownTracks" narrowed selectable :selected.sync="selectedTrack" :loading="$asyncComputed.tracks.updating")
      template(slot-scope="{row}")
        b-table-column(:width="20")
          b-tooltip.is-slow(:label="row.saved ? 'Remove from my Library' : 'Add to my Library'" animated size="is-small")
            a(@click.prevent="toggleSaved(row)")
              b-icon(:pack="row.saved ? 'fas' : 'far'" icon="heart" size="is-small")
        b-table-column(field="track.name" label="")
          a {{ row.track.name }}
        b-table-column(width="20px" label=" ")
          b-tooltip.is-slow(label="Add to Apple Music" animated size="is-small")
            a(@click="addToAppleMusic()")
              b-icon(pack="fab" icon="apple")
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
            return this.spotify.getPlaylistTracks(this.playlist.id, {limit: 50}).then(r => r.items)
          } else {
            return this.spotify.getMySavedTracks().then(r => r.items);
          }
        },
        default: [],
      },
      tracksWithInfo: {
        get() {
          if (this.tracks.length > 0) {
            return this.spotify.containsMySavedTracks(this.tracks.map(t => t.track.id)).then(r => r.map((saved, idx) => ({
              saved,
              ...this.tracks[idx]
            })))
          } else {
            return [];
          }
        },
        default: [],
      },
    },
    computed: {
      ...mapGetters(['spotify']),
      shownTracks() {
        return this.tracksWithInfo.filter(t =>
          t.track.name.toLowerCase().includes(this.search.toLowerCase()) ||
          t.track.album.name.toLowerCase().includes(this.search.toLowerCase()) ||
          t.track.artists.some(a => a.name.toLowerCase().includes(this.search.toLowerCase()))
        )
      },
      selectedTrack: {
        get() {
          return this.selected
        },
        set(val) {
          this.$emit('change', val)
        },
      },
    },
    methods: {
      async toggleSaved(track) {
        if (track.saved) {
          await this.spotify.removeFromMySavedTracks([track.track.id]).then(() => track.saved = false);
        } else {
          await this.spotify.addToMySavedTracks([track.track.id]).then(() => track.saved = true);
        }
      },
    },
  }
</script>
