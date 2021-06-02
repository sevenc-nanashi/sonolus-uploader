<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="8" lg="6">
      <v-card class="px-3 py-3" height="82vh">
        <v-card-title>アカウント情報</v-card-title>
        <v-card-title>
          <v-avatar size="56" class="py-2">
            <img
              alt="user"
              :src="userPhoto"
            >
          </v-avatar>
          <p class="ml-3">
            {{ userName }}
          </p>
        </v-card-title>
        <v-card-title>
          サイト登録日
        </v-card-title>
        <v-card-text>
          AAAA/BB/CC DD:EE
        </v-card-text>
        <v-card-title>
          テストプレイサーバーアドレス
        </v-card-title>
        <v-card-text>
          https://sweetpotato.sonolus.jp/test/kfcn
        </v-card-text>
        <v-card-title>
          <v-btn xl block color="info">
            テストプレイサーバーのアドレスを変更する
          </v-btn>
        </v-card-title>
        <v-card-title>
          <v-btn @click="getJwtToken" xl block color="info">
            Firebase AuthorizationのJWTトークンを作る(デバッグ)
          </v-btn>
        </v-card-title>
        <v-card-title>
          <v-btn xl block color="warning" @click="logout">
            ログアウトする
          </v-btn>
        </v-card-title>
        <v-card-title>
          <v-btn xl block color="error">
            サイトを退会する
          </v-btn>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="8" lg="6">
      <v-card class="px-3 py-3" height="82vh">
        <v-card-title>譜面投稿履歴</v-card-title>
        <v-card-title>譜面投稿履歴がありません</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { auth } from '~/plugins/firebase'

@Component
export default class Account extends Vue {
  userName: string | null = 'aaa'
  userPhoto: string | null = ''

  mounted () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName
        this.userPhoto = user.photoURL
      } else {
        this.$router.push('/')
      }
    })
  }

  async getJwtToken () {
    const token = await auth.currentUser?.getIdToken(true)
    if (token) {
      alert('トークン作成成功(consoleをみてね)')
      console.log(token)
    }
  }

  logout () {
    this.$router.push('/')
    auth.signOut()
  }
}
</script>
