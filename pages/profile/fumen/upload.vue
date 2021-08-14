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
    engine: 'pjsekai',
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
    cover: { type: SonolusResourceLocatorTypeEnum.LevelCover, hash: 'chino', url: 'chino' },
    bgm: { type: SonolusResourceLocatorTypeEnum.LevelBgm, hash: 'chino', url: 'chino' },
    data: { type: SonolusResourceLocatorTypeEnum.LevelData, hash: 'chino', url: 'chino' },
    genre: 'general',
    _public: false,
    userId: '',
    notes: 1,
    createdTime: 1,
    updatedTime: 1,
    description: { ja: '' }
  }

  head () {
    return {
      title: '譜面投稿'
    }
  }
}
</script>
