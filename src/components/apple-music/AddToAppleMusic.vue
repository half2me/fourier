<template lang="pug">
  form()
    .model-card(style="width: auto")
      header.modal-card-head
        p.modal-card-title Add {{ playlist.name }} to Apple Music
      section.modal-card-body
        p Sorry, but this feature is still under development :(
      footer.modal-card-foot
        button.button.is-primary(@click.prevent="add") Add
</template>

<script>
export default {
  name: "AddToAppleMusic",
  props: {
    playlist: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    add() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="sass">

</style>
