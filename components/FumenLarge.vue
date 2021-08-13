<template>
  <v-card>
    <v-img
      :src="coverUrl"
      height="200px"
    />
    <v-card-title>
      {{ level.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ level.artist }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      {{ level.author }}
    </v-card-text>

    <v-row
      align="center"
      justify="end"
    >
      <v-card-title class="display-5 mr-1" v-text="levelText" />
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Level } from '@/potato'

@Component
export default class FumenLarge extends Vue {
  @Prop({ type: Object, required: true }) level? : Level

  get levelColor () {
    if (this.level?.rating) {
      if (this.level.rating <= 10) {
        return 'blue'
      } else if (this.level.rating <= 20) {
        return 'yellow'
      } else {
        return 'red'
      }
    }
    return 'yellow'
  }

  get levelTextColor () {
    if (this.level?.rating) {
      if (this.level.rating > 10 && this.level.rating <= 20) {
        return 'black--text'
      } else {
        return 'white--text'
      }
    } else {
      return 'white--text'
    }
  }

  get levelText () {
    return this.level?.rating ? 'Lv' + this.level.rating : 'Lv0'
  }

  get coverUrl () {
    return this.$config.API_ENDPOINT + this.level?.cover?.url
  }
}
</script>
