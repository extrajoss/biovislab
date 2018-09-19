<template>
  <v-layout row
            wrap>
    <v-flex v-for="(card,index) in cards"
            v-bind="{ [`sm${card.flex} xs12 `]: true }"
            :key="card.title">
      <v-card v-if="!card.isMessage&&!(hasMultiImages(card))">
        <v-img :src="card.images"
               :class='card.isSelected?"card selected":"card"'
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
      </v-card>
      <v-card v-if="!card.isMessage&&hasMultiImages(card)">
        <v-carousel :cycle="mouseOver"
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
      </v-card>
      <v-card v-if="card.isMessage">
        <v-layout row
                  wrap>
          <v-flex v-bind="{ [`xs${card.selectedflex} offset-sm${card.selectedflexOffset} offset-xs0`]: true }">
            <div id="messagePointerHolder">
              <div id="messagePointer"></div>
            </div>
          </v-flex>
        </v-layout>
        <v-card-title class="
          text-xs-center
          headline
          ">
          <p class="text-xs-center">{{card.title}}</p>
        </v-card-title>
        <v-card-text v-html="card.text">
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
#messagePointerHolder {
  width: 30px;
  margin: 0 auto;
}
#messagePointer {
  border-bottom: 15px solid #fff;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  height: 0;
  position: absolute;
  top: -15px;
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
      let overflowTotal = 0
      if (this.$vuetify.breakpoint.name === 'xs') {
        return {messageIndex: index + 1, parentflex: 12, parentflexTotal: 0}
      }
      let cards = this.cards.filter((card) => { return !card.isMessage })
      let parentflex = cards[index].flex
      for (let i = 0; i < index; i++) {
        overflowTotal += cards[i].flex
        if (overflowTotal > 12) {
          overflowTotal = cards[i].flex
        } else if (overflowTotal === 12) {
          overflowTotal = 0
        }
      }
      let parentflexTotal = overflowTotal
      while (overflowTotal <= 12 && index < cards.length) {
        overflowTotal += cards[index].flex
        if (overflowTotal > 12) {
          if (cards[index].flex === 12) {
            return {messageIndex: index++, parentflex, parentflexTotal}
          }
          return {messageIndex: index, parentflex, parentflexTotal}
        }
        index++
      }
      return {messageIndex: index, parentflex, parentflexTotal}
    },
    addMessage (index, {title, text, images}) {
      if (this.currentTitleIndex === index) {
        this.deleteMessage()
        return
      }
      if (this.currentMessageIndex && this.currentMessageIndex < index) {
        index--
      }
      this.deleteMessage()
      let {messageIndex, parentflex, parentflexTotal} = this.getOverflowIndex(index)
      this.currentMessageIndex = messageIndex
      this.currentTitleIndex = index
      this.cards[this.currentTitleIndex].isSelected = true
      this.cards.splice(messageIndex, 0, {
        isMessage: true,
        title: `More info on ${title}`,
        text: text,
        images: images,
        selectedflex: parentflex,
        selectedflexOffset: parentflexTotal,
        flex: 12
      })
    },
    deleteMessage () {
      this.cards = this.cards.filter((card) => {
        return !card.isMessage
      })
      if (this.currentTitleIndex >= 0 && this.cards[this.currentTitleIndex]) {
        delete this.cards[this.currentTitleIndex].isSelected
      }
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
