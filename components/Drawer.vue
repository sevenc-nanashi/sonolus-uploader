<template>
  <v-navigation-drawer
    v-model="drawer"
    :right="right"
    temporary
    fixed
  >
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :href="item.href"
        class="no-hover"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template #append>
      <v-divider />
      <v-list-item @click.native="right = !right">
        <v-list-item-action>
          <v-icon light>
            mdi-repeat
          </v-icon>
        </v-list-item-action>
        <v-list-item-title>左右入れ替え</v-list-item-title>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'nuxt-property-decorator'

@Component
export default class Drawer extends Vue {
  @PropSync('openDrawer', { type: Boolean, default: false }) drawer!: boolean

  @PropSync('rightSided', { type: Boolean, default: true }) right!: boolean

  items = [
    {
      icon: 'mdi-format-list-bulleted',
      title: '創作譜面一覧',
      to: '/fumen/list'
    },
    {
      icon: 'mdi-information',
      title: '創作譜面の遊び方',
      to: '/help/play-sonolus-fumen'
    },
    {
      icon: 'mdi-information',
      title: '創作譜面の作り方',
      to: '/help/create-sonolus-fumen'
    },
    {
      icon: 'mdi-palette',
      title: 'PurplePaletteについて',
      to: '/help/about-purplepalette'
    },
    {
      icon: 'mdi-discord',
      title: 'Discordに参加!',
      href: 'https://discord.gg/KEfVkfC6Q9'
    }
  ]
}
</script>

<style>
.no-hover::before {
  opacity: 0 !important;
}
</style>
