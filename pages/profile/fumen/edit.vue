<template>
  <FormFumen
    :level-prop="level"
    :is-update-form="true"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Level, Engine, LevelGenreEnum, SonolusResourceLocatorTypeEnum } from '@/potato'
import FormFumen from '@/components/FormFumen.vue'
import { auth } from '@/plugins/firebase'
import defaultEngine from '@/assets/json/defaultEngine.json'

@Component({
  components: { FormFumen }
})
export default class LevelEdit extends Vue {
  level: Level = {
    name: '',
    version: 1,
    rating: 1,
    engine: defaultEngine as Engine,
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
    title: '',
    artists: '',
    author: '',
    cover: { type: SonolusResourceLocatorTypeEnum.LevelCover, hash: 'hoge', url: 'hoge' },
    bgm: { type: SonolusResourceLocatorTypeEnum.LevelBgm, hash: 'hoge', url: 'hoge' },
    data: { type: SonolusResourceLocatorTypeEnum.LevelData, hash: 'hoge', url: 'hoge' },
    genre: LevelGenreEnum.General,
    _public: false,
    userId: '',
    notes: 1,
    createdTime: 1,
    updatedTime: 1,
    description: ''
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
      this.level = resp.data.item
    } catch {
      this.$router.push('/profile/account')
    }
  }
}
</script>
