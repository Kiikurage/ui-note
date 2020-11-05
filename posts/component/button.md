---
title: Button
slug: button
---

アクションが実行できることをユーザーに提示し[^workday_canvas]、ワンクリックでアクションを実行するためのUI[^material_design]。

![Buttons](sample:/samples/component/button/buttons)

## ベストプラクティス

### コマンド内容を明瞭に伝える[^material_design]

ラベルは簡潔にし、必要以上に詳細な情報を載せない。また、アイコンを適宜利用する。

### アイコンを必要以上に使用しない[^spectrum][^elastic_ui]

アイコンはアクションの説明のために使用し、アイコン無しで機能が十分に伝わる場合は使用しない。
また、デコレーション目的で使用してはいけない。

![](/component/button/button-elastic_ui-bad_icon_usage.png "
    アイコンを使用すべきでない例。
    ユーザーの注目を引いてしまい、またアイコンからアクションが明確にわからないため、結果としてアクションの理解を妨げてしまう。
    出典:https://elastic.github.io/eui/#/navigation/button/guidelines
")

### 強弱をつける

1画面から複数のアクションが実行可能な場合、全てを同じボタンで表示するとユーザーが理解しにくくなってしまう。
ボタンのテキスト、色、サイズ、スタイルなどで強弱をつけて重要な機能が目立つよう工夫する。

#### 「強いボタン」は1レイアウトに1つ

1レイアウトは1つの機能の提供に集中すべきである。そのため、最も強く注目されるボタンは1レイアウト内に1つだけにすべきである。[^material_design][^elastic_ui]

#### TextButton

ラベルだけからなるボタン。多くのデザインガイドラインで「弱いボタン」として使われている。[^material_design][^spectrum][^elastic_ui]

![Text Button](sample:/samples/component/button/textbutton)

ただし、異なるスタイルのボタンを同時に使用すると可読性が下がる、ただのテキストと誤解されるなどの問題点も有るため注意が必要。[^elastic_ui]

![](/component/button/button-google_calendar-text_button.png "
    Googleカレンダー。「その他のオプション」がTextButton。
    メインコンテンツは入力フォーム、保存アクションが重要アクションである。
    テキストボタンを使うことで情報に強弱をつけ、ユーザーがメインコンテンツ及び保存アクションに集中しやすくしている。
    このテキストボタンは通常の文字色と同じ色である。しかし、保存ボタンとグループ化されているため、テキストではなくボタンであるとユーザーは認識できる。
    出典:https://calendar.google.com/calendar
")


### ボタンの最小幅
小さすぎるボタンは選択しづらいため、横幅の最低サイズを設定しているデザインガイドラインが多い
- Material Design: 64dp。
- Spectrum: ボタンの高さの2.25倍。通常のフォントサイズの場合これは72pxに相当。ただし、重要でないボタン(Quiet Button)については指定がない。

### テキストの折り返しについて
- Material Design: 禁止、可読性に欠けるため。
- Spectrum: 許容。

### 目立つボタンは1画面で1個だけにする[^material_design]
1画面内に目立つボタンが複数あるということは1画面で複数の重要なコマンドが実行可能ということであり、ユーザーの混乱につながる。
もし複数の目立つボタンを置く必要がある場合、そもそも機能過多である可能性がある。

### 目立つボタンは、disabled状態であっても重要であることがわかるようにする[^material_design]
例えばButtonのdisabled状態として背景を透明にすると、TextButtonと見分けがつかなくなり、その画面の主機能がわかりづらくなる。

### ボタンは縦に並べず、横に並べる[^material_design]
ボタンは横長であるため、ユーザーの視線はテキストの方向に動く。縦に並べるとボタンの関連性がわかりづらくなる。また、ボタンは細長いため、縦に並べると誤操作しやすくなる

[^material_design]: Google "Buttons - Material Design" [https://material.io/components/buttons](https://material.io/components/buttons)
[^workday_canvas]: Workday "Buttons | Workday Canvas Design System" [https://design.workday.com/components/buttons/buttons](https://design.workday.com/components/buttons/buttons)
[^workday_canvas_textbutton]: Workday "Text Buttons | Workday Canvas Design System" [https://design.workday.com/components/buttons/text-buttons](https://design.workday.com/components/buttons/text-buttons)
[^spectrum]: Adobe "Button - Spectrum" [https://spectrum.adobe.com/page/button/](https://spectrum.adobe.com/page/button/)
[^elastic_ui]:  Elastic "Elastic UI Framework - Button" [https://elastic.github.io/eui/#/navigation/button/guidelines](https://elastic.github.io/eui/#/navigation/button/guidelines)
