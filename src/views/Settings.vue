<template lang="pug">
  .columns
    .column
      settings-page
</template>

<script>

    import SettingsPage from "../components/settings/SettingsPage";

    export default {
        name: "settings",
        components: {
            SettingsPage,
        },
    }
</script>
