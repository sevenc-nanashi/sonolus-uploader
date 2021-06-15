<template lang="md">
# ChunithmとPJsekaiのノーツ対応表<hr>
本ページでは創作譜面作成時のノーツとプレイ時の対応表を示します。

<iframe width="560" height="315" src="https://www.youtube.com/embed/WcVjwIn_lPM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![対応表](https://user-images.githubusercontent.com/16555696/108359313-313e5800-7233-11eb-95b3-fb4d2bc079b1.PNG)<br>
PJSekaiにおけるフリックは、赤いタップノーツを配置し、その上に振り上げAIRノーツを配置することで表現できる。

<br>

## スライドノーツについて<hr>

スライドノーツの配置について詳しく説明する。

## スライド不可視中継点配置
<img width="138" alt="スライド屈折不可視中継点配置" src="https://user-images.githubusercontent.com/16555696/108359815-cccfc880-7233-11eb-8638-45026ab57b68.PNG">
<img width="639" alt="スライド屈折不可視中継点配置検証" src="https://user-images.githubusercontent.com/16555696/108360245-4cf62e00-7234-11eb-8f78-ae37dcd9d463.PNG">

## スライド中継点配置
<img width="159" alt="スライド屈折中間点配置" src="https://user-images.githubusercontent.com/16555696/108360401-84fd7100-7234-11eb-87e8-e16f694ede88.PNG">
<img width="641" alt="スライド屈折中継点配置検証" src="https://user-images.githubusercontent.com/16555696/108360841-0ead3e80-7235-11eb-9bf5-c784bc72f9f6.PNG"><br>

- スライドが屈折している地点に中継点を配置したため、中継点が描画される。
<br>

## スライド中継点フリック配置
<img width="145" alt="スライド屈折フリック配置" src="https://user-images.githubusercontent.com/16555696/108361370-b9256180-7235-11eb-9e75-7df7faba48dd.PNG">
<img width="644" alt="スライド中継点フリック配置検証 " src="https://user-images.githubusercontent.com/16555696/108361529-f5f15880-7235-11eb-8429-b82f23d20b78.PNG"><br>

- スライドの中継点もしくは不可視中継点の上に、チュウニズムのフリックノーツを配置すると、配置した中継点におけるスライドの形状を無視し、前後の中継点を補間して接続する。<br>
- 画像の場合は、屈折しているスライドの上に中継点を配置し、その上にフリックノーツを配置している。
- そのため、屈折が無視され、直線的になっている。
- 不可視中継点の上にフリックノーツを配置した場合、中継点は描画されない。
<br>

## スライド始点右振り下ろし中継点右振り下ろし
<img width="152" alt="スライド屈折始点右振り下ろし中間点右振り下ろし" src="https://user-images.githubusercontent.com/16555696/108362273-e0c8f980-7236-11eb-93a7-d1f35235b9b2.PNG">
<img width="641" alt="スライド右右検証" src="https://user-images.githubusercontent.com/16555696/108362396-06ee9980-7237-11eb-9875-7cfea412046b.PNG"><br>

- スライドの始点・中継点にタップノーツを配置し、その上に振り下ろしを配置すると、カーブの曲率が変化する。
<br>

## スライド始点左振り下ろし中継点中央振り下ろし
<img width="122" alt="キャプチャ" src="https://user-images.githubusercontent.com/16555696/109505675-311a4400-7ae0-11eb-8cc2-855a7984ebc4.PNG">
<img width="641" alt="スライド屈折始点右振り下ろし中間点中央振り下ろし" src="https://user-images.githubusercontent.com/16555696/109505504-016b3c00-7ae0-11eb-8ee1-a04c9ca3638a.jpg">

- 弧を描く場合は、スライドの中継点/不可視中継点の上に、中央振り下ろしを配置する。
<br>

## うねうね
<img width="80" alt="キャプチャ" src="https://user-images.githubusercontent.com/16555696/110311704-83f77c80-8047-11eb-8c97-4aad0d7cedef.PNG">
<img width="27" alt="キャプチャ2" src="https://user-images.githubusercontent.com/16555696/110311738-907bd500-8047-11eb-9214-d2e920ef8b54.PNG">
</template>

<script>
export default {
  head () {
    return {
      title: 'Chunithm/Sonolusの対応表'
    }
  }
}
</script>
