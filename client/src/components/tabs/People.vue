<template>
  <cardGallery v-bind:initialCards="cards"
               v-bind:title="'People'"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'
import people from '../../../static/data/People.json'

export default {
  name: 'People',
  components: {
    'cardGallery': cardGallery
  },
  data () {
    return {
      cards: people
    }
  },
  mounted () {
    console.log(this.cards)
  }
}
</script>
