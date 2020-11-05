---
title: TextField
slug: text_field
---

ユーザーがテキストを自由入力するためのUI

## ベストプラクティス

### ラベル

#### 必ずラベルを指定する [^spectrum]

ラベルがないとユーザーはフォームの意味を理解できない。例外として、文脈が十分に分かる場合はラベルを表示しなくても良い。その場合でも、メタデータとしてラベルを必ず指定すること(例: `aria-label`)[^spectrum]

![](/component/text_field/text_field-spectrum-labelless_text_field.png "
    ラベルがいらないフォームの例。
    周辺の情報から「このフォームはページ番号を表している」と明確に理解できるため、ラベルを省略できる。
    出典:https://spectrum.adobe.com/page/text-field/
")

#### ラベルを省略しない [^material_design]

ユーザーがフォームの意味を理解できない。短く簡潔なラベルにする。

#### 位置

- コンポーネントの横よりも上部に置く。[^spectrum]
    - 長いラベルにもフィットする(ただし長いラベルを推奨しているわけではない)
    - RTL言語へのローカライゼーションが容易
    - レスポンシブデザインに適している
- コンポーネントの境界線上に置く。[^material_design]
    - ユーザースタディの結果。[^material_design_user_study]
    
### プレースホルダ

#### 入力方法や内容に関する説明を置かない [^spectrum]

プレースホルダの内容は入力中に見えなくなってしまうため。
特にパスワードマネージャなどのForm Fillerを使用している場合、ユーザーは一度もプレースホルダを見ることがない。
入力方法や内容に関する説明はヘルプテキストに表示するのが良い。

#### 多用しない [^atlassian]

ラベルだけでは説明が不十分な場合にのみ使用し、必要がなければ指定すべきではない。

### ヘルプテキスト

#### ラベルと同じ内容を載せない [^spectrum]

強調目的でラベルと同じ内容を載せない。表示する内容がなければヘルプテキストは表示しなくて良い。

![](/component/text_field/text_field-spectrum-bad_help_text.png "
    悪いヘルプテキストの例。ラベルと同じ内容を繰り返してしまっている。
    出典:https://spectrum.adobe.com/page/text-field/
")

### 必須項目/任意項目

#### 必須項目(or任意項目)であることを表すラベルは少数派に付ける [^spectrum][^material_design]

- 少数派の項目にラベルを付ける。例えば、フォームの大部分が入力必須の項目である場合は、任意項目に「(任意)」のラベルやヘルプテキストをつける。
- フォームの全項目が入力必須であっても、全ての項目に「(必須)」のラベルやヘルプテキストを付けてはいけない。

### バリデーションとエラーメッセージ

#### エラー内容ではなく「どうすればよいか」を表示する [^spectrum]

例: 「パスワードのフォーマットが正しくありません」→「パスワードは8文字以上、英小文字、数字、および記号を含める必要があります」

#### バリデーション結果を表示する際にガタツキ(Layout Shift)が起きないようにする [^material_design]

エラーメッセージを表示することでコンポーネントのサイズが変化するとレイアウトのガタツキが発生してしまう。
ヘルプテキストを表示していた場合は、そのスペースで代わりにエラーメッセージを表示する。
    
![](/component/text_field/text_field-spectrum-validation_message.png "
    バリデーション結果をアイコンおよびメッセージで表示している。
    ヘルプテキストがあった場所にエラーメッセージを表示しているためLayout Shiftが起きない。
    出典:https://spectrum.adobe.com/page/text-field/
")

### 文字数インジケータ

![](/component/text_field/text_field-spectrum-character_count.png "
    Spectrumの文字数インジケータ。この数字は最大文字数を表しているが、入力済みの文字数と誤解しやすい気がする。
    出典:https://spectrum.adobe.com/page/text-field/
")

![](/component/text_field/text_field-material_design-character_count.png "
    Material Design(Google)の文字数インジケータ。最大文字数と現在の文字数が両方表示されており分かりやすい。
    ヘルプテキストの行に表示しているが、Spectrumのようにラベルの行においたほうがスペースを効率良く使えそうである。
    (Material Designではラベルをボックス内に重ねるため単純にラベルと同じ高さには置くことができない)。
    出典:https://material.io/components/text-fields#anatomy
")

![](/component/text_field/text_field-carbon-character_count.png "
    Carbon(IBM)の文字数インジケータ。上2つのいいとこ取りをしたようなデザイン。
    出典:https://www.carbondesignsystem.com/components/text-input/usage#character-count
")

### 外観

#### 下線があるとTextFieldであると認識しやすい。[^material_design]

ユーザースタディの結果。[^material_design_user_study]
- 紙のフォームによる先入観?

[^spectrum]: Adobe "Text field - Spectrum" [https://spectrum.adobe.com/page/text-field/](https://spectrum.adobe.com/page/text-field/)
[^material_design]: Google "Text fields - Material Design" [https://material.io/components/text-fields#anatomy](https://material.io/components/text-fields#anatomy)
[^material_design_user_study]: Susanna Zaraysky "The Evolution of Material Design’s Text Fields | by Susanna Zaraysky | Google Design | Medium" [https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)
[^atlassian]: Atlassian "Text field - Atlassian Design System" [https://atlassian.design/components/textfield/usage](https://atlassian.design/components/textfield/usage)
