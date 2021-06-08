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
      <v-row v-if="!fumen.public" align="center" justify="end">
        <v-card-subtitle class="text-h5 is-centered">
          テスト中
        </v-card-subtitle>
      </v-row>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Level } from '@/potato'

@Component
export default class Fumen extends Vue {
  @Prop({ type: Object, required: true }) level : Level = {}

  get levelColor () {
    if (this.level.rating) {
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
    if (this.level.rating) {
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
    return this.level.rating ? 'Lv' + this.level.rating : 'Lv0'
  }
}
</script>
