<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-badge
        class="ml-3 mt-1"
        bordered
        overwrap
        left
        :color="levelColor"
        offset-x="25"
        offset-y="25"
      >
        <template #badge>
          <div :class="'text '+levelTextColor">
            {{ levelText }}
          </div>
        </template>
        <v-avatar
          class="ma-3"
          size="100"
          tile
        >
          <v-img :src="jacket" />
        </v-avatar>
      </v-badge>
      <div>
        <v-card-title
          class="display-5"
          v-text="title"
        />
        <v-card-subtitle
          class="display-6"
          v-text="artist"
        />
        <v-card-subtitle class="display-6" v-text="author" />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Fumen extends Vue {
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
