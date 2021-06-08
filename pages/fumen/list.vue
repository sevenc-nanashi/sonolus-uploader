<template>
  <v-row justify="center" align="center">
    <!-- SearchFilter -->
    <v-col cols="12" class="mx-4 mt-2">
      <v-card class="pt-6 px-4">
        <v-row justify="center" align="center">
          <v-col cols="6" lg="3">
            <v-text-field
              v-model="keyword"
              label="Keyword"
              dense
            />
          </v-col>
          <v-col cols="6" lg="3">
            <v-select
              v-model="sort"
              item-text="label"
              item-value="value"
              :items="sorts"
              label="Sort"
              dense
              return-object
            />
          </v-col>
          <v-col cols="6" lg="3">
            <v-select
              v-model="difficulty"
              item-text="label"
              item-value="value"
              :items="difficulties"
              label="Difficulty"
              dense
              return-object
            />
          </v-col>
          <v-col cols="6" lg="3">
            <v-select
              v-model="genre"
              item-text="label"
              item-value="value"
              :items="genres"
              label="Genre"
              dense
              return-object
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
            v-for="level in levels"
            :key="level.name"
            cols="12"
            sm="6"
            md="6"
            lg="6"
          >
            <Fumen :level="level" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <!-- SearchPagination -->
    <v-col cols="12">
      <v-pagination
        v-model="page"
        :length="pageCount"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { Level, LevelGenreEnum } from '@/potato'
import { getLevelList } from '@/utils/search-support'
import {
  SortOrder, ORDER_DESC, ORDER_ASC,
  SortKey, SORT_CREATED_DATE, SORT_DIFFICULTY, SORT_NAME,
  FilterGenreKey, GENRE_ALL, GENRE_GENERAL, GENRE_JPOP, GENRE_ANIME, GENRE_VOCALOID,
  FilterDifficultyKey, DIFFICULTY_ALL, DIFFICULTY_EASY, DIFFICULTY_NORMAL, DIFFICULTY_HARD
} from '~/types/search'
import Fumen from '~/components/Fumen.vue'

interface Select {
  label: string
  value: string
}

@Component({
  components: {
    Fumen
  }
})
export default class FumenList extends Vue {
  levels: Level[] = []
  keyword: string = ''
  page: number = 1
  pageCount: number = 1

  sortOrderParam: SortOrder = ORDER_DESC
  sortParam: SortKey = SORT_CREATED_DATE
  sort: Select = { label: '投稿が新しい順', value: 'date-desc' }
  sorts: Array<Select> = [
    { label: '投稿が新しい順', value: 'date-desc' },
    { label: '投稿が古い順', value: 'date-asc' },
    { label: '難易度が高い順', value: 'difficulty-desc' },
    { label: '難易度が低い順', value: 'difficulty-asc' },
    { label: 'A→Z(あ→ん)順', value: 'title-desc' },
    { label: 'Z→A(ん→あ)順', value: 'title-asc' }
  ]

  difficultyParam: FilterDifficultyKey = DIFFICULTY_ALL
  difficulty: Select = { label: 'すべて', value: 'all' }
  difficulties: Array<Select> = [
    { label: 'すべて', value: 'all' },
    { label: 'Easy', value: 'easy' },
    { label: 'Normal', value: 'normal' },
    { label: 'Hard', value: 'hard' }
  ]

  genreParam: FilterGenreKey = GENRE_ALL
  genre: Select = { label: 'すべて', value: 'all' }
  genres: Array<Select> = [
    { label: 'すべて', value: 'all' },
    { label: '総合', value: LevelGenreEnum.General },
    { label: 'J-POP', value: LevelGenreEnum.Jpop },
    { label: 'アニメ', value: LevelGenreEnum.Anime },
    { label: 'VOCALOID', value: LevelGenreEnum.Vocaloid }
  ]

  async resetLevelList () {
    const resp = await getLevelList(
      this.$levelsApi,
      this.page,
      this.keyword,
      this.sortParam, this.sortOrderParam,
      this.genreParam,
      this.difficultyParam
    )
    this.levels = resp.items
    this.pageCount = resp.pageCount
  }

  @Watch('keyword')
  changeKeyword () {
    this.resetLevelList()
  }

  @Watch('sort')
  changeSort () {
    switch (this.sort.value) {
    case 'date-desc':
      this.sortParam = SORT_CREATED_DATE
      this.sortOrderParam = ORDER_DESC
      break
    case 'date-asc':
      this.sortParam = SORT_CREATED_DATE
      this.sortOrderParam = ORDER_ASC
      break
    case 'difficulty-desc':
      this.sortParam = SORT_DIFFICULTY
      this.sortOrderParam = ORDER_DESC
      break
    case 'difficulty-asc':
      this.sortParam = SORT_DIFFICULTY
      this.sortOrderParam = ORDER_ASC
      break
    case 'title-desc':
      this.sortParam = SORT_NAME
      this.sortOrderParam = ORDER_DESC
      break
    case 'title-asc':
      this.sortParam = SORT_NAME
      this.sortOrderParam = ORDER_ASC
      break
    }
    this.resetLevelList()
  }

  @Watch('difficulty')
  changeDifficulty () {
    switch (this.difficulty.value) {
    case 'all':
      this.difficultyParam = DIFFICULTY_ALL
      break
    case 'easy':
      this.difficultyParam = DIFFICULTY_EASY
      break
    case 'normal':
      this.difficultyParam = DIFFICULTY_NORMAL
      break
    case 'hard':
      this.difficultyParam = DIFFICULTY_HARD
      break
    }
    this.resetLevelList()
  }

  @Watch('genre')
  changeGenre () {
    switch (this.genre.value) {
    case 'all':
      this.genreParam = GENRE_ALL
      break
    case 'general':
      this.genreParam = GENRE_GENERAL
      break
    case 'jpop':
      this.genreParam = GENRE_JPOP
      break
    case 'anime':
      this.genreParam = GENRE_ANIME
      break
    case 'vocaloid':
      this.genreParam = GENRE_VOCALOID
      break
    }
    this.resetLevelList()
  }

  @Watch('page')
  changePage () {
    this.resetLevelList()
  }

  created () {
    this.resetLevelList()
  }
}
</script>
