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
          <v-row justify="center">
            <v-col cols="12" lg="6">
              <div class="mt-4 title text-h5">
                譜面情報
              </div>
              <v-text-field
                v-model="level.name"
                :rules="rules.name"
                counter="50"
                label="Name"
                required
              />
              <v-text-field
                v-model="level.title"
                :rules="rules.title"
                counter="50"
                label="Title"
                required
              />
              <v-text-field
                v-model="level.artists"
                :rules="rules.artists"
                counter="50"
                label="Artists"
                required
              />
              <v-text-field
                v-model="level.author"
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
                v-model="level.description"
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
                :label="!isUpdateForm ? 'Select chart (level.json)' : 'Select chart (level.json) (Optional)'"
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
                label="一般公開する(テストプレイ後に選択できます)"
                :disabled="!isUpdateForm"
              />
            </v-col>
          </v-row>
          <v-btn
            block
            x-large
            color="success"
            class="mr-4"
            @click="addToFirebase"
          >
            利用規約に同意して投稿する
          </v-btn>
        </v-card>
      </v-form>
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
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { gzipSync } from 'fflate'
import SHA1 from 'crypto-js/sha1'
import LibTypedArrays from 'crypto-js/lib-typedarrays'
import { Vue, Component, PropSync } from 'nuxt-property-decorator'
import { Level, LevelGenreEnum } from '@/potato'
import { getJwtToken } from '@/utils/token'
import { auth, storage, StorageReference } from '~/plugins/firebase'
import { UploadFiles } from '~/types/upload/files'
import { RequestOptions } from '~/types/upload/request-options'
const ToS = require('~/assets/texts/ToS.txt')

@Component
export default class FormFumen extends Vue {
  @PropSync('isUpdateForm', { type: Boolean, default: false }) isUpdate!: boolean
  @PropSync('levelProp', { type: Object }) level! : Level

  rules : object = {
    name: [
      (v: any) => { return !!v || 'Name is required' },
      (v: any) => (v && v.length <= 50) || 'Name must be less than 50 characters'
    ],
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

  genres : Array<LevelGenreEnum> = [
    LevelGenreEnum.General,
    LevelGenreEnum.Jpop,
    LevelGenreEnum.Anime,
    LevelGenreEnum.Vocaloid
  ]

  files: UploadFiles = {
    cover: new File([], ''),
    bgm: new File([], ''),
    data: new File([], '')
  }

  uploadProgress: string = ''
  uploadSuccess: boolean = false
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
    })
  }

  get formTitle () {
    return !this.isUpdate ? '譜面投稿' : '譜面編集'
  }

  get formDescription () {
    return !this.isUpdate ? '作成した譜面をみんなが遊べるようにしましょう!' : '作成した譜面をもっと良くしましょう!'
  }

  async uploadFumen () {
    if (this.level !== undefined) {
      if (this.level.name) {
        const token = await getJwtToken()
        if (token) {
          this.requestOptions.headers.Authorization = `Bearer ${token}`
        }
        const resp = await this.$levelsApi.addLevel(this.level.name, this.level, this.requestOptions)
        return resp
      }
    }
  }

  async editFumen () {
    if (this.level !== undefined) {
      if (this.level.name) {
        const token = await getJwtToken()
        if (token) {
          this.requestOptions.headers.Authorization = `Bearer ${token}`
        }
        const resp = await this.$levelsApi.editLevel(this.level.name, this.level, this.requestOptions)
        return resp
      }
    }
  }

  goTop () : void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  async compressFumenData () : Promise<Uint8Array> {
    const massiveFile = new Uint8Array(await this.files.data.arrayBuffer())
    const gzippedFumen = gzipSync(massiveFile, {
      filename: this.files.data.name
    })
    return gzippedFumen
  }

  readFileAsArrayBuffer (file: File) : Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = (e: any) => {
        resolve(e.target.result)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file as Blob)
    })
  }

  async generateSHA1Hash (file: File) : Promise<string> {
    const binary = await this.readFileAsArrayBuffer(file)
    const wordArray = LibTypedArrays.create(binary)
    const hash = SHA1(wordArray).toString()
    return hash
  }

  async generateSHA1HashByUint8 (binary: Uint8Array) : Promise<string> {
    const blob = new Blob([binary.buffer], { type: 'application/octet-binary' })
    /*
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'level.gz'
    link.innerHTML = 'Download!'
    document.body.appendChild(link)
    */
    return await this.generateSHA1Hash(blob as File)
  }

  async uploadToStorage (ref: StorageReference, file: File) {
    try {
      const task = await ref.put(file as Blob)
      return task
    } catch (e: any) {
      console.log(e)
      return null
    }
  }

  async uploadToStorageByUint8 (ref: StorageReference, binary: Uint8Array) {
    try {
      const task = await ref.put(binary)
      return task
    } catch (e: any) {
      console.log(e)
      return null
    }
  }

  async resetForm () : Promise<void> {
    const resetter = (this.$refs.form as Vue & { reset: () => void })
    await resetter.reset()
    this.termsOfUses = ToS
    this.uploadSuccess = true
  }

  async addToFirebase () : Promise<void> {
    const isFormOk = (
      this.$refs.form as Vue & { validate: () => boolean }
    ).validate()
    if (!auth.currentUser || !isFormOk) {
      this.goTop()
      return
    }
    // 開発環境かどうかで処理を分岐
    if (process.env.NODE_ENV === 'production') {
      const fumenRef = storage.ref().child('fumen')
      const uid = auth.currentUser.uid
      this.uploadProgress = '投稿を開始します'
      if (this.level !== undefined) {
        try {
          if (this.files.cover.name !== '') {
            this.uploadProgress = '譜面カバーを登録しています...'
            const coverHash = await this.generateSHA1Hash(this.files.cover)
            const coverRef = fumenRef.child(`cover/${uid}/${coverHash}`)
            await this.uploadToStorage(coverRef, this.files.cover)
            if (this.level.cover !== undefined) {
              this.level.cover.hash = coverHash
              this.level.cover.url = await coverRef.getDownloadURL()
            }
          }
          if (this.files.bgm.name !== '') {
            this.uploadProgress = '譜面BGMを登録しています...'
            const bgmHash = await this.generateSHA1Hash(this.files.bgm)
            const bgmRef = fumenRef.child(`bgm/${uid}/${bgmHash}`)
            await this.uploadToStorage(bgmRef, this.files.bgm)
            if (this.level.bgm !== undefined) {
              this.level.bgm.hash = bgmHash
              this.level.bgm.url = await bgmRef.getDownloadURL()
            }
          }
          if (this.files.data.name !== '') {
            this.uploadProgress = '譜面データを登録しています...'
            const dataZip = await this.compressFumenData()
            const dataHash = await this.generateSHA1HashByUint8(dataZip)
            const dataRef = fumenRef.child(`data/${uid}/${dataHash}`)
            await this.uploadToStorageByUint8(dataRef, dataZip)
            if (this.level.data !== undefined) {
              this.level.data.hash = dataHash
              this.level.data.url = await dataRef.getDownloadURL()
            }
          }
          this.uploadProgress = '譜面情報を登録しています...'
          if (!this.isUpdate) {
            const resp = await this.uploadFumen()
            if (resp) {
              console.log(resp)
            }
          } else {
            await this.editFumen()
          }
          this.resetForm()
        } catch (e) {
          console.error(e)
        }
      }
    // Storageのエミュレータが無いので開発環境ではファイル検証を行えない
    } else {
      const dataZip = await this.compressFumenData()
      const dataHash = await this.generateSHA1HashByUint8(dataZip)
      console.log('譜面gzipのハッシュ値', dataHash)
      this.uploadProgress = '譜面情報を登録しています...'
      await this.uploadFumen()
      this.resetForm()
    }
    this.uploadProgress = ''
  }
}
</script>
