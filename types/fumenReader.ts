type SortOrder = string
const ORDER_ASC = 'asc'
const ORDER_DESC = 'desc'

type SortKey = string
const SORT_CREATED_DATE : SortKey = 'date'
const SORT_DIFFICULTY: SortKey = 'difficulty'
const SORT_NAME : SortKey = 'title'

type FilterGenreKey = string
const GENRE_ALL: FilterGenreKey = 'all'
const GENRE_GENERAL: FilterGenreKey = 'general'
const GENRE_JPOP: FilterGenreKey = 'jpop'
const GENRE_ANIME: FilterGenreKey = 'anime'
const GENRE_VOCALOID: FilterGenreKey = 'vocaloid'

type FilterDifficultyKey = [number, number]
const DIFFICULTY_ALL: FilterDifficultyKey = [1, 100]
const DIFFICULTY_EASY: FilterDifficultyKey = [1, 10]
const DIFFICULTY_NORMAL: FilterDifficultyKey = [11, 20]
const DIFFICULTY_HARD: FilterDifficultyKey = [21, 30]

export {
  SortOrder, ORDER_ASC, ORDER_DESC,
  SortKey, SORT_CREATED_DATE, SORT_DIFFICULTY, SORT_NAME,
  FilterGenreKey, GENRE_ALL, GENRE_GENERAL, GENRE_JPOP, GENRE_ANIME, GENRE_VOCALOID,
  FilterDifficultyKey, DIFFICULTY_ALL, DIFFICULTY_EASY, DIFFICULTY_NORMAL, DIFFICULTY_HARD
}
