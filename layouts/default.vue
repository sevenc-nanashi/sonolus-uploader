<template>
  <v-app>
    <Header
      :open-drawer.sync="drawer"
      :right-sided.sync="right"
    />
    <Drawer
      :open-drawer.sync="drawer"
      :right-sided.sync="right"
    />
    <v-main class="has-yellow">
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
}
</script>

<style>
  .theme--light.v-application {
    color: #FFF ! important;
  }
  .has-bg {
    background-size: cover;
    background-image: url("~@/assets/images/phil-hearing-jd2-K2aBwUY-unsplash.jpg");
  }
  .has-bg::before{
    /* 透過した黒を上から重ねるイメージ */
    background-color: rgba(0,0,0,0.1);
    /* 自由に位置指定 */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: ' ';
  }
  .has-yellow {
    background-color: #ffff99;
  }
  .has-yellow::before{
    /* 透過した黒を上から重ねるイメージ */
    background-color: rgba(0,0,0,0.38);
    /* 自由に位置指定 */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: ' ';
  }
</style>
