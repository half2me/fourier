<template lang="pug">
  .tracks
    .columns.details
      .column.is-3.is-offset-1
        img(:src="this.details.images[0].url")
      .column.is-7
        p.on-top PLAYLIST
        h1 {{this.details.name}}
        p {{this.details.description}}
        p.author Created by {{this.details.owner.display_name}}
        br
        b-taglist(attached=true)
          b-tag
            b-icon(icon="compact-disc")
          b-tag(type="is-red") {{this.details.tracks.items.length}}
        b-taglist(attached=true)
          b-tag
            b-icon(icon="clock")
          b-tag(type="is-red") {{totalLength | formatHrs}}
    b-table(:data="shownTracks" narrowed selectable :selected.sync="selectedTrack" detailed :loading="$asyncComputed.tracks.updating")
      template(slot-scope="{row}")
        b-table-column(:width="20")
          b-tooltip.is-slow(:label="row.saved ? 'Remove from my Library' : 'Add to my Library'" animated size="is-small")
            a(@click.prevent="toggleSaved(row)")
              b-icon(:pack="row.saved ? 'fas' : 'far'" icon="heart" size="is-small")
        b-table-column(field="track.name" label="TITLE")
          a {{ row.track.name }}
        b-table-column(field="track.artist" label="ARTIST")
          a {{ row.track.artists[0].name }}
        b-table-column(field="track.album" label="ALBUM")
          a {{ row.track.album.name }}
        b-table-column(field="track.album" label="DURATION")
          template(slot="header" slot-scope="{column}")
            b-icon(icon="clock")
          a {{ row.track.duration_ms | formatMs }}
      template(slot="detail" slot-scope="{row}")
        .columns
          .column.is-1
            img(:src="row.track.album.images[0].url")
          .column.is-10
            h2 {{row.track.name}}
            p {{row.track.artists[0].name}}
            p.on-top {{row.track.album.name}}
          .column.is-1
            a(href="#")
              b-icon(icon="play" size="is-small")
              span  Play Song
</template>

<style lang="scss" scoped>
  .details {
    margin-top: 10px;
  }

  .table tr.detail, tr.detail {
    background: rgba(0,0,0,0)!important;
    border: none!important;
  }


  h1 {
    font-family: 'Staatliches', sans-serif;
    font-size: 3rem;
  }
  h2 {
    font-family: 'Staatliches', sans-serif;
    font-size: 2rem;
  }

  .on-top, .author {
    color: #666;
  }
</style>


<script>
import {mapGetters} from 'vuex'
import {formatMs} from '@/filters';
import {formatHrs} from '@/filters';
import {mapRouterParams} from "@halftome/vue-router-mapper";

export default {
  name: 'Tracks',
  filters: {
    formatMs,
    formatHrs,
  },
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
  },
  data() {
    return {
      search: '',
      selectedTrack: null,
    }
  },
  asyncComputed: {
    tracks: {
      get() {
        if (this.playlistId) {
          return this.spotify.getPlaylistTracks(this.playlistId, {limit: 50}).then(r => r.items)
        } else {
          return this.spotify.getMySavedTracks().then(r => r.items);
        }
      },
      default: [],
    },
    details: {
      get() {
        if (this.playlistId) {
          return this.spotify.getPlaylist(this.playlistId)
        }
      },
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
    ...mapRouterParams(['playlistId']),
    ...mapGetters(['spotify']),
    shownTracks() {
      return this.tracksWithInfo.filter(t =>
        t.track.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    t.track.album.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    t.track.artists.some(a => a.name.toLowerCase().includes(this.search.toLowerCase()))
      )
    },
    totalLength() {
      let total = 0;
      console.log(this.details.tracks.items[1].track);
      for (let i =0; i < this.details.tracks.items.length; i++) {
        total += parseInt(this.details.tracks.items[i].track.duration_ms)
      }
      return total;
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
