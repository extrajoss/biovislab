<template>
  <cardGallery v-bind:cards="cards"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'
import spreadsheet from '../../modules/spreadsheet.js'

export default {
  name: 'Projects',
  components: {
    'cardGallery': cardGallery
  },
  data () {
    return {
      cards: []
    }
  },
  async mounted () {
    let sheet = await spreadsheet.getSheet(1)
    let rows = sheet[1]
    this.cards = []
    rows.forEach((row) => {
      const card = (({ title, images, text, flex }) => ({ title, images, text, flex }))(row)
      card.flex = parseInt(card.flex)
      this.cards.push(card)
    })
  },
  methods: {

  }
}
</script>
