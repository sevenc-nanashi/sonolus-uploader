import { LevelsApi, GetLevelListResponse, UsersApi } from '@/potato'
import { SortKey, SortOrder, FilterGenreKey, FilterDifficultyKey } from '../types/search'

async function getLevelList (
  $levelsApi: LevelsApi,
  page: number,
  keyword: string | undefined,
  sort: SortKey | undefined,
  order: SortOrder | undefined,
  genre: FilterGenreKey | undefined,
  difficulty: FilterDifficultyKey | undefined
): Promise<GetLevelListResponse> {
  let keywords: string = keyword !== undefined ? `${keyword}` : ''
  keywords += sort !== undefined ? ` sort:${sort}` : ''
  keywords += order !== undefined ? ` order:${order}` : ''
  keywords += genre !== undefined ? ` genre:${genre}` : ''
  keywords += difficulty !== undefined ? ` difficulty:${difficulty[0]}-${difficulty[1]}` : ''
  const resp = await $levelsApi.getLevelList(undefined, page - 1, keywords)
  return resp.data
}

async function getUserLevelList (
  $usersApi: UsersApi,
  userId: string,
  page: number,
  keyword: string | undefined,
  sort: SortKey | undefined,
  order: SortOrder | undefined,
  genre: FilterGenreKey | undefined,
  difficulty: FilterDifficultyKey | undefined
): Promise<GetLevelListResponse> {
  let keywords: string = keyword !== undefined ? `${keyword}` : ''
  keywords += sort !== undefined ? ` sort:${sort}` : ''
  keywords += order !== undefined ? ` order:${order}` : ''
  keywords += genre !== undefined ? ` genre:${genre}` : ''
  keywords += difficulty !== undefined ? ` difficulty:${difficulty[0]}-${difficulty[1]}` : ''
  const resp = await $usersApi.getUsersLevels(userId, undefined, page - 1, keywords)
  return resp.data
}
export { getLevelList, getUserLevelList }
