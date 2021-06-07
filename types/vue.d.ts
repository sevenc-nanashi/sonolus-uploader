import { LevelsApi, UsersApi } from '@/potato'

declare module 'vue/types/vue' {
  interface Vue {
    $levelsApi: LevelsApi
    $usersApi: UsersApi
  }
}
