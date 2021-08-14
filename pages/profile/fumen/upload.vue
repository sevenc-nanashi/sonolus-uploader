<template>
  <FormFumen
    :level-prop="level"
    :is-update-form="false"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Level, SonolusResourceLocatorTypeEnum } from '@/potato'
import FormFumen from '@/components/FormFumen.vue'

@Component({
  components: { FormFumen }
})
export default class LevelUpload extends Vue {
  level: Level = {
    name: '',
    version: 1,
    rating: 25,
    engine: 'hoge',
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
    title: { ja: '' },
    artists: { ja: '' },
    author: { ja: '' },
    cover: { type: SonolusResourceLocatorTypeEnum.LevelCover, hash: 'hoge', url: 'hoge' },
    bgm: { type: SonolusResourceLocatorTypeEnum.LevelBgm, hash: 'hoge', url: 'hoge' },
    data: { type: SonolusResourceLocatorTypeEnum.LevelData, hash: 'hoge', url: 'hoge' },
    genre: 'general',
    _public: false,
    userId: '',
    notes: 1,
    createdTime: 1,
    updatedTime: 1,
    description: { ja: '' }
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
