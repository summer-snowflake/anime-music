# anime-music（仮）

アニメのOPとEDをまとめた情報サイト（の予定）

## 本番環境

（未構築）

## ステージング環境

（未構築）

## 開発

### 通知等

Slack使ってます。ご興味ある方は、[@kae_kasui](https://twitter.com/kae_kasui)まで。

### バックエンド

- Ruby 2 系
  - 詳細なバージョンは`.ruby-version`または`Gemfile`の`ruby`を確認
- Rails 5 系
  - 詳細なバージョンは、`Gemfile`を確認

基本的に、バージョンは最新のものを採用します。

### フロントエンド

現在まだ用意していません。
ReactJSを想定しています。

### コーディングルール

- Ruby
  - 基本的にはrubocop

### CI環境

CIについて、キーワードは以下です。
詳細は、リポジトリの設定ファイル等で確認できます。
- Github
- Wercker
- Slack
- heroku

### 環境構築

- Comman line toolsをインストール

```
xcode-select --install
```

- Homebrewをインストール

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

この後インストールするパッケージについて、時々アップデートが必要になります。
```
brew update
brew upgrade rbenv
brew upgrade ruby-build
```

- rbenv等パッケージのインストール

好みで、rbenv-gemsetも入れると便利です。

```
brew install rbenv
brew install ruby-build
brew install npm
brew install postgres
echo 'eval #$(rbenv init -)"' >> ~/.bash_profile
echo 'export PATH="$HOME/.rbenv/shims:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
```

- rbenvでインストールできるRubyのバージョンを確認
```
rbenv install -l
```

- rbenvでRubyをインストール

プロジェクトで使用しているバージョンをインストールします
```
rbenv install 2.3.1
rbenv rehash
```

- ソースコードを入手
```
git clone https://github.com/summer-snowflake/anime-music.git
```

- Rails及びgemをインストール
```
cd anime-music
gem install bundle
bundle // bundle install の略
```

- 各種nodeパッケージのインストール
```
npm install
```

- DBの構築
```
rails db:create
rails db:migrate
rails db:seed // 現在のところは不要
```

- サーバーの起動
```
bin/rails s
```
