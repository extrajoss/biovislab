<template>
  <cardGallery v-bind:cards="cards"></cardGallery>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

import cardGallery from '../CardGallery.vue'

export default {
  name: 'People',
  components: {
    'cardGallery': cardGallery
  },
  data () {
    return {
      cards: [
        {
          title: 'Seán O’Donoghue',
          images: '/static/people/Sean.png',
          flex: 3,
          text: "<p>Seán O’Donoghue is a Chief Research Scientist in Australia's Commonwealth Scientific and Industrial Research Organisation (CSIRO), Sydney. He is also a Laboratory Head and Senior Faculty Member at the Garvan Institute of Medical Research in Sydney. He was also recently appointed as a Conjoint Professor in the School of Biotechnology and Biomolecular Science (BABS), University of New South Wales. He received his B.Sc. (Hons) and PhD in biophysics from the University of Sydney, Australia. Much of his career was spent in Heidelberg, Germany, where he worked in the Structural and Computational Biology programme at the European Molecular Biology Laboratory (EMBL), and at Lion Bioscience AG - then the world's largest bioinformatics company - where he was Director of Scientific Visualization. From 2012-2015 he was also CSIRO's representative on the EMBL-Australia council, and chaired the EMBL-Australia Bioinformatics Advisory Committee.</p>" +
'<p>He has been actively engaged in bioinformatics research since 1988. He contributed to the development of ARIA, a method widely used for calculating 3D structures from NMR data. Since then, he has initiated and is leading several projects, including VizBi, an international initiative aimed at improving data visualization and user experience in bioinformatics software; VizbiPlus, aimed at educating and inspiring the general public about cutting-edge biomedical research (Finalist, 2015 NSW Emerging Creative Talent Award); Aquaria (first prize, 2015 NSW iAward for Research and Development), a resource that simplifies discovery and insight from protein structures; Martini, a resource for comparing gene lists; Minardo, a method for visualizing the time-course of posttranslational events in cells (finalist, 2015 Eureka Prize for Excellence in Interdisciplinary Scientific Research); and Reflect, a browser plug-in designed to help in understanding life science literature that is widely used by many life scientists (first prize, http://www.elseviergrandchallenge.com).</p>' +
'<p>His contributions have been recognised with a C. J. Martin Fellowship from the National Health & Medical Research Council of Australia, an Achievement Award from Lion Bioscience AG, and by being elected a Fellow of the Royal Society of Chemistry in 2014.</p>'
        },
        {
          title: 'Jenny Vuong',
          images: '/static/people/Jenny.png',
          flex: 3,
          text: 'some more info on Jenny'
        },
        {
          title: 'Michael Joss',
          images: '/static/people/Joss.png',
          flex: 3,
          text: 'some more info on Joss'
        },
        {
          title: 'Bosco Ho',
          images: '/static/people/Bosco.png',
          flex: 3,
          text: 'some more info on Bosco'
        },
        {
          title: 'Sandeep',
          images: '/static/people/Sandeep.png',
          flex: 3,
          text: 'some more info on Sandeep'
        },
        {
          title: 'Benedetta Frida Baldi',
          images: '/static/people/Bene.png',
          flex: 3,
          text: 'some more info on Bene'
        },
        {
          title: 'Chris Hammang',
          images: '/static/people/Chris.png',
          flex: 3,
          text: 'some more info on Chris'
        },
        {
          title: 'Leonie Herson',
          images: '/static/people/Leonie.jpeg',
          flex: 3,
          text: 'some more info on Leonie'
        }
      ]
    }
  }
}
</script>
