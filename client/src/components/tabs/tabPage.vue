<template>
  <cardGallery v-bind:title="title"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'

export default {
  name: 'tabPage',
  props: ['title'],
  components: {
    'cardGallery': cardGallery
  }
}
</script>
