<template>
  <v-card>
    <v-img
      :src="fumen.cover.url"
      height="200px"
    />
    <v-card-title>
      {{ fumen.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ fumen.artist }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      {{ fumen.author }}
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
import { Fumen as FumenType } from '@/types/upload/fumen'

@Component
export default class FumenLarge extends Vue {
  @Prop({ type: Object }) fumen! : FumenType

  get levelColor () {
    if (this.fumen.rating <= 10) {
      return 'blue'
    } else if (this.fumen.rating <= 20) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  get levelTextColor () {
    if (this.fumen.rating > 10 && this.fumen.rating <= 20) {
      return 'black--text'
    } else {
      return 'white--text'
    }
  }

  get levelText () {
    return 'Lv' + this.fumen.rating
  }
}
</script>
