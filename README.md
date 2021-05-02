# sonolus-uploader
Sonolusの創作譜面をアップロードできるサイトフロント(Firebase)(仮)

## 仕様
とりあえずの仕様案をここに書く

### 開発言語
- フロントエンド: Nuxt.ts(TypeScript)
- バックエンド: Golang

### アーキテクチャ
GoogleのFirebaseを基準にする。フロントはFirebase、バックエンドはGoのAPIになる。
#### フロントエンド
- ホスティング: Firebase Hosting(Max 10GB)
#### バックエンド
- ホスティング: Cloud Run(Goコンテナ)(Cloud Functionsが有料なため)
#### 両方からアクセス
- データベース: Cloud Firestore
- ストレージ: Cloud Storage (Max 5GB DL 1GB/day)
#### ユーザー認証
Googleアカウントを使う(これ以外使おうとしたらめんどくさいし...)

### 開発環境
VSCode

### できること
#### 投稿
- Googleアカウントでログインできる
- 譜面をアップロードできる
   - 譜面情報(テキスト)
     - title(日本語)
     - name(英語)
     - artists(複数形だが1行の文字列)
     - author(譜面作成者名称)
     - description(説明文)
     - rating(難易度)
   - 譜面データ(level.json)
     - level.jsonをgzip圧縮したlevelファイルをサーバー側で生成する
   - 音源(music.mp3)
   - ジャケット(jacket.png)
#### 表示
- 投稿された譜面一覧がWebで表示できる
  - NuxtでFirestoreを読んで表示(フロントはAPIとやり取りしない)
- 投稿された譜面一覧をSonolusから読み出せる
  - levels/list(曲一覧)ファイルを生成する
  - levels/level(曲単体)ファイルを作成する
### 参考
- [現状のユーザー投稿フロー(PurplePalette Wiki)](https://github.com/PurplePalette/PurplePalette.github.io/wiki)
- [Sonolus公式サーバーガイド(Sonolus Wiki)](https://github.com/NonSpicyBurrito/sonolus-wiki/wiki/Server)
- [susをsonolus形式に変換するやつ(Github Source)](https://github.com/AskmienFoodoe/miku-yay)
- [サイトのデザイン案 (Domao)](https://whimsical.com/sonoluscreators-Up6ttsnQeoJCXNVyyb2yaT)
### 備考
- susをsonolus形式に変換するやつはひとまず手を付けない
- effectやbackground等がカスタマイズできるようだがとりあえずpjsekaiのデフォルト固定仕様で行く
