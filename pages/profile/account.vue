<template>
  <v-row justify="center" align="center">
    <v-dialog
      v-model="openLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          読込中です...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
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
          <v-btn xl block color="info" @click="getJwtToken">
            Firebase AuthorizationのJWTトークンを作る(デバッグ)
          </v-btn>
        </v-card-title>
        <v-card-title>
          <v-btn xl block color="warning" @click="logout">
            ログアウトする
          </v-btn>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="8" lg="6">
      <v-card class="px-3 py-3" height="82vh">
        <v-card-title>譜面投稿履歴</v-card-title>
        <v-row>
          <v-col
            v-for="fumen in fumens"
            :key="fumen.name"
            cols="12"
            col="12"
          >
            <Fumen :fumen="fumen" />
          </v-col>
          <v-col cols="12">
            <v-pagination
              v-model="page"
              :length="pageCount"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { auth } from '~/plugins/firebase'
import { getUserLevelList } from '~/utils/userReader'
import { Fumen } from '~/types/upload/fumen'

@Component
export default class Account extends Vue {
  userName: string | null = 'aaa'
  userPhoto: string | null = ''
  fumens: Fumen[] = []
  page: number = 1
  pageCount: number = 1
  openLoading: boolean = true

  mounted () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName
        this.userPhoto = user.photoURL
        getUserLevelList(user.uid, 1).then((response) => {
          this.fumens = response.levels
          this.pageCount = response.pageCount
          this.openLoading = false
        })
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

  @Watch('page')
  async onPageChange () {
    const uid = auth.currentUser?.uid
    if (uid) {
      this.openLoading = true
      const resp = await getUserLevelList(uid, this.page)
      this.fumens = resp.levels
      this.pageCount = resp.pageCount
      this.openLoading = false
    }
  }
}
</script>
