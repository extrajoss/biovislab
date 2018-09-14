<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <v-list-tile :key="index"
                   avatar
                   ripple>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title class="text--primary">{{ item.date }}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="index + 1 < items.length"
                 :key="`divider-${index}`"></v-divider>
    </template>
  </v-list>
</template>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.item-title {
  position: absolute;
  bottom: 0;
}
</style>

<script>
import rpc from '../modules/rpc.js'

export default {
  name: 'eventList',
  props: ['initialItems'],
  data () {
    return {
      items: this.initialItems
    }
  },
  async mounted () {
    console.log(this.initialItems, this.items)
    let response = await rpc.rpcRun('publicGetList', {'sheetTitle': 'Events'})
    console.log('response.result', response.result)
    if (response.result) {
      this.items = response.result
      console.log('items', this.items)
    }
  }
}
</script>
