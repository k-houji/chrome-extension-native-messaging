# chrome-extension-native-messaging

拡張機能のNative Messagingを動かしてみただけのものです。

## セットアップ手順

1. Google Chromeの「拡張機能を管理」を開く。
1. 「デベロッパーモード」を有効にする。
1. 「パッケージ化されていない拡張機能を読み込む」をクリック。
1. src\extensions\connectionbase フォルダを選択する。
1. 同様に src\extensions\connectionless フォルダを選択する。
1. src\Host\Host\manifest.json を開いて、________________________________ の箇所に上記でインストールした拡張機能のIDを入力する。
1. Host.slnをビルドする。
1. 生成したHost.exeと同じフォルダの install.bat を実行する。

## テスト動作

https://k-houji.github.io/chrome-extension-native-messaging/

* Connection Less
    1. テキストを入力して「Send」をクリック。
    1. Hostが起動する。
    1. Hostでテキストを入力して「Send」をクリック。
    1. Hostが終了する。

* Connection Base
    1. 「Open」をクリック。
    1. Hostが起動する。
    1. テキストを入力して「Send」をクリック。
    1. Hostでテキストを入力して「Send」をクリック。
    1. 「Close」をクリック。
    1. Hostが終了する。
