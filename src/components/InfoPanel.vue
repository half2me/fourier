<template>
  <div class="hello">
    <p>InfoPanel</p>
  </div>
</template>

<script>
  import {requestAccessToken} from '@/spotify'
  import {mapGetters} from 'vuex'

  export default {
    name: 'InfoPanel',
    computed: {
      ...mapGetters(['spotify']),
    },
    mounted() {

    },
    methods: {},
  }
</script>
