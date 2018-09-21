<template>
  <cardGallery v-bind:title="'Projects'"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'

export default {
  name: 'Projects',
  components: {
    'cardGallery': cardGallery
  }
}
</script>
