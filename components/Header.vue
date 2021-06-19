<template>
  <v-app-bar
    fixed
    color="primary"
    dark
    app
  >
    <v-btn
      v-if="!right"
      icon
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title
      style="cursor: pointer"
      color="white"
      @click="$router.push('/')"
      v-text="title"
    />
    <v-spacer />
    <GuestBar v-if="!logined" />
    <UserBar v-else :avatar-url="user.photoURL" />
    <v-btn
      v-if="right"
      aria-label="menuButton"
      aria-haspopup="true"
      aria-expanded="false"
      icon
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'nuxt-property-decorator'
import { RequestOptions } from '@/types/upload/request-options'
import { setupUser } from '@/utils/account-support'
import { getJwtToken } from '@/utils/token'
import { auth } from '~/plugins/firebase'
import GuestBar from '~/components/GuestBar.vue'
import UserBar from '~/components/UserBar.vue'

@Component({
  components: {
    GuestBar,
    UserBar
  }
})
export default class Header extends Vue {
  @PropSync('openDrawer', { type: Boolean, default: false }) drawer!: boolean
  @PropSync('rightSided', { type: Boolean, default: true }) right!: boolean
  @PropSync('isLogined', { type: Boolean, default: true }) logined!: boolean

  title: string = 'SweetPotato'
  user: object = {}
  requestOptions : RequestOptions = {
    baseURL: this.$config.API_ENDPOINT,
    headers: {
      Authorization: ''
    }
  }

  mounted () : void {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.logined = true
        this.user = user
        getJwtToken().then((token) => {
          this.requestOptions.headers.Authorization = `Bearer ${token}`
          setupUser(this.$usersApi, user, this.requestOptions)
        })
      } else {
        this.logined = false
        this.user = {}
      }
    })
  }
}
</script>
