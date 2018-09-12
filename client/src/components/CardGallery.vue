<template>
  <v-container fluid
               grid-list-sm>
    <v-layout row
              wrap>
      <v-flex v-for="(card,index) in cards"
              v-bind="{ [`sm${card.flex} xs12 `]: true }"
              :key="card.title">
        <v-card>
          <v-carousel v-if="!card.isMessage&&hasMultiImages(card)"
                      :cycle="mouseOver"
                      :hide-delimiters="true">
            <v-carousel-item v-for="(image,i) in getImages(card)"
                             :key="i"
                             :src="image"
                             :gradient="gradient"
                             v-on:mouseover="mouseOver=true"
                             v-on:mouseout="mouseOver=false"
                             @click.native="openMessage(index,card)">
              <v-card-title class="white--text
                             headline
                             ">{{card.title}}</v-card-title>
            </v-carousel-item>
          </v-carousel>
          <v-img v-if="!card.isMessage&&!(hasMultiImages(card))"
                 :src="card.images"
                 class="card"
                 :gradient="gradient"
                 @click.native="openMessage(index,card)">
            <v-card-title class="white--text
                             headline
                             ">{{card.title}}</v-card-title>
          </v-img>

          <v-card-text v-if="card.isMessage
                             "
                       v-html="card.text"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>

export default {
  name: 'cardGallery',
  props: ['cards'],
  data () {
    return {
      mouseOver: false,
      currentMessageIndex: false,
      currentTitleIndex: false,
      gradient: `${this.$vuetify.theme.secondary}A0  40px,${this.$vuetify.theme.secondary}00 80px, ${this.$vuetify.theme.secondary}00`
    }
  },
  methods: {
    openMessage (index, card) {
      if (card.isMessage) {
        this.deleteCurrentMessage()
      } else {
        this.addCurrentMessage(index, card)
      }
    },
    getImages (card) {
      return card.images.split(',')
    },
    hasMultiImages (card) {
      return this.getImages(card).length > 1
    },
    getOverflowIndex (index) {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return index + 1
      }
      let cards = this.cards.filter((card) => { return !card.isMessage })
      let overflowTotal = 0
      for (let i = 0; i < index; i++) {
        overflowTotal += cards[i].flex
        if (overflowTotal > 12) {
          overflowTotal = cards[i].flex
        } else if (overflowTotal === 12) {
          overflowTotal = 0
        }
      }
      while (overflowTotal <= 12 && index < cards.length) {
        overflowTotal += cards[index].flex
        if (overflowTotal > 12) {
          if (cards[index].flex === 12) {
            return index++
          }
          return index
        }
        index++
      }
      return index
    },
    addCurrentMessage (index, {title, text}) {
      console.log(this.$vuetify.theme.accent)
      if (this.currentTitleIndex === index) {
        this.deleteCurrentMessage()
        return
      }
      if (this.currentMessageIndex && this.currentMessageIndex < index) {
        index--
      }
      this.deleteCurrentMessage()
      let messageIndex = this.getOverflowIndex(index)
      this.currentMessageIndex = messageIndex
      this.currentTitleIndex = index
      this.cards.splice(messageIndex, 0, {
        isMessage: true,
        title: `More info on ${title}`,
        text: text,
        flex: 12
      })
    },
    deleteCurrentMessage () {
      if (this.currentMessageIndex) {
        this.cards.splice(this.currentMessageIndex, 1)
        this.currentMessageIndex = false
        this.currentTitleIndex = false
      }
    }
  }
}
</script>
