<template>
  <FormFumen
    :level-prop="level"
    :is-update-form="true"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Level, SonolusResourceLocatorTypeEnum, LocalizationText } from '@/potato'
import FormFumen from '@/components/FormFumen.vue'
import { auth } from '@/plugins/firebase'

@Component({
  components: { FormFumen }
})
export default class LevelEdit extends Vue {
  level: Level = {
    name: '',
    version: 1,
    rating: 1,
    engine: '',
    useSkin: {
      item: undefined,
      useDefault: true
    },
    useBackground: {
      item: undefined,
      useDefault: true
    },
    useEffect: {
      item: undefined,
      useDefault: true
    },
    useParticle: {
      item: undefined,
      useDefault: true
    },
    title: { ja: '' },
    artists: { ja: '' },
    author: { ja: '' },
    cover: { type: SonolusResourceLocatorTypeEnum.LevelCover, hash: 'hoge', url: 'hoge' },
    bgm: { type: SonolusResourceLocatorTypeEnum.LevelBgm, hash: 'hoge', url: 'hoge' },
    data: { type: SonolusResourceLocatorTypeEnum.LevelData, hash: 'hoge', url: 'hoge' },
    genre: 'general',
    public: false,
    userId: '',
    notes: 1,
    createdTime: 1,
    updatedTime: 1,
    description: { ja: '' }
  }

  mounted () {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/')
      }
      this.getLevelInfo()
    })
  }

  async getLevelInfo () {
    const id : string = this.$route.query.id.toString()
    if (!id) {
      this.$router.push('/profile/account')
    }
    try {
      const resp = await this.$levelsApi.getLevel(id)
      const respLevel = resp.data.item
      respLevel.title = { ja: respLevel.title } as LocalizationText
      respLevel.artists = { ja: respLevel.artists } as LocalizationText
      respLevel.author = { ja: respLevel.author } as LocalizationText
      respLevel.description = { ja: resp.data.description } as LocalizationText
      respLevel.engine = 'pjsekai'
      respLevel.genre = 'general'
      respLevel.public = false
      this.level = respLevel
    } catch {
      this.$router.push('/profile/account')
    }
  }

  head () {
    return {
      title: '譜面編集'
    }
  }
}
</script>
