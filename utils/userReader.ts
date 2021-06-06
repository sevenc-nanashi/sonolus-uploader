import { firestore } from '@/plugins/firebase'
import { Fumen } from '@/types/upload/fumen'

interface GetUserLevelListResponse {
  levels: Fumen[]
  pageCount: number
}

function convertFireStoreToOpenApi (doc: any): Fumen {
  const openFumen: Fumen = {
    title: doc.Title,
    name: doc.Name,
    description: doc.Description,
    artists: doc.Artists,
    author: doc.Author,
    rating: doc.Rating,
    publish: doc.Publish,
    cover: { type: 'LevelCover', hash: doc.Cover.Hash, url: doc.Cover.Url },
    bgm: { type: 'LevelBgm', hash: doc.Bgm.Hash, url: doc.Bgm.Url },
    data: { type: 'LevelData', hash: doc.Data.Hash, url: doc.Data.Url }
  }
  return openFumen
}

async function getUserLevelList(userId: string, page: number): Promise<GetUserLevelListResponse> {
  const ref = firestore.collection('levels').where('UserId', '==', userId)
  const resp = await ref.get()
  if (resp.size === 0) {
    return { levels: [], pageCount: 0 } as GetUserLevelListResponse
  }
  const levels: Fumen[] = resp.docs.map(doc => convertFireStoreToOpenApi(doc.data()) as Fumen).slice(
    (page - 1) * 3, page * 3
  )
  return { levels, pageCount: Math.ceil(resp.size / 3) } as GetUserLevelListResponse
}
export { getUserLevelList }
