import { Fumen as FumenType } from '@/types/upload/fumen'
import { $axios } from '@/utils/api'
import { SortKey, FilterGenreKey, FilterDifficultyKey } from '../types/fumenReader'

async function getLevelList (keyword: string, page: number, sort: SortKey, genre: FilterGenreKey, difficulty: FilterDifficultyKey) : Promise<FumenType[]> {
  page -= 1
  const keywords = `${keyword} sort:${sort} genre:${genre} difficulty:${difficulty[0]}-${difficulty[1]}`
  const resp = await $axios.get('http://localhost:8080/levels/list', { params: { page, keywords } })
  return resp.data.items as FumenType[]
}
export { getLevelList }
