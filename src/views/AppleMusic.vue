<template lang="pug">
  .columns.apple

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'AppleMusic',
    components: {
    },
    data() {
      return {
        selectedPlaylist: null,
        selectedTrack: null,
      }
    },
    asyncComputed: {
      devices: {
        get() {
        },
        default: [],
      },
    },
    computed: {
      ...mapGetters([]),
    },
  }
</script>
