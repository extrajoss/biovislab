<template>
  <cardGallery v-bind:title="'Publications'"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'

export default {
  name: 'Publications',
  components: {
    'cardGallery': cardGallery
  }
}
</script>
