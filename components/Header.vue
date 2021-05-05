<template>
  <v-app-bar
    fixed
    color="primary"
    dark
    app
  >
    <v-btn
      v-if="!right"
      icon
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title color="white" v-text="title" />
    <v-spacer />
    <v-btn
      v-if="!logined"
      text
      class="hidden-md-and-down"
      @click="logined = !logined"
    >
      <v-icon>
        mdi-login
      </v-icon>
      ログイン
    </v-btn>
    <v-btn
      v-if="logined"
      class="hidden-md-and-down secondary"
    >
      <v-icon>
        mdi-upload
      </v-icon>
      譜面投稿
    </v-btn>
    <v-btn
      v-if="logined"
      class="hidden-md-and-down"
      text
    >
      <img
        height="48px"
        alt="Avatar"
        src="https://cdn.discordapp.com/avatars/153112769724416000/9e10e1f28ff4fe9a13cca1d71002aaf9.png"
        class="rounded-circle"
      >
    </v-btn>
    <v-btn
      v-if="right"
      icon
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {
  @PropSync('openDrawer', { type: Boolean, default: false }) drawer!: boolean
  @PropSync('rightSided', { type: Boolean, default: true }) right!: boolean

  title: string = 'SweetPotato'
  logined: boolean = false
}
</script>
