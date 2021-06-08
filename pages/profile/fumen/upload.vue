<template>
  <FormFumen
    :level-prop="level"
    :is-update-form="false"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Level, LevelGenreEnum, SonolusResourceLocatorTypeEnum } from '@/potato'
import FormFumen from '@/components/FormFumen.vue'

@Component({
  components: { FormFumen }
})
export default class LevelUpload extends Vue {
  level: Level = {
    name: '',
    version: 1,
    rating: 25,
    engine: {},
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
}
</script>
