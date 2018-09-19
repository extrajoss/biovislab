<template>
  <cardGallery v-bind:initialCards="cards"
               v-bind:title="'Publications'"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'
import publications from '../../../static/data/Publications.json'

export default {
  name: 'Publications',
  components: {
    'cardGallery': cardGallery
  },
  data () {
    return {
      cards: publications
    }
  },
  mounted () {
    console.log(this.cards)
  }
}
</script>
