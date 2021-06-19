import { UsersApi, User } from '@/potato'
import { customAlphabet } from 'nanoid'
import { FirebaseUser } from '~/plugins/firebase'
import { RequestOptions } from '~/types/upload/request-options'

async function setupUser ($usersApi: UsersApi, user: FirebaseUser, options: RequestOptions) {
  if (user.metadata.creationTime) {
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      // Try to get self
      try {
        await $usersApi.getUser(user.uid)
      // If could not get, register user
      } catch (err) {
        const unixTimeI64 = Date.parse(user.metadata.creationTime)
        const unixTimeI32 = parseInt(unixTimeI64.toString().slice(0, 10))
        const nanoid = customAlphabet('1234567890abcdefghijklmnopqestuvwxyz', 8)
        const newUser: User = {
          userId: user.uid,
          testId: nanoid(),
          isAdmin: false,
          isDeleted: false,
          totalFumen: 0,
          createdTime: unixTimeI32,
          updatedTime: unixTimeI32,
          description: 'コメントなし'
        }
        $usersApi.editUser(user.uid, newUser, options)
      }
    }
  }
}

async function editUser ($usersApi: UsersApi, user: User, options: RequestOptions) {
  if (user.userId) {
    const resp = await $usersApi.editUser(user.userId, user, options)
    return resp.data
  }
}

export { setupUser, editUser }
