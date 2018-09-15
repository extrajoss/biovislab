<template>
  <cardGallery v-bind:initialCards="cards"
               v-bind:title="'Projects'"></cardGallery>
</template>
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'
const projects = require('../../../static/data/Projects.json')

export default {
  name: 'Projects',
  components: {
    'cardGallery': cardGallery
  },
  data () {
    return {
      cards: projects
    }
  }
}
</script>
