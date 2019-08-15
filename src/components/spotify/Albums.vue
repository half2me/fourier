<template lang="pug">
  .playlists
    .columns.is-multiline
      .column.is-2(v-for="album in shownAlbums")
        .playlist-img
          router-link(:to="{name: 'album', params: {id: album.album.id}}")
            img(:src="album.album.images[0].url")
            .info-surround
              .playlist-info
                .columns
                  .column.is-4
                    p
                      b-icon(icon="compact-disc" size="is-small")
                      b  {{ album.album.tracks.total }}
                  .column.is-8.right
                    p
                      b-icon(icon="user" size="is-small")
                      b  {{ album.album.artists[0].name }}
        .columns
          .column.is-10
            p.playlist-name
              b {{album.album.name}}
        .columns.playlist-info
          .column.is-5
</template>

<style lang="scss" scoped>
  .playlists {
    height: 100vh;
    overflow: scroll;
    padding: 1rem;
    color: #fff;
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

  .playlist-img a:hover .info-surround {
    visibility: visible;
  }
</style>


<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Albums',
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
    albums: {
      get() {
        return this.spotify.getMySavedAlbums().then(r => r.items);
      },
      default: [],
    },
  },
  computed: {
    ...mapGetters(['spotify']),
    shownAlbums() {
      return this.albums;
    },
    selectedAlbum: {
      get() {
        return this.selected;
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
