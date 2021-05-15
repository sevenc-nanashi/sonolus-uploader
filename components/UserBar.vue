<template>
  <div>
    <v-btn
      to="/profile/upload"
      class="hidden-md-and-down secondary no-hover"
    >
      <v-icon>
        mdi-upload
      </v-icon>
      譜面投稿
    </v-btn>
    <v-btn
      to="/profile/account"
      class="hidden-md-and-down no-hover"
      text
    >
      <img
        height="48px"
        alt="Avatar"
        :src="avatarUrl"
        class="rounded-circle"
      >
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class UserBar extends Vue {
  @Prop({ type: String, default: 'https://cdn.discordapp.com/avatars/153112769724416000/9e10e1f28ff4fe9a13cca1d71002aaf9.png' })
  avatarUrl!: string
}
</script>

<style>
.no-hover::before {
  opacity: 0 !important;
}
</style>
