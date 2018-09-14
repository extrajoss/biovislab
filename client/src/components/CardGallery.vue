<template>
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
              text-xs-center
              headline
              ">
              <p class="text-xs-center">{{card.title}}</p>
            </v-card-title>
          </v-carousel-item>
        </v-carousel>
        <v-img v-if="!card.isMessage&&!(hasMultiImages(card))"
               :src="card.images"
               class="card"
               :aspect-ratio="card.aspect"
               :gradient="gradient"
               @click.native="openMessage(index,card)">
          <v-card-text class="white--text
            text-xs-center
            card-title
            headline">
            {{card.title}}
          </v-card-text>
        </v-img>
        <v-card-text v-if="card.isMessage"
                     v-html="card.text">
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.card-title {
  position: absolute;
  bottom: 0;
}
</style>

<script>
import rpc from '../modules/rpc.js'

export default {
  name: 'cardGallery',
  props: ['initialCards', 'title'],
  data () {
    return {
      cards: this.initialCards,
      mouseOver: false,
      currentMessageIndex: false,
      currentTitleIndex: false,
      gradient: `to top,${this.$vuetify.theme.secondary}A0  40px,${this.$vuetify.theme.secondary}00 80px, ${this.$vuetify.theme.secondary}00`
    }
  },
  methods: {
    openMessage (index, card) {
      if (card.isMessage) {
        this.deleteMessage()
      } else {
        this.addMessage(index, card)
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
    addMessage (index, {title, text}) {
      if (this.currentTitleIndex === index) {
        this.deleteMessage()
        return
      }
      if (this.currentMessageIndex && this.currentMessageIndex < index) {
        index--
      }
      this.deleteMessage()
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
    deleteMessage () {
      this.cards = this.cards.filter((card) => {
        return !card.isMessage
      })
      this.currentMessageIndex = false
      this.currentTitleIndex = false
    }
  },
  async mounted () {
    let response = await rpc.rpcRun('publicGetCards', {'sheetTitle': this.title})
    if (response.result) {
      this.cards = response.result
    }
  }
}
</script>
