<template>
  <cardGallery v-bind:initialCards="Projects"
               v-bind:title="'Projects'"></cardGallery>
</template>
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Projects',
  components: {
    'cardGallery': cardGallery
  },
  computed: {
    ...mapGetters(['Projects'])
  }
}
</script>
