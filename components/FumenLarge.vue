<template>
  <v-card>
    <v-img
      :src="jacket"
      height="200px"
    />
    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-subtitle>
      {{ artist }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      {{ author }}
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

@Component
export default class FumenLarge extends Vue {
  @Prop({ type: String, default: 'Daydream café' })
  title!: string

  @Prop({ type: String, default: 'Petit Rabbit\'s' })
  artist!: string

  @Prop({ type: String, default: 'Omado' })
  author!: string

  @Prop({ type: Number, default: 8 })
  level!: number

  @Prop({ type: String, default: 'https://images-na.ssl-images-amazon.com/images/I/61GMYHzS6DL._AC_SX466_.jpg' })
  jacket!: string

  get levelColor () {
    if (this.level <= 10) {
      return 'blue'
    } else if (this.level <= 20) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  get levelTextColor () {
    if (this.level > 10 && this.level <= 20) {
      return 'black--text'
    } else {
      return 'white--text'
    }
  }

  get levelText () {
    return 'Lv' + this.level
  }
}
</script>
