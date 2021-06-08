import { LevelsApi, UsersApi } from '@/potato'

export default ({ $config }: { $config: any }, inject: any) => {
  inject('levelsApi', new LevelsApi(undefined, $config.API_ENDPOINT))
  inject('usersApi', new UsersApi(undefined, $config.API_ENDPOINT))
}
