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
          <v-img :src="fumen.cover.url" />
        </v-avatar>
      </v-badge>
      <div>
        <v-card-title
          class="display-5"
          v-text="fumen.title"
        />
        <v-card-subtitle
          class="display-6"
          v-text="fumen.artist"
        />
        <v-card-subtitle class="display-6" v-text="fumen.author" />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Fumen as FumenType } from '@/types/upload/fumen'

@Component
export default class Fumen extends Vue {
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
