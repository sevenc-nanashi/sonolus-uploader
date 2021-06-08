import { auth } from '@/plugins/firebase'

async function getJwtToken () : Promise<string | undefined> {
  const token = await auth.currentUser?.getIdToken(true)
  return token
}

export { getJwtToken }
