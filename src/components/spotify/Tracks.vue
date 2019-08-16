<template lang="pug">
  .tracks
    b-table(:data="shownTracks" narrowed selectable :selected.sync="selectedTrack")
      template(slot-scope="{row}")
        b-table-column(:width="20")
          b-tooltip.is-slow(:label="row.saved ? 'Remove from my Library' : 'Add to my Library'" animated size="is-small")
            a(@click.prevent="toggleSaved(row)")
              b-icon(:pack="row.saved ? 'fas' : 'far'" icon="heart" size="is-small")
        b-table-column(field="track.name" label="TITLE")
          a {{ row.track.name }}
        b-table-column(field="track.name" label="ARTIST")
          a {{ row.track.artists[0].name }}
        b-table-column(field="track.name" label="ALBUM")
          a {{ row.track.album.name }}
        b-table-column(field="track.name" label="DURATION")
          a {{ row.track.duration_ms | formatMs }}
</template>

<script>
import {mapGetters} from 'vuex'
import {formatMs} from '@/filters';

export default {
  name: 'Tracks',
  filters: {
    formatMs,
  },
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    playlist: {
      type: Object,
      default: () => null,
    },
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
    tracks: {
      get() {
        if (this.playlist?.id) {
          return this.spotify.getPlaylistTracks(this.playlist.id, {limit: 50}).then(r => r.items)
        } else {
          return this.spotify.getMySavedTracks({limit:50}).then(r => r.items);
        }
      },
      default: [],
    },
    tracksWithInfo: {
      get() {
        if (this.tracks.length > 0) {
          return this.spotify.containsMySavedTracks(this.tracks.map(t => t.track.id)).then(r => r.map((saved, idx) => ({
            saved,
            ...this.tracks[idx],
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
