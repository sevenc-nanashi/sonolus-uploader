type ResourceKey = String
const LEVEL_COVER : ResourceKey = 'LevelCover'
const LEVEL_BGM : ResourceKey = 'LevelBgm'
const LEVEL_DATA : ResourceKey = 'LevelData'

interface SonolusResourceLocator {
  type: ResourceKey
  hash: string
  url: string
}

interface Fumen {
    title: string
    name: string
    description: string
    artists: string
    author: string
    rating: number
    cover: SonolusResourceLocator
    bgm: SonolusResourceLocator
    data: SonolusResourceLocator
}

export {
  Fumen,
  LEVEL_DATA,
  LEVEL_BGM,
  LEVEL_COVER
}
