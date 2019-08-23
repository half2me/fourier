<template lang="pug">
  .playlists
    .columns.is-multiline
      .column.is-2(v-for="playlist in playlistsWithUrl")
        .playlist-img
          router-link(:to="{name: 'playlist', params: {playlistId: playlist.id}}")
            img(:src="playlist.displayImageUrl")
            .info-surround
              .playlist-info
                .columns
                  .column.is-4
                    p
                      b-icon(icon="compact-disc" size="is-small")
                      b  {{ playlist.tracks.total }}
                  .column.is-8.right
                    p
                      b-icon(icon="user" size="is-small")
                      b  {{ playlist.owner.display_name }}
        .columns
          .column
            p
              b {{playlist.name}}
        .columns.playlist-info
          .column.is-5
</template>

<style lang="scss" scoped>
  .playlists {
    padding: 1rem;
    color: #fff;
    text-align: center;
  }

  .info-surround {
    height: 50px;
    visibility: hidden;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    margin-top: -56px;
  }

  .right {
    justify-content: flex-end;
    float: right;
    position: relative;
    text-align: right;
  }

  .playlist-info {
    opacity: 1;
    color: #fff;
    margin-left: 10px;
    margin-right: 10px;
  }

  .imgPlay {
    max-width: 300px;
  }

  .playlist-img a:hover .info-surround {
    visibility: visible;
  }
</style>


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
    playlistsWithUrl() {
      return this.shownPlaylists.map(p => ({
        ...p,
        displayImageUrl: p.images[p.images.length > 1 ? 1 : 0].url,
      }));
    },
    selectedPlaylist: {
      get() {
        return this.selected;
      },
      set(val) {
        this.$emit('change', val)
      },
    },
  },
  methods: {},
}
</script>
