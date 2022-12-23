# Hex-Dec-Converter（16 進数-10 進数変換アプリ）

https://hex-dec-converter.vercel.app/

## このアプリについて

16 進数で数値を入力すると、10 進数表記に変換してくれる。その逆も可能。  
符号あり整数(signed)と符号なし整数(unsigned)、浮動小数点（IEEE754）の三つの表現に対応している。

現時点で整数は 8 から 32bit まで、浮動小数点は 32bit に対応している。

### 開発動機

開発動機を一言で言うと、「自分が欲しいもので、かつ自分のレベルで作れそうだったから作った」である。

普段バイナリファイルを扱うため、手軽に中の数値を確認できるアプリが欲しいと以前から思っていた。

というのも、こういった 16 進数-10 進数変換アプリは世の中に多く存在するが、符号あり整数と符号なし整数の両方に対応しているものはまれであるからである。
加えて、浮動小数点に対応しているものは 1 つ、2 つしか見当たらず、いずれも UI に不満があったため、これら３つの表現方法に対応した変換ツールがあれば良いのにと思った。

そこで、ちょうど自分のブログ（ https://github.com/ynishisaki/myblog )が完成したので、web アプリ制作第二弾として、16 進数-10 進数変換アプリの制作に取り組むことにした。

また、2 の補数表現や IEEE754、IBM float について、もう少し詳しく勉強したいと思っていたので、それらの勉強も兼ねている。

### 技術選定など

以下のようなことを考えた。

-   「値を入力して、変換ボタンを押す」のではなく、値の入力と同時に 16 進数-10 進数の変換結果が出力されるようにしたい。  
    → React の useState で実装可能と判断。

-   10 進数-2 進数-16 進数間の変換も、JavaScript で行いたい。
    → 調べた結果、JavaScript でも 32bit まではビット演算ができることが判明。

-   広告があると気が散るので、広告なしのアプリにする。  
    → これは簡単！

### 技術的特徴

-   言語は、TypeScript。

-   Next.js/React.js を使用。

-   10 進数-2 進数-16 進数間の変換の実装方法は、以下の通り。
    符号なし整数...parseInt()
    符号あり整数...parseInt()、ビット演算
    浮動小数点...ArrayBuffer、DataView オブジェクト

-   無効な値を入力をさせないための入力制限
    既存のアプリの多くは、「input タグに入力後、変換ボタンを押す。すると変換結果が出力される」という手順で、変換ボタンの onClick で入力値が有効か無効か判定して、有効ならば変換結果を出力し、無効ならばエラーを吐く、という設計になっている。
    しかし本アプリは「input タグに入力。すると同時に変換結果がリアクティブに出力される」ので、あらかじめ input タグの入力を正規表現で徹底的に制限し、handleChange のたびに計算するという設計にしてある。
    例えば、マイナス"-"は二つ以上入力できないし、一文字目以降に-を入力しても弾かれるように作ってある。符号なし整数ならば、そもそも-が入力できないよう設計してある。
    （もし入力できてしまった場合は、お知らせいただけると嬉しいです。）

-   入力値から bit 数を推定する
    特に、2 の補数表現では、最上位ビットの値が問題になるため、変換には値の入力と共に精度を指定する必要がある。
    既存のアプリの多くは、「まずはじめに求める精度を選択し、input タグに入力後、変換ボタンを押す。すると変換結果が出力される」という手順だが、
    しかし本アプリは「精度が指定されていなくても、入力値から自動で精度を推測、変換結果を出力する」ようになっている。

-   UI ライブラリとして、Chakra UI を使用。

### 苦労した点

-   符号なし整数、符号あり整数、浮動小数点に対応した入力制限を正規表現で作る部分で想像以上に苦戦した。

-   JavaScript における数字やバイナリの扱い方が、思っていたより特殊であった。  
    たとえば、数字の類は全て number 型で、signed と unsigned の選択がない。ビット演算では、32bit 以上が破棄されるなど。

### 楽しかった点

-   既存の 16 進数-10 進数変換ツール（Windows の電卓アプリが一番好き）と、Chakra UI のドキュメントを見比べながら、
    どうやって自分のアプリに同じような機能を落とし込んでいくか、考えるのが面白かった。

-   正規表現を、自分の狙った文字列にマッチするように考えて組み立てるのが面白かった。  
    のちに、この時得た知識が web スクレイピングする際に役立った。

-   世の中にある 16 進数-10 進数変換ツールの中でも、最も自分が使いたいと思えるアプリができて非常に満足している。いつもこのアプリを愛用している。そしてバグを発見しては直している。

### 今後の課題

-   64bit まで対応できるように拡張したい。  
    32bit 以上の場合、JavaScript のビット演算の問題があるので、32bit 以下とは別の方法で実装する必要がある。
