import { Fumen as FumenType } from '@/types/upload/fumen'
import { $axios } from '@/utils/api'
import { SortKey, SortOrder, FilterGenreKey, FilterDifficultyKey } from '../types/fumenReader'

interface GetLevelListResponse {
  pageCount: number
  levels: FumenType[]
}

async function getLevelList (keyword: string, page: number, sort: SortKey, order: SortOrder, genre: FilterGenreKey, difficulty: FilterDifficultyKey) : Promise<GetLevelListResponse> {
  page -= 1
  const keywords = `${keyword} sort:${sort} order:${order} genre:${genre} difficulty:${difficulty[0]}-${difficulty[1]}`
  const resp = await $axios.get('http://localhost:8080/levels/list', { params: { page, keywords } })
  return { pageCount: resp.data.pageCount, levels: resp.data.items as FumenType[] } as GetLevelListResponse
}
export { getLevelList }
