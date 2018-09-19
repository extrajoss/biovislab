<template>
  <cardGallery v-bind:initialCards="projects"
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
    ...mapGetters(['projects'])
  }
}
</script>
