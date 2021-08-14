import { LevelsApi, UsersApi, UploadsApi } from '@/potato'

declare module 'vue/types/vue' {
  interface Vue {
    $levelsApi: LevelsApi
    $usersApi: UsersApi
    $uploadsApi: UploadsApi
  }
}
