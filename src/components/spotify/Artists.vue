<template lang="pug">
  .playlists
    .columns.is-multiline
      .column.is-2(v-for="artist in shownArtists.artists.items")
        .playlist-img
          router-link(:to="{name: 'artist', params: {id: artist.id}}")
            img(:src="artist.images[0].url")
            .info-surround
              .playlist-info
                .columns
                  .column.is-9
                    p
                      b-icon(icon="user-plus" size="is-small")
                      b  {{ artist.followers.total.toLocaleString() }}
        .columns
          .column.is-10
            p
              b {{artist.name}}
        .columns.playlist-info
          .column.is-5
</template>

<style lang="scss" scoped>
  :root{
    --size: 100px;
  }
  .playlists {
    height: 100vh;
    overflow: scroll;
    padding: 1rem;
    color: #fff;
  }

  .box{
    position: relative;
    width: 100px;       /* desired width */
  }
  .box:before{
    content: "";
    display: block;
    padding-top: 100%;  /* ratio of 1:1*/
  }

  .playlist-img {

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
  name: 'Artists',
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
    artists: {
      get() {
        return this.spotify.getFollowedArtists();
      },
      default: [],
    },
  },
  computed: {
    ...mapGetters(['spotify']),
    shownArtists() {
      return this.artists;
    },
    selectedArtist: {
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
