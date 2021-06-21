<template lang="md">
# 創作譜面の作り方<hr>
このページではSonolusのPJSekai譜面を作成する手順を示します。
**現状、創作譜面を作るためにはWindows(またはWindowsアプリが実行可能な)環境が必要です。スマホのみでは作成できません。**

SonolusのPJSekai譜面は以下の流れで作成します
- 1. Chunithmシミュレータ向け 創作譜面エディタで譜面作成
- 2. 創作譜面をSUSファイルとしてエクスポート
- 3. SUSファイルをSonolus譜面に変換
- 4. 本サイトにアップロード
<br>

## 1. Chunithmシミュレータ向け 創作譜面エディタで 譜面作成<hr>

SonolusおよびPJSekaiは一定のルールの上でChunithmの創作譜面と互換性があります。そのため、[M4ple-Editor](https://github.com/TinyTany/M4ple-Editor) もしくは [Ched](https://github.com/paralleltree/Ched)を用いることで譜面を作成することができます。本サイトに投稿する際はChedを利用してください。プレイ時にどのノーツがどれに対応しているかは [別記対応表](/help/pjsekai-chunithm-compare)をご確認ください。

## 2. 創作譜面をSUSファイルとしてエクスポート<hr>

納得行く譜面ができたら、作成した譜面をSUS形式でエクスポートします。

## 3. SUSファイルをSonolus譜面に変換<hr>

次に [sus to sonolus converter](https://miku-yay.netlify.app/) を利用してSonolus譜面に変換します。
まず、左側にSUSファイルの中身を貼り付け、Convertボタンを押し、最後に右側上部の出力を *level.json* として保存します。

## 4. 本サイトにアップロード<hr>

任意のGoogleアカウントでこのサイトにログインし、譜面情報(文字)、ジャケット(jpg/png)、音源(mp3)、譜面(level.json)などを選択して投稿します。投稿が正常に完了したら、"投稿完了!"というバーが下部に現れます。
次にユーザーページに行くと右側の投稿履歴に"テスト中"と表示されていると思います。公開前に一度テストプレイしてほしいという意図から、一旦自分でプレイするまでは公開できない仕様になっています。
テストプレイするためには、左側に記載されたテストサーバーアドレスをSonolusに登録して一度プレイしてみてください。その後ユーザーページに再び行き、テスト中になっている譜面をクリックすると 譜面を再編集できます。
ここで 公開にチェックを入れることで、晴れて全体に公開されるようになります。

お疲れさまでした!
</template>

<script>
export default {
  head () {
    return {
      title: '創作譜面の作り方'
    }
  }
}
</script>
