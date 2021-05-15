<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" lg="6">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-card class="px-3 py-3">
          <v-row align="center" justify="center">
            <v-col cols="12" lg="10">
              <v-card-title class="text-h4">
                譜面投稿
              </v-card-title>
              <v-card-subtitle>
                あなたの作成した譜面をみんなが遊べるようにしましょう!
              </v-card-subtitle>
            </v-col>
            <v-col cols="12" lg="10">
              <div class="mt-4 title text-h5">
                譜面情報
              </div>
            </v-col>
            <v-col cols="12" lg="10">
              <v-text-field
                v-model="fumen.name"
                counter="50"
                label="Name"
                required
              />

              <v-text-field
                v-model="fumen.title"
                counter="50"
                label="Title"
                required
              />

              <v-text-field
                v-model="fumen.artists"
                counter="50"
                label="Artists"
                required
              />

              <v-text-field
                v-model="fumen.author"
                label="Author"
                required
              />

              <v-textarea
                v-model="fumen.description"
                label="Description"
                counter
                maxlength="120"
                full-width
                single-line
              />

              <v-slider
                v-model="fumen.rating"
                label="Difficulty"
                hint="Im a hint"
                thumb-label
                max="50"
                min="1"
              />
            </v-col>
            <v-col cols="12" lg="10">
              <div class="mt-4 title text-h5">
                ファイル選択
              </div>
            </v-col>
            <v-col cols="12" lg="10">
              <v-file-input
                accept="image/png"
                prepend-icon="mdi-file-image"
                label="Select jacket (.png)"
                @click:clear="files.cover = null"
                @change="files.cover = $event"
              />
              <v-file-input
                accept="audio/mpeg"
                prepend-icon="mdi-music"
                label="Select music (.mp3)"
                @click:clear="files.bgm = null"
                @change="files.bgm = $event"
              />
              <v-file-input
                accept=".sus,text/plain"
                prepend-icon="mdi-file-music-outline"
                label="Select chart (.sus)"
                @click:clear="files.data = null"
                @change="files.data = $event"
              />
            </v-col>
            <v-col cols="12" lg="10">
              <div class="mt-4 title text-h5">
                利用規約
              </div>
            </v-col>
            <v-col cols="12" lg="10">
              <v-textarea
                no-resize
                rows="8"
                :value="termsOfUses"
                readonly
              />
            </v-col>
          </v-row>
          <v-card-actions class="mt-3">
            <v-btn
              block
              x-large
              color="success"
              class="mr-4"
              @click="addToFirebase"
            >
              利用規約に同意して投稿する
            </v-btn>
          </v-card-actions>
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
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Jszip from 'jszip'
import SHA1 from 'crypto-js/sha1'
import LibTypedArrays from 'crypto-js/lib-typedarrays'
import { Vue, Component } from 'nuxt-property-decorator'
import { database, storage, StorageReference } from '~/plugins/firebase'
import { UploadFiles } from '~/types/upload/files'
import ToS from '~/assets/texts/ToS.txt'
import { Fumen, LEVEL_COVER, LEVEL_BGM, LEVEL_DATA } from '~/types/upload/fumen'

@Component
export default class Upload extends Vue {
    fumen: Fumen = {
      title: '',
      name: '',
      description: '',
      artists: '',
      author: '',
      rating: 25,
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

    termsOfUses: string = ToS

    uploadFumen () {
      const resp = database.ref('fumen').push(this.fumen)
      return resp
    }

    async compressFumenData () {
      const gzip = new Jszip()
      gzip.file(this.files.data.name, this.files.data)
      const gzippedFumen = await gzip.generateAsync({ type: 'blob' })
      return gzippedFumen
    }

    readFileAsArrayBuffer (file: File) {
      return new Promise<number[]>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = (e: any) => {
          resolve(e.target.result)
        }
        reader.onerror = reject
        reader.readAsArrayBuffer(file as Blob)
      })
    }

    uploadToStorage (ref: StorageReference, file: File) {
      return new Promise<string>((resolve, reject) => {
        const task = ref.put(file as Blob)
        task.on('state_changed',
          snapshot => (console.log(snapshot)),
          (error) => { reject(error) },
          () => {
            this.readFileAsArrayBuffer(file).then(
              (binary) => {
                const wordArray = LibTypedArrays.create(binary)
                const hash = SHA1(wordArray).toString()
                resolve(hash)
              }
            ).catch((e) => { reject(e) })
          }
        )
      })
    }

    async addToFirebase () : Promise<void> {
      const fumenRef = storage.ref().child('fumen')
      this.uploadProgress = '投稿を開始します'
      try {
        this.uploadProgress = '譜面カバーを登録しています...'
        const coverRef = fumenRef.child(`cover/${this.files.cover.name}`)
        const coverHash = await this.uploadToStorage(coverRef, this.files.cover)
        this.fumen.cover.hash = coverHash
        this.fumen.cover.url = await coverRef.getDownloadURL()

        this.uploadProgress = '譜面BGMを登録しています...'
        const bgmRef = fumenRef.child(`bgm/${this.files.bgm.name}`)
        const bgmHash = await this.uploadToStorage(bgmRef, this.files.bgm)
        this.fumen.bgm.hash = bgmHash
        this.fumen.bgm.url = await bgmRef.getDownloadURL()

        this.uploadProgress = '譜面データを登録しています...'
        const dataRef = fumenRef.child(`data/${this.files.data.name}`)
        const dataZip = await this.compressFumenData()
        const dataHash = await this.uploadToStorage(dataRef, dataZip as File)
        this.fumen.data.hash = dataHash
        this.fumen.data.url = await dataRef.getDownloadURL()

        this.uploadProgress = '譜面情報を登録しています...'
        const resp = await this.uploadFumen()
        console.log('Document written with ID: ', resp)
        this.uploadProgress = '投稿完了!'
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
