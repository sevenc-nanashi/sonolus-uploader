<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" lg="10">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-card class="px-3 pb-3 px-2">
          <v-card-title class="text-h4">
            譜面投稿
          </v-card-title>
          <v-card-subtitle>
            あなたの作成した譜面をみんなが遊べるようにしましょう!
          </v-card-subtitle>
          <v-row justify="center">
            <v-col cols="12" lg="6">
              <div class="mt-4 title text-h5">
                譜面情報
              </div>
              <v-text-field
                v-model="fumen.name"
                :rules="rules.name"
                counter="50"
                label="Name"
                required
              />
              <v-text-field
                v-model="fumen.title"
                :rules="rules.title"
                counter="50"
                label="Title"
                required
              />
              <v-text-field
                v-model="fumen.artists"
                :rules="rules.artists"
                counter="50"
                label="Artists"
                required
              />
              <v-text-field
                v-model="fumen.author"
                :rules="rules.author"
                counter="30"
                label="Author"
                required
              />
              <v-select
                :items="genres"
                label="Genre"
              />
              <v-textarea
                v-model="fumen.description"
                :rules="rules.description"
                label="Description"
                counter
                maxlength="120"
                full-width
                single-line
              />
              <v-slider
                v-model="fumen.rating"
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
                label="Select jacket (*.png, *.jpg) (Optional)"
                @click:clear="files.cover = null"
                @change="files.cover = $event"
              />
              <v-file-input
                accept="audio/mpeg"
                prepend-icon="mdi-music"
                label="Select music (*.mp3)"
                :rules="[v => !!v || 'File is mandatory']"
                @click:clear="files.bgm = null"
                @change="files.bgm = $event"
              />
              <v-file-input
                accept="text/json"
                prepend-icon="mdi-file-music-outline"
                label="Select chart (level.json)"
                :rules="[v => !!v || 'File is mandatory']"
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
                v-model="fumen.publish"
                block
                label="一般公開する(テストプレイ後に選択できます)"
                disabled
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
import Jszip from 'jszip'
import SHA1 from 'crypto-js/sha1'
import LibTypedArrays from 'crypto-js/lib-typedarrays'
import { Vue, Component } from 'nuxt-property-decorator'
import { auth, database, storage, StorageReference } from '~/plugins/firebase'
import { UploadFiles } from '~/types/upload/files'
import { Fumen, LEVEL_COVER, LEVEL_BGM, LEVEL_DATA } from '~/types/upload/fumen'
import ToS from '~/assets/texts/ToS.txt'

@Component
export default class Upload extends Vue {
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

    genres : Array<string> = [
      'general',
      'jpop',
      'anime',
      'vocaloid'
    ]

    fumen: Fumen = {
      title: '',
      name: '',
      description: '',
      artists: '',
      author: '',
      rating: 25,
      publish: false,
      cover: { type: LEVEL_COVER, hash: 'hoge', url: 'hoge' },
      bgm: { type: LEVEL_BGM, hash: 'hoge', url: 'hoge' },
      data: { type: LEVEL_DATA, hash: 'hoge', url: 'hoge' }
    }

    files: UploadFiles = {
      cover: new File([], ''),
      bgm: new File([], ''),
      data: new File([], '')
    }

    uploadProgress: string = ''
    uploadSuccess: boolean = false
    termsOfUses: string = ToS

    mounted () {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push('/')
        }
      })
    }

    uploadFumen () {
      const resp = database.ref('fumen').push(this.fumen)
      return resp
    }

    goTop () : void {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    async compressFumenData () {
      const gzip = new Jszip()
      gzip.file(this.files.data.name, this.files.data)
      const gzippedFumen = await gzip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE'
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

    async uploadToStorage (ref: StorageReference, file: File) {
      try {
        const task = await ref.put(file as Blob)
        return task
      } catch (e: any) {
        console.log(e)
        return null
      }
    }

    async addToFirebase () : Promise<void> {
      const isFormOk = (
        this.$refs.form as Vue & { validate: () => boolean }
      ).validate()
      if (!auth.currentUser || !isFormOk) {
        this.goTop()
        return
      }
      const fumenRef = storage.ref().child('fumen')
      const uid = auth.currentUser.uid
      this.uploadProgress = '投稿を開始します'
      try {
        this.uploadProgress = '譜面カバーを登録しています...'
        const coverHash = await this.generateSHA1Hash(this.files.cover)
        const coverRef = fumenRef.child(`cover/${uid}/${coverHash}`)
        await this.uploadToStorage(coverRef, this.files.cover)
        this.fumen.cover.hash = coverHash
        this.fumen.cover.url = await coverRef.getDownloadURL()

        this.uploadProgress = '譜面BGMを登録しています...'
        const bgmHash = await this.generateSHA1Hash(this.files.bgm)
        const bgmRef = fumenRef.child(`bgm/${uid}/${bgmHash}`)
        await this.uploadToStorage(bgmRef, this.files.bgm)
        this.fumen.bgm.hash = bgmHash
        this.fumen.bgm.url = await bgmRef.getDownloadURL()

        this.uploadProgress = '譜面データを登録しています...'
        const dataZip = await this.compressFumenData()
        const dataHash = await this.generateSHA1Hash(dataZip as File)
        const dataRef = fumenRef.child(`data/${uid}/${dataHash}`)
        await this.uploadToStorage(dataRef, dataZip as File)
        this.fumen.data.hash = dataHash
        this.fumen.data.url = await dataRef.getDownloadURL()

        this.uploadProgress = '譜面情報を登録しています...'
        const resp = await this.uploadFumen()
        console.log('Document written with ID: ', resp)
        const resetter = (this.$refs.form as Vue & { reset: () => void })
        await resetter.reset()
        this.termsOfUses = ToS
        this.uploadSuccess = true
      } catch (e) {
        console.error(e)
      }
      this.uploadProgress = ''
    }

    log (str: string) : void {
      console.log(str)
    }
}
</script>
