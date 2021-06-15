<template>
  <v-app>
    <Header
      :open-drawer.sync="drawer"
      :is-logined.sync="isLogined"
      :right-sided.sync="right"
    />
    <Drawer
      :open-drawer.sync="drawer"
      :is-logined.sync="isLogined"
      :right-sided.sync="right"
    />
    <v-main class="has-blue-bg">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Header from '~/components/Header.vue'
import Drawer from '~/components/Drawer.vue'
import Footer from '~/components/Footer.vue'

@Component({
  components: {
    Header,
    Drawer,
    Footer
  }
})
export default class Default extends Vue {
  right: boolean = true
  drawer: boolean = false
  isLogined: boolean = false
}
</script>

<style>
  .has-blue-bg {
    background-color: #f9fcff;
  }
</style>
