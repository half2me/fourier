<template lang="pug">
  .tracks
    b-table(:data="tracks.tracks" narrowed selectable :selected.sync="selectedTrack" :loading="$asyncComputed.tracks.updating")
      template(slot-scope="{row}")
        b-table-column(:width="20")
          b-tooltip.is-slow(:label="row.saved ? 'Remove from my Library' : 'Add to my Library'" animated size="is-small")
            a(@click.prevent="toggleSaved(row)")
              b-icon(:pack="row.saved ? 'fas' : 'far'" icon="heart" size="is-small")
        b-table-column(field="name" label="TITLE")
          a {{ row.name }}
        b-table-column(field="popularity" label="POPULARITY")
          a {{ row.popularity }}
        b-table-column(field="name" label="DURATION")
          a {{ row.duration_ms | formatMs }}
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
      artistId: this.$route.params.id,
    }
  },
  asyncComputed: {
    tracks: {
      get() {
        if (this.artistId) {
          return this.spotify.getArtistTopTracks(this.artistId, 'GB')
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
