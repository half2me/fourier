<template lang="pug">
  .columns
    .column.is-one-quarter
      playlists
    .column.is-half
      tracks
    .column.is-one-quarter
      info-panel
</template>

<script>
  import Playlists from '@/components/Playlists'
  import Tracks from '@/components/Tracks'
  import InfoPanel from '@/components/InfoPanel'

  export default {
    name: 'spotify',
    components: {
      Playlists, Tracks, InfoPanel
    }
  }
</script>
