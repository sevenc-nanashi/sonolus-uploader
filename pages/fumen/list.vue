<template>
  <v-row justify="center" align="center">
    <!-- SearchFilter -->
    <v-col cols="12" class="mx-4 mt-2">
      <v-card class="pt-6 px-4">
        <v-row justify="center" align="center">
          <v-col cols="6" lg="3">
            <v-text-field
              label="Keyword"
              dense
            />
          </v-col>
          <v-col cols="6" lg="3">
            <v-select
              :items="sorts"
              label="Sort"
              dense
            />
          </v-col>
          <v-col cols="6" lg="3">
            <v-select
              :items="difficulties"
              label="Difficulty"
              dense
            />
          </v-col>
          <v-col cols="6" lg="3">
            <v-select
              :items="genres"
              label="Genre"
              dense
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <!-- SearchResult -->
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-col
            v-for="n in 6"
            :key="n"
            cols="12"
            sm="6"
            md="6"
            lg="6"
          >
            <Fumen :level="n*10" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <!-- SearchPagination -->
    <v-col cols="12">
      <v-pagination
        v-model="page"
        :length="10"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Fumen from '~/components/Fumen.vue'

@Component({
  components: {
    Fumen
  }
})
export default class FumenList extends Vue {
  page: number = 1
  sorts: Array<string> = [
    '投稿が新しい順',
    '投稿が古い順',
    '難易度が高い順',
    '難易度が低い順',
    'A→Z順',
    'Z→A順'
  ]

  difficulties: Array<string> = [
    'すべて',
    'Easy',
    'Normal',
    'Hard',
    'Extream',
    'Hell'
  ]

  genres: Array<string> = [
    'すべて',
    'general',
    'jpop',
    'anime',
    'vocaloid'
  ]
}
</script>
