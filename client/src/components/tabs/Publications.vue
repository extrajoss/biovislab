<template>
  <cardGallery v-bind:initialCards="publications"
               v-bind:title="'Publications'"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Publications',
  components: {
    'cardGallery': cardGallery
  },
  computed: {
    ...mapGetters(['publications'])
  },
  mounted () {
    console.log(this.publications)
  }
}
</script>
