<template>
  <v-layout row
            wrap
            ref="cardGallery">
    <v-flex v-for="(card,index) in cards"
            v-bind="{ [`sm${card.flex} xs12 `]: true }"
            :key="card.title">
      <v-card v-if="!card.isMessage">
        <v-img :src="getImage(card)"
               :class='card.isSelected?"card selected":"card"'
               :aspect-ratio="card.aspect"
               :gradient="gradient"
               @click.native="toggleMessageCard(index)">
          <v-card-text class="white--text
            text-xs-center
            card-title
            headline">
            {{card.title}}
          </v-card-text>
        </v-img>
      </v-card>
      <v-card v-if="card.isMessage"
              id="message"
              class="secondary"
              dark>
        <v-layout row
                  wrap>
          <v-flex v-bind="{ [`xs${card.selectedflex} offset-sm${card.selectedflexOffset} offset-xs0`]: true }">
            <div id="messagePointerHolder">
              <div id="messagePointerBorder"></div>
              <div id="messagePointer"></div>
            </div>
          </v-flex>
        </v-layout>
        <v-container>
          <v-layout>
            <v-flex v-bind="{ [`sm7 xs12 `]: true }">
              <v-carousel v-if="hasMultiImages(card)">
                <v-carousel-item v-for="(image,i) in getImages(card)"
                                 :key="i"
                                 :src="`http://odonoghuelab.org/${title}/images/${image}`"
                                 @click.native="toggleMessageCard(index)">
                </v-carousel-item>
              </v-carousel>
              <v-img v-if="!hasMultiImages(card)"
                     :src="`http://odonoghuelab.org/${title}/images/${card.images}`"
                     :aspect-ratio="card.aspect">
              </v-img>
            </v-flex>
            <v-flex v-bind="{ [`sm5 xs12 `]: true }">
              <v-container>
                <v-card-title class="
          text-xs-center
          headline
          ">
                  <p class="text-xs-center">{{card.title}}</p>
                </v-card-title>
                <v-card-text v-html="card.text">
                </v-card-text>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
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
  border-bottom: 15px solid var(--message-background);
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  height: 0;
  position: absolute;
  top: -15px;
}
#messagePointerBorder {
  border-bottom: 16px solid white;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  height: 0;
  position: absolute;
  top: -16px;
  margin: 0px -1px;
}
</style>

<script>
import { mapActions } from 'vuex'

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
    ...mapActions(['getCards']),
    getImages (card) {
      return card.images.split(',')
    },
    hasMultiImages (card) {
      return this.getImages(card).length > 1
    },
    getImage (card) {
      return this.hasMultiImages(card) ? `http://odonoghuelab.org/${this.title}/images/${this.getImages(card)[0]}` : `http://odonoghuelab.org/${this.title}/images/${card.images}`
    },
    getParentFlexTotal ({cards, selectedCardIndex}) {
      let parentFlexTotal = 0
      for (let i = 0; i < selectedCardIndex; i++) {
        parentFlexTotal += cards[i].flex
        if (parentFlexTotal > 12) {
          parentFlexTotal = cards[i].flex
        } else if (parentFlexTotal === 12) {
          parentFlexTotal = 0
        }
      }
      return parentFlexTotal
    },
    getOverflowIndex ({selectedCardIndex, parentFlexTotal, cards}) {
      let i = selectedCardIndex
      let overflowTotal = parentFlexTotal
      while (overflowTotal <= 12 && i < cards.length) {
        overflowTotal += cards[i].flex
        if (overflowTotal > 12) {
          if (cards[i].flex === 12) {
            return i + 1
          }
          return i
        }
        i++
      }
      return i
    },
    getMessageCardProperties (selectedCardIndex) {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return {messageIndex: selectedCardIndex + 1, parentFlex: 12, parentFlexTotal: 0}
      }
      let cards = this.cards.filter((card) => { return !card.isMessage })
      let parentFlex = cards[selectedCardIndex].flex
      let parentFlexTotal = this.getParentFlexTotal({cards, selectedCardIndex})
      let overflowIndex = this.getOverflowIndex({selectedCardIndex, parentFlexTotal, cards})
      return {messageIndex: overflowIndex, parentFlex, parentFlexTotal}
    },
    toggleMessageCard (selectedCardIndex) {
      let {isMessage} = this.cards[selectedCardIndex]
      if (isMessage) {
        this.deleteMessageCard()
        return
      }
      if (this.currentTitleIndex === selectedCardIndex) {
        this.deleteMessageCard()
        return
      }
      if (this.currentMessageIndex && this.currentMessageIndex < selectedCardIndex) {
        selectedCardIndex--
      }
      this.deleteMessageCard()
      this.currentTitleIndex = selectedCardIndex
      this.cards[this.currentTitleIndex].isSelected = true
      this.addMessageCard(selectedCardIndex)
    },
    addMessageCard (selectedCardIndex) {
      let { title, text, images } = this.cards[selectedCardIndex]
      let { messageIndex, parentFlex, parentFlexTotal } = this.getMessageCardProperties(selectedCardIndex)
      this.currentMessageIndex = messageIndex
      this.cards.splice(messageIndex, 0, {
        isMessage: true,
        title: `More info on ${title}`,
        text: text,
        images: images,
        selectedflex: parentFlex,
        selectedflexOffset: parentFlexTotal,
        flex: 12
      })
    },
    deleteMessageCard () {
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
    this.$refs['cardGallery'].style.setProperty('--message-background', this.$vuetify.theme.secondary)
    this.toggleMessageCard(0)
    let cards = await this.getCards(this.title)
    if (cards) {
      this.cards = cards
      this.currentMessageIndex = false
      this.currentTitleIndex = false
      this.toggleMessageCard(0)
    }
  }
}
</script>
