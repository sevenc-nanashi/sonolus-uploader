<template lang="md">
# Sonolus・プロセカの譜面製作
このページでは 譜面制作の手順を紹介します。

## 1.譜面制作ツールについて
Sonolusおよびプロセカの創作譜面を作る時は[Ched](https://github.com/paralleltree/Ched/releases)を使います。 この際Chedのバージョンは[2.6.0.0](https://github.com/paralleltree/Ched/releases/tag/v2.6.0.0)~[2.6.4.0](https://github.com/paralleltree/Ched/releases/tag/v2.6.4.0)の範囲のものを使いましょう。新しい奴だと互換性がなくなって譜面がバグります…)

## 2.譜面を作る際の注意
* 使えないレーン
  * 左右の2レーンはSonolus、プロセカの創作譜面では使えません。描画されないので、使わない・はみ出させないよう注意しましょう。
![ched.png](https://drive.google.com/uc?export=view&id=1VfnPsYueyBCpHGVSTQ3PUAexl03XepCQ)

* 使えないノーツ
  * 下の画像の赤く囲んだところのノーツは使えません。また、青く囲んだノーツは単体では使えません。
  * ![ched.png](https://drive.google.com/uc?export=view&id=1uC7O88BABTdOyHXXCnHqy6L4Ky_h9BL0)

* 各ノーツの対応表
  * [(縦に長いので)こちらから確認](https://drive.google.com/uc?export=view&id=1WG7h9IGCiLSauJOXIjrZMO4lnrNeHXwm)

* 正しく表示されない配置
  * 同時にスライドノーツが3つ以上存在している(Sonolusのみ)
    * 表示されないだけでなく、離れたノーツが消える不具合が起こります
    * ![ched.png](https://drive.google.com/uc?export=view&id=1W0FKpJa9odtcIUsqlyDuHdxFh1b37Tmj)
  * スライドノーツの始点または終点が別の始点または終点に重なっている
    * ![ched.png](https://drive.google.com/uc?export=view&id=1MI0kUScG0Wu5aKo654aetLqeO0VN7GgF)

* 音源に音ズレについて
  * 投稿はmp3のみを受け付けますが、Ched内でmp3を使用すると音ズレが発生します。作成時はwav/oggなどを利用し、投稿直前にmp3に変換することをおすすめします。
    * 音源の変換には[FFmpeg](https://ffmpeg.org/download.html)等をご利用ください。

* 音源のタイミング調整
  * Chedに搭載された音源オフセット機能には対応していません。
    * タイミングを調整するときは[Audacity](https://forest.watch.impress.co.jp/library/software/audacity/)等で音源自体を修正してください。

* プラグイン
  * 作業効率化のためのプラグインが存在します、任意でご利用ください。
  * 一覧
    * [譜面をプロセカのテクスチャでプレビューするプラグイン](https://drive.google.com/uc?export=download&id=1PpSpZhKRkB-deEGLVrwIes4lFbJ127VB)
    * [susをインポート可能にするプラグイン](https://drive.google.com/uc?export=download&id=1PkEMpWFuGHYCNaGGMZbF_6AVaycoidl3)
  * 導入方法
    * ダウンロードしたDLLを Ched/Plugins/ に配置してください。
    * ダウンロード時、下記警告が表示される場合がありますが 動作確認済みなのでご安心ください。
      * ![ched.png](https://drive.google.com/uc?export=view&id=11uBzKX_flQE7pWre2DTJTjbyKB7z0Lzk)

## 3.譜面の作り方
ここまで説明したことを踏まえた上で、[エディタの使い方](https://github.com/paralleltree/Ched/wiki/HowToUse)を参考にして作成してください。

## 4. 創作譜面をSUSファイルとしてエクスポート<hr>

納得行く譜面ができたら、作成した譜面をSUS形式でエクスポートします。

## 5. 本サイトにアップロード<hr>

任意のGoogleアカウントでこのサイトにログインし、譜面情報(文字)、ジャケット(jpg/png)、音源(mp3)、譜面(data.sus)などを選択して投稿します。投稿が正常に完了したら、"投稿完了!"というバーが下部に現れます。
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
