<template>
  <FormFumen
    :level-prop="level"
    :is-update-form="false"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Level, Engine, LevelGenreEnum, SonolusResourceLocatorTypeEnum } from '@/potato'
import FormFumen from '@/components/FormFumen.vue'
import defaultEngine from '@/assets/json/defaultEngine.json'

@Component({
  components: { FormFumen }
})
export default class LevelUpload extends Vue {
  level: Level = {
    name: '',
    version: 1,
    rating: 25,
    engine: defaultEngine as Engine,
    useSkin: {
      useDefault: true
    },
    useBackground: {
      useDefault: true
    },
    useEffect: {
      useDefault: true
    },
    useParticle: {
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
    console.log(this.level)
  }

  head () {
    return {
      title: '譜面投稿'
    }
  }
}
</script>
