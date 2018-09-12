<template>
  <cardGallery v-bind:cards="cards"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'

export default {
  name: 'Home',
  components: {
    'cardGallery': cardGallery
  },
  data () {
    return {
      cards: [
        {
          title: 'Centre',
          images: '/static/projects/centre.png',
          flex: 8,
          text: 'some more info on Centre'
        },
        {
          title: 'Aquaria',
          images: '/static/projects/aquaria.png',
          flex: 4,
          text: 'some more info on aquaria'
        },
        {
          title: 'Cancer',
          images: '/static/projects/cancer.png',
          flex: 4,
          text: 'some more info on Cancer'
        },
        {
          title: 'Dark Proteome',
          images: '/static/projects/darkProteome.png',
          flex: 4,
          text: 'some more info on Dark Proteome'
        },
        {
          title: 'Group18',
          images: '/static/projects/group18.png',
          flex: 4,
          text: 'some more info on Group18'
        },
        {
          title: 'Minardo',
          images: '/static/projects/minardo.png',
          flex: 4,
          text: 'some more info on Minardo'
        },
        {
          title: 'Rondo',
          images: '/static/projects/rondo.png',
          flex: 8,
          text: 'some more info on Rondo'
        },
        {
          title: 'Showcase',
          images: '/static/projects/showcase.png',
          flex: 12,
          text: 'some more info on Showcase'
        }
      ]
    }
  }
}
</script>
