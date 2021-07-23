<template lang="md">
# ChunithmとPJsekaiのノーツ対応表<hr>
本ページでは創作譜面作成時のノーツとプレイ時の対応表を示します。

<iframe width="560" height="315" src="https://www.youtube.com/embed/WcVjwIn_lPM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![対応表](https://user-images.githubusercontent.com/16555696/108359313-313e5800-7233-11eb-95b3-fb4d2bc079b1.PNG)<br>
PJSekaiにおけるフリックは、赤いタップノーツを配置し、その上に振り上げAIRノーツを配置することで表現できます。

<br>

## スライドノーツについて<hr>

スライドノーツの配置について詳しく説明します。

## スライド不可視中継点配置
![不可視中継点](https://user-images.githubusercontent.com/16555696/126741615-7ed6f5fd-b9a7-4741-9bb3-8514721e6b1c.PNG)
不可視中継点を配置すると、中継点を描画せずに、スライドを曲げることができます。

## スライド中継点配置
![中継点](https://user-images.githubusercontent.com/16555696/126741536-2e2dbcea-86ed-48ae-a1c3-396dc2aa4517.PNG)
スライドが屈折している地点に中継点を配置したため、中継点が描画されます。

## スライド中継点フリック配置
![フリック](https://user-images.githubusercontent.com/16555696/126741739-5ee553ee-6e65-4139-96c3-3578db6fbb09.PNG)
- スライドの中継点もしくは不可視中継点の上に、チュウニズムのフリックノーツを配置すると、配置した中継点におけるスライドの形状を無視し、前後の中継点を補間して接続します。
- 画像の場合は、スライドの屈折部分に中継点を配置し、その上にフリックノーツを配置しています。
- そのため、屈折部分が無視され、直線的になっています。
- 不可視中継点の上にフリックノーツを配置した場合、中継点は描画されずに、同様の形状となります。
<br>

## スライドの曲げ方
スライドには「曲げない」、「最初に加速して曲げる(ease in)」、「最後に加速して曲げる(ease out)」の3つがあります。
### 曲げない
![slide1](https://user-images.githubusercontent.com/16555696/126740503-d9a967e5-f1e0-4cdb-9450-cb6abec1c083.PNG)

### 最初に加速して曲げる(ease in)
スライドの始点・中継点・不可視中継点の上に、タップノーツを配置し、その上に降り下げ右AIRか降り下げ左AIRを配置します。左右の方向は関係ありません。
![slide2](https://user-images.githubusercontent.com/16555696/126740677-3d95a82b-c6e2-4a1d-b1dc-f021b15deb15.PNG)

### 最後に加速して曲げる(ease out)
スライドの始点・中継点・不可視中継点の上に、タップノーツを配置し、その上に降り下げAIRを配置します。
![slide3](https://user-images.githubusercontent.com/16555696/126740895-3bc38540-d329-4e14-8461-517a11b422a7.PNG)

## 応用
### うねうね
![うねうね](https://user-images.githubusercontent.com/16555696/126741084-82d7d202-10a2-4919-8939-14f930b6123b.PNG)

### 弧
![弧](https://user-images.githubusercontent.com/16555696/126741216-075940ea-11a1-4ef8-a21e-4c79b1062707.PNG)

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
