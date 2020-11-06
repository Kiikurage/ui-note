---
title: Drawer
slug: drawer
---

ドロワー(引き出し)のようにスライドイン/アウトするパネル。

![Drawer](sample:/samples/component/drawer/drawer)

## ベストプラクティス

### 内容

主にアプリケーション全体に関する情報（例:アカウント情報）、各種トップレベルの機能・ページへのアクセスなどを提供する。

関連性の低い雑多な要素や階層構造を持った内容に適している。[^material_design]

ドロワーには次のようなデメリットがあることに注意が必要である。[^standard_inc]
- 展開するために1アクションが必要
- 展開するまで内容がわからず、ユーザーに慣れが必要 
- 多くの情報の中から目的の情報を探すのが困難 

#### タブ

要素数が少ない場合はタブを検討したほうが良い。

#### 検索ボックス

内容が多く目的の情報を探すための認知負荷が高い場合は検索ボックスを利用したほうが良い

![](/component/drawer/drawer-amazon-example.png "
AmazonのPC版ウェブサイトでのドロワー。カテゴリ一覧が置かれているが認知負荷が高い。
出典:https://www.amazon.co.jp
")

### メイン要素に対する展開時の振る舞い

- **スライド** \
    メイン要素がスライドする。画面全体のスライドという高い認知負荷を伴うので、頻繁に開閉される場合には適さない。

    ![](/component/drawer/drawer-material_design-slide_mode.png "
        スライドの例。メインコンテンツ(写真)が右へスライドしている。出典:https://material.io/components/navigation-drawer#usage
    ")

- **モーダル** \
    メイン要素にオーバーラップする。メイン要素への操作はブロックされる。画面サイズが限られているモバイルデバイスで用いられることが多い。[^material_design]

    ![](/component/drawer/drawer-material_design-modal_mode.png "
        オーバーラップの例。メインコンテンツ(写真)にドロワーが重なっている。
        出典:https://material.io/components/navigation-drawer#usage
    ")

### 位置
    
- **横** \
    アプリケーション全体でのナビゲーションの方向を揃える。通常は言語の方向に合わせる。LTR言語は左から右へ、RTL言語なら逆となる。
    これを踏まえ、各種機能へのアクセスのためのドロワーはLTR言語なら左から、RTL言語なら右から出す。[^material_design]
    
    一方、アイテム一覧などのページにおいて、「注目したアイテムの詳細情報を表示する」などの機能を提供するドロワーはLTR言語なら右から、RTL言語なら左から出すほうがよい。
    
    ![](/component/drawer/drawer-google_drive-left_and_right.png "
        左右両方からドロワーが出ている例。左ドロワーはストレージの種類やカテゴリ、右ドロワーはアイテムの詳細を表示しており、
        ユーザーが迷うことなく自然に操作できる。
        どちらのドロワーもメインコンテンツに対するユーザーの操作をブロックする必要はないため、モーダルではなくスライドパターンを用いている。
        出典:https://drive.google.com/drive/my-drive
    ")

- **下** \
    モバイルデバイスで用いる。画面下にButtonが多く配置されている場合にユーザーがアクセスしやすい。[^material_design]
    ナビゲーション目的ではなく現在注目しているコンテンツに対するアクションの一覧を提供する目的で使われることが多いように感じる。


[^material_design]: Google "Navigation drawer - Material Design" [https://material.io/components/navigation-drawer#usage](https://material.io/components/navigation-drawer#usage)
[^standard_inc]: Tomohiro Suzuki "ドロワーというナビゲーションの再考 | UXデザイン会社Standardのブログ" [http://www.standardinc.jp/reflection/article/rethink-the-ui-that-drawer/](http://www.standardinc.jp/reflection/article/rethink-the-ui-that-drawer/)
