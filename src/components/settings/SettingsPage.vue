<template lang="pug">
.settings-page
  .columns
    .column.is-8.is-offset-2
      h1
        b Settings

      b-table(narrowed selectable)
        b-table-column(field="setting" label="test")
          p Setting
</template>

<script>
    export default {
        name: "SettingsPage",
        props: {
            track: {
                type: Object,
                default: () => null,
            },
        },
    }
</script>

<style scoped>

</style>
