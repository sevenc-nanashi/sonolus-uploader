/*
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { auth, google, FirebaseAuth, FirebaseUser } from '~/plugins/firebase'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
    private auth: FirebaseAuth = auth

    @Mutation
    private login () : void {
      this.auth.signInWithPopup(google)
    }

    @Mutation
    private async logout () : Promise<void> {
      await this.auth.signOut()
    }

    public get getCurrentUser () : FirebaseUser | null {
      const user = this.auth.currentUser
      return user
    }

    public get isLoggedIn () : boolean {
      return Boolean(this.getCurrentUser)
    }

    public get getCurrentUserId (): string | null {
      if (this.auth.currentUser) {
        return this.auth.currentUser.uid
      }
      return null
    }
}
*/
