<template>
  <cardGallery v-bind:initialCards="people"
               v-bind:title="'People'"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'People',
  components: {
    'cardGallery': cardGallery
  },
  computed: {
    ...mapGetters(['people'])
  },
  mounted () {
    console.log(this.people)
  }
}
</script>
