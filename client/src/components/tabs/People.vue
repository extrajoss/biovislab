<template>
  <cardGallery v-bind:title="'People'"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'

export default {
  name: 'People',
  components: {
    'cardGallery': cardGallery
  }
}
</script>
