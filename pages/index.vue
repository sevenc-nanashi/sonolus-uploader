<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" lg="8">
      <!-- トップ キャッチ画像 -->
      <v-container>
        <v-row>
          <v-col sm="12" md="12" lg="8">
            <div class="text-center">
              <v-img height="40vh" max-height="480px" width="auto" aspect-ratio="4:3" src="sweet-potato-logo3.png" />
            </div>
          </v-col>
          <v-col class="my-auto hidden-md-and-down" sm="12" md="4">
            <v-card>
              <v-list class="transparent">
                <v-list-item class="text-center mx-auto">
                  Sonolus創作譜面ポータル SweetPotato へようこそ!
                </v-list-item>
                <v-list-item>
                  <v-btn icon class="mx-auto">
                    <v-icon>mdi-discord</v-icon>
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn to="/help/play-sonolus-fumen" class="secondary mx-auto">
                    創作譜面の遊び方
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn to="/help/create-sonolus-fumen" class="secondary mx-auto">
                    創作譜面の作り方
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- スマホ専用 遊び方ページジャンプ -->
      <div class="mt-4 hidden-lg-and-up text-center">
        <v-btn large class="secondary">
          創作譜面の遊び方
        </v-btn>
      </div>
      <!-- 新着譜面3件 (Firebaseから取得) -->
      <div class="mt-6 v-heading text-h4">
        新着譜面
      </div>
      <v-container>
        <v-row>
          <v-col
            v-for="level in levels"
            :key="level.name"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <!-- スマホでも読み込まれてしまうのでできれば負荷軽減すべき -->
            <FumenLarge class="hidden-md-and-down" :level="level" />
            <Fumen class="hidden-lg-and-up" :level="level" />
          </v-col>
        </v-row>
      </v-container>
      <div class="mt-4 text-center">
        <nuxt-link to="fumen/list">
          <v-btn x-large class="primary">
            もっと見る
          </v-btn>
        </nuxt-link>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Level } from '@/potato'
import { Vue, Component } from 'nuxt-property-decorator'
import { getLevelList } from '@/utils/search-support'
import Fumen from '~/components/Fumen.vue'
import FumenLarge from '~/components/FumenLarge.vue'

@Component({
  components: {
    Fumen,
    FumenLarge
  }
})
export default class Index extends Vue {
  levels: Level[] = []

  async created (): Promise<void> {
    const levels = await getLevelList(this.$levelsApi, 1, undefined, undefined, undefined, undefined, undefined, undefined)
    this.levels = levels.items.slice(0, 3)
  }

  head () {
    return {
      titleTemplate: '%s'
    }
  }
}
</script>
