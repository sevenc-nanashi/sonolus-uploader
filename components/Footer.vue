<template>
  <v-footer
    absolute
    app
  >
    <span>&copy; {{ new Date().getFullYear() }} {{ title }}</span>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {
  title: string = 'PurplePalette'
}
</script>
