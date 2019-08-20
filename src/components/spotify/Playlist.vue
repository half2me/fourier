<template lang="pug">
  .tracks
    .columns.details
      .column.is-3.is-offset-1
        img(:src="details.images[0].url")
      .column.is-7
        p.on-top PLAYLIST
        h1 {{details.name}}
        p {{details.description}}
        p.author Created by {{details.owner.display_name}}
        br
        b-taglist(attached=true)
          b-tag
            b-icon(icon="compact-disc")
          b-tag(type="is-red") {{tracks.length}}
        b-taglist(attached=true)
          b-tag
            b-icon(icon="clock")
          b-tag(type="is-red") {{totalLen | formatHrs}}
    b-table(:data="tracks" narrowed selectable :selected.sync="selectedTrack" detailed)
      template(slot-scope="{row}")
        b-table-column(:width="20")
          b-tooltip.is-slow(:label="row.saved ? 'Remove from my Library' : 'Add to my Library'" animated size="is-small")
            a(@click.prevent="toggleSaved(row)")
              b-icon(:pack="row.saved ? 'fas' : 'far'" icon="heart" size="is-small")
        b-table-column(field="track.name" label="TITLE")
          p {{ row.track.name }}
        b-table-column(field="track.artist" label="ARTIST")
          p {{ row.track.artists[0].name }}
        b-table-column(field="track.album" label="ALBUM")
          p {{ row.track.album.name }}
        b-table-column(field="analysis.danceability" label="Danceability")
          template(slot="header" slot-scope="{column}")
            b-tooltip(animated type="is-primary" label="Danceability")
              b-icon(icon="child")
          p {{ row.analysis.danceability | percent }}
        b-table-column(field="analysis.tempo" label="Tempo")
          template(slot="header" slot-scope="{column}")
            b-tooltip(animated type="is-primary" label="Tempo")
              b-icon(icon="music-note" pack="mdi")
          p {{ row.analysis.tempo | round }}bpm
        b-table-column(field="analysis.key" label="Key")
          template(slot="header" slot-scope="{column}")
            b-tooltip(animated type="is-primary" label="Key")
              b-icon(icon="music-accidental-sharp" pack="mdi")
          p {{ row.analysis.key | key }}
        b-table-column(field="track.album" label="DURATION")
          template(slot="header" slot-scope="{column}")
            b-icon(icon="clock")
          p {{ row.track.duration_ms | formatMs }}
      template(slot="detail" slot-scope="{row}")
        .columns.detailsHolder
          .column.is-1
            img(:src="row.track.album.images[0].url")
          .column.is-10
            h2 {{row.track.name}}
            p {{row.track.artists.map(a => a.name).join(', ')}}
            p.on-top {{row.track.album.name}}
          .column.is-1
            router-link(:to="{name: 'player', params: {trackId: row.track.id}}")
              b-icon(icon="play" size="is-small")
              span  Play Song
    infinite-loading(@infinite="infiniteHandler")
</template>

<style lang="scss" scoped>
  .details {
    margin-top: 10px;
  }

  .detailsHolder {
    background: rgba(0,0,0,0)!important;
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
import {formatMs, formatHrs, percent, round, key} from '@/filters';
import {mapRouterParams} from '@halftome/vue-router-mapper';

export default {
  name: 'Tracks',
  filters: {
    formatMs,
    percent,
    formatHrs,
    round,
    key,
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
      tracks: [],
      totalLen: 0,
    }
  },
  asyncComputed: {
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
      for (let i =0; i < this.tracks.items.length; i++) {
        total += parseInt(this.tracks.items[i].track.duration_ms)
      }
      return total;
    },
  },
  methods: {
    infiniteHandler(s) {
      this.pull().then((more) => {
        if (more) {
          s.loaded();
        } else {
          s.complete();
        }
      });
    },
    async pull() {
      const limit = 50;
      const offset = this.tracks.length;
      const {items: tracks} = await this.spotify.getPlaylistTracks(this.playlistId, {offset, limit});
      if (tracks.length > 0) {
        const featuresPromise = this.spotify.getAudioFeaturesForTracks(tracks.map(({track}) => track.id)).then(({audio_features: features}) => {
          for (let i = 0; i < tracks.length; i++) {
            tracks[i].analysis = features[i];
            this.totalLen += tracks[i].track.duration_ms;
          }
        });
        const inMyLibraryPromise = this.spotify.containsMySavedTracks(tracks.map(({track}) => track.id)).then(r => r.forEach((saved, idx) => tracks[idx].saved = saved));
        await Promise.all([featuresPromise, inMyLibraryPromise]);

        this.tracks.push(...tracks);
        return ! (tracks.length < limit);
      }
      return false;
    },
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
