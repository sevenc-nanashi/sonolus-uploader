<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" lg="12">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-card class="px-3 pb-3 px-2">
          <v-card-title class="text-h4">
            {{ formTitle }}
          </v-card-title>
          <v-card-subtitle>
            {{ formDescription }}
          </v-card-subtitle>
          <v-card-subtitle>
            投稿前には
            <nuxt-link to="/help/publish-fumen-rules">
              投稿ガイドライン
            </nuxt-link>
            を必ずご確認ください!
          </v-card-subtitle>
          <v-row justify="center">
            <v-col cols="12" lg="6">
              <div class="mt-4 title text-h5">
                譜面情報
              </div>
              <v-text-field
                v-model="level.title.ja"
                :rules="rules.title"
                counter="50"
                label="Title"
                required
              />
              <v-text-field
                v-model="level.artists.ja"
                :rules="rules.artists"
                counter="50"
                label="Artists"
                required
              />
              <v-text-field
                v-model="level.author.ja"
                :rules="rules.author"
                counter="30"
                label="Author"
                required
              />
              <v-select
                v-model="level.genre"
                :items="genres"
                label="Genre"
              />
              <v-textarea
                v-model="level.description.ja"
                :rules="rules.description"
                label="Description"
                counter
                maxlength="120"
                full-width
                single-line
              />
              <v-slider
                v-model="level.rating"
                :rules="rules.rating"
                label="Difficulty"
                hint="Im a hint"
                thumb-label
                max="50"
                min="1"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="mt-4 title text-h5">
                ファイル選択
              </div>
              <v-file-input
                accept="image/png,image/jpeg"
                prepend-icon="mdi-file-image"
                :label="!isUpdateForm ? 'Select jacket (*.png, *.jpg)' : 'Select jacket (*.png, *.jpg) (Optional)'"
                :rules="[v => !!v || isUpdateForm || 'File is mandatory']"
                @click:clear="files.cover = null"
                @change="files.cover = $event"
              />
              <v-file-input
                accept="audio/mpeg"
                prepend-icon="mdi-music"
                :label="!isUpdateForm ? 'Select music (*.mp3)' : 'Select music (*.mp3) (Optional)'"
                :rules="[v => !!v || isUpdateForm || 'File is mandatory']"
                @click:clear="files.bgm = null"
                @change="files.bgm = $event"
              />
              <v-file-input
                accept="text/json"
                prepend-icon="mdi-file-music-outline"
                :label="!isUpdateForm ? 'Select chart (data.sus)' : 'Select chart (data.sus) (Optional)'"
                :rules="[v => !!v || isUpdateForm || 'File is mandatory']"
                @click:clear="files.data = null"
                @change="files.data = $event"
              />
              <div class="mt-4 title text-h5">
                利用規約
              </div>
              <v-textarea
                class="mx-2"
                no-resize
                rows="8"
                :value="termsOfUses"
                readonly
              />
              <v-checkbox
                v-model="level.public"
                block
                label="一般公開する（チェックを外すと自分だけのテストサーバーに公開されます）"
                :disabled="!isUpdateForm"
              />
            </v-col>
          </v-row>
          <v-btn
            block
            x-large
            color="success"
            class="mr-4"
            :disabled="publishBlocked"
            @click="postLevel"
          >
            利用規約に同意して投稿する
          </v-btn>
          <v-btn
            block
            x-large
            color="error"
            class="mr-4"
            :disabled="publishBlocked"
            @click="openDeleteConfirm = true"
          >
            投稿した譜面を削除する
          </v-btn>
        </v-card>
      </v-form>
      <!-- テストサーバー設定 ダイアログ -->
      <v-dialog
        v-model="openDeleteConfirm"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">譜面削除の確認</span>
          </v-card-title>
          <v-card-text>
            <span class="text-h5">
              本当に譜面を削除してよろしいですか？
              (ローカルに保存されている場合を除き)
              再投稿しない限り他プレイヤーが遊べない状態になります。
            </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="openDeleteConfirm = false"
            >
              削除しないで閉じる
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="deleteLevel(); openDeleteConfirm = false"
            >
              削除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-overlay :value="uploadProgress != ''">
        <v-container>
          <v-row
            class="fill-height"
            align-content="center"
            justify="center"
          >
            <v-col
              class="subtitle-1 text-center"
              cols="12"
            >
              {{ uploadProgress }}
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="deep-purple accent-4"
                indeterminate
                rounded
                height="6"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-overlay>
      <v-snackbar
        v-model="uploadSuccess"
        timeout="3000"
      >
        投稿完了!
        <template #action="{ attrs }">
          <v-btn
            color="green"
            text
            v-bind="attrs"
            @click="uploadSuccess = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="uploadFailed"
        timeout="3000"
      >
        投稿失敗
        <template #action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="uploadFailed = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'nuxt-property-decorator'
import { customAlphabet } from 'nanoid'
import { Level } from '@/potato'
import { getJwtToken } from '@/utils/token'
import { auth } from '@/plugins/firebase'
import { UploadFiles } from '@/types/upload/files'
import { RequestOptions } from '@/types/upload/request-options'
const ToS = require('~/assets/texts/ToS.txt')

@Component
export default class FormFumen extends Vue {
  @PropSync('isUpdateForm', { type: Boolean, default: false }) isUpdate!: boolean
  @PropSync('levelProp', { type: Object }) level! : Level

  rules : object = {
    title: [
      (v: any) => { return !!v || 'Title is required' },
      (v: any) => (v && v.length <= 50) || 'Title must be less than 50 characters'
    ],
    artists: [
      (v: any) => { return !!v || 'Artists is required' },
      (v: any) => (v && v.length <= 50) || 'Artists must be less than 50 characters'
    ],
    author: [
      (v: any) => { return !!v || 'Author is required' },
      (v: any) => (v && v.length <= 30) || 'Author must be less than 30 characters'
    ],
    description: [
      (v: any) => { return !!v || 'Description is required' },
      (v: any) => (v && v.length <= 120) || 'Description must be less than 120 characters'
    ]
  }

  genres : Array<string> = [
    'general',
    'jpop',
    'anime',
    'vocaloid'
  ]

  files: UploadFiles = {
    cover: new File([], ''),
    bgm: new File([], ''),
    data: new File([], '')
  }

  uploadProgress: string = ''
  uploadSuccess: boolean = false
  uploadFailed: boolean = false
  publishBlocked: boolean = false
  openDeleteConfirm: boolean = false
  termsOfUses: string = ToS.default

  requestOptions : RequestOptions = {
    baseURL: this.$config.API_ENDPOINT,
    headers: {
      Authorization: ''
    }
  }

  mounted () {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/')
      }
      getJwtToken().then((token) => {
        this.requestOptions.headers.Authorization = `Bearer ${token}`
      })
    })
  }

  get formTitle () {
    return !this.isUpdate ? '譜面投稿' : '譜面編集'
  }

  get formDescription () {
    return !this.isUpdate ? '作成した譜面をみんなが遊べるようにしましょう!' : '作成した譜面をもっと良くしましょう!'
  }

  async uploadFumen () {
    const resp = await this.$levelsApi.addLevel(this.level.name, this.level, this.requestOptions)
    return resp
  }

  async editFumen () {
    const resp = await this.$levelsApi.editLevel(this.level.name, this.level, this.requestOptions)
    return resp
  }

  deleteFumen () {
    // await this.$levelsApi.deleteLevel(this.level.name, this.requestOptions)
    alert('譜面情報を削除しました')
    this.$router.push('/profile/account')
  }

  async uploadFumenData (file: File) {
    const resp = await this.$uploadsApi.uploadFile(file, this.requestOptions)
    return resp
  }

  goTop () : void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  async resetForm () : Promise<void> {
    const resetter = (this.$refs.form as Vue & { reset: () => void })
    await resetter.reset()
    this.termsOfUses = ToS
    this.uploadSuccess = true
  }

  async postLevel () : Promise<void> {
    const isFormOk = (
      this.$refs.form as Vue & { validate: () => boolean }
    ).validate()
    if (!auth.currentUser || !isFormOk) {
      this.goTop()
      return
    }
    this.level.userId = auth.currentUser.uid
    this.uploadProgress = '投稿を開始します'
    this.publishBlocked = true
    try {
      if (this.files.cover.name !== '') {
        this.uploadProgress = '譜面カバーを登録しています...'
        const resp = await this.uploadFumenData(this.files.cover)
        this.level.cover.url = `${this.$config.API_ENDPOINT}/uploads/${resp.data.filename}`
      }
      if (this.files.bgm.name !== '') {
        this.uploadProgress = '譜面BGMを登録しています...'
        const resp = await this.uploadFumenData(this.files.bgm)
        this.level.bgm.url = `${this.$config.API_ENDPOINT}/uploads/${resp.data.filename}`
      }
      if (this.files.data.name !== '') {
        this.uploadProgress = '譜面データを登録しています...'
        const resp = await this.uploadFumenData(this.files.data)
        this.level.data.url = `${this.$config.API_ENDPOINT}/uploads/${resp.data.filename}`
      }
      this.uploadProgress = '譜面情報を登録しています...'
      if (!this.isUpdate) {
        const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12)
        this.level.name = nanoid()
        const resp = await this.uploadFumen()
        if (resp) {
          console.log(resp)
        }
      } else {
        await this.editFumen()
      }
      this.resetForm()
    } catch (e) {
      this.uploadFailed = true
      console.error(e)
    }
    this.uploadProgress = ''
  }
}
</script>
