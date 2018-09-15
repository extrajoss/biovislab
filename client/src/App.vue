<template>
  <div id='app'>
    <v-app light>
      <v-container fluid
                   grid-list-xs>
        <v-layout row>
          <navbar></navbar>
        </v-layout>

        <v-layout row
                  wrap>
          <v-flex xs12
                  sm10>
            <router-view></router-view>
          </v-flex>
          <v-flex xs12
                  sm2>
            <v-card>
              <v-card-text>
                <eventList v-bind:initialItems="initialItems"></eventList>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<style>
@import "vuetify/dist/vuetify.min.css";
@import "http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic";
@import "http://fonts.googleapis.com/icon?family=Material+Icons";
</style>

<script>
import Navbar from './components/Navbar.vue'
import EventList from './components/EventList.vue'
const initialItems = require('../static/data/Events.json')

export default {
  name: 'app',
  components: {Navbar, EventList},
  data () {
    return {
      initialItems: initialItems
    }
  }
}
</script>
