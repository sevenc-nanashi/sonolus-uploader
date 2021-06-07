import { LevelsApi, UsersApi } from '@/potato'

// eslint-disable-next-line
export default ({}, inject: any) => {
  inject('levelsApi', new LevelsApi())
  inject('usersApi', new UsersApi())
}
