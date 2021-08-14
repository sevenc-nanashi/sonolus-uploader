<template>
  <v-row justify="center" align="center">
    <!-- 読込中ダイアログ -->
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
    <!-- テストサーバー設定 ダイアログ -->
    <v-dialog
      v-model="openTestChange"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">テストサーバー設定</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="potatoUser.testId"
                  label="テストコード"
                  type="text"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*ここで設定したコードがテストプレイ用のアドレスに使われます</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="openTestChange = false"
          >
            保存しないで閉じる
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="setTestId(); openTestChange = false"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- メイン -->
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
          {{ createdDate }}
        </v-card-text>
        <v-card-title>
          テストサーバーアドレス
        </v-card-title>
        <v-card-text>
          {{ testServerAddress }}
        </v-card-text>
        <v-card-title>
          <v-btn xl block color="info" @click="openTestChange = true">
            テストサーバーのアドレスを変更する
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
            v-for="level in levels"
            :key="level.name"
            cols="12"
            col="12"
          >
            <nuxt-link :to="'/profile/fumen/edit?id=' + level.name">
              <Fumen :level="level" />
            </nuxt-link>
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
import { Level, User } from '@/potato'
import { getJwtToken } from '@/utils/token'
import { RequestOptions } from '~/types/upload/request-options'
import { auth } from '~/plugins/firebase'
import { getUserLevelList } from '~/utils/search-support'
import { editUser } from '~/utils/account-support'

@Component
export default class Account extends Vue {
  userName: string | null = '読込中'
  userPhoto: string | null = ''
  potatoUser: User = { testId: '' }
  levels: Level[] = []
  page: number = 1
  pageCount: number = 1
  openLoading: boolean = true
  openTestChange: boolean = false
  requestOptions : RequestOptions = {
    baseURL: this.$config.API_ENDPOINT,
    headers: {
      Authorization: ''
    }
  }

  async resetUserLevelList (uid: string) {
    const resp = await getUserLevelList(
      this.$usersApi,
      uid,
      this.page,
      undefined,
      this.requestOptions
    )
    this.levels = resp.items
    this.pageCount = resp.pageCount
    this.openLoading = false
  }

  async resetUserSettings (uid: string) {
    const resp = await this.$usersApi.getUser(uid)
    this.potatoUser = resp.data
  }

  async setTestId () {
    if (this.potatoUser) {
      try {
        await editUser(this.$usersApi, this.potatoUser, this.requestOptions)
      } catch (e) {
        alert('既に使われているテストIDです')
      }
    }
  }

  mounted () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userName = user.displayName
        this.userPhoto = user.photoURL
        getJwtToken().then((token) => {
          this.requestOptions.headers.Authorization = `Bearer ${token}`
          this.resetUserLevelList(user.uid)
          this.resetUserSettings(user.uid)
        })
      } else {
        this.$router.push('/')
      }
    })
  }

  logout () {
    this.$router.push('/')
    auth.signOut()
  }

  @Watch('page')
  onPageChange () {
    if (this.potatoUser) {
      if (this.potatoUser.userId) {
        this.resetUserLevelList(this.potatoUser.userId)
      }
    }
  }

  get testServerAddress () : string {
    if (this.potatoUser) {
      return `${this.$config.API_ENDPOINT}/tests/${this.potatoUser.testId}`
    }
    return '読込中'
  }

  get createdDate () : string {
    if (this.potatoUser) {
      if (this.potatoUser.createdTime) {
        const dt = new Date(this.potatoUser.createdTime * 1000)
        return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`.replace(/\n|\r/g, '')
      }
    }
    return '読込中'
  }

  head () {
    return {
      title: 'マイページ'
    }
  }
}
</script>
