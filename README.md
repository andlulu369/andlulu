# andlulu 公式ホームページ

人生創造ナビゲーター andlulu の公式サイトです。HTML / CSS / JavaScript だけで動く静的サイトなので、GitHub Pages にそのまま置けば公開できます。

## ファイル構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | トップページ（世界観・問い・思想・2つのサービス・ナビゲーター・最後のメッセージ） |
| `access-bars.html` | アクセスバーズ（セッション／資格取得講座／カードリーディングなど） |
| `web.html` | 想いをカタチにするホームページ制作 |
| `ai-support.html` | AI・デジタルサポート／伴走支援 |
| `about.html` | ABOUT（andluluについて・人生創造ナビゲーター） |
| `contact.html` | お申し込み・お問い合わせ（LINE・メール・フォーム） |
| `404.html` | ページが見つからないときの表示 |
| `assets/css/style.css` | デザイン（色・書体は先頭の `:root` にまとめています） |
| `assets/js/main.js` | メニュー、文字の演出、レンズ、フォーム送信 |
| `assets/img/` | ロゴ、写真、OGP画像、ファビコン |
| `sitemap.xml` / `robots.txt` | 検索エンジン向け |

## 公開のしかた（GitHub Pages）

1. リポジトリ `andlulu369/andlulu` の中身を、このフォルダの中身で置き換えます。
   以前の `index (3).html` と `index (4).html` は不要なので削除してください。
2. Settings → Pages で、ブランチ `main`・フォルダ `/ (root)` を選んで保存します。
3. 数分後に https://andlulu369.github.io/andlulu/ に反映されます。

## 差し替えが必要な情報

HTML内に `要差し替え` `要確認` `要追記` というコメントを入れてあります。ファイル内で検索すると該当箇所が見つかります。

- **カードリーディング**の内容・時間・料金（`access-bars.html`）
- **ホームページ制作**の料金・プラン（`web.html`）
- **AI・デジタルサポート／伴走支援**の料金・プラン（`ai-support.html`）
- **制作の流れ**、**AIサポートの例**が実際の進め方と合っているか（`web.html` / `ai-support.html`）
- **プロフィール**に追加したい経歴・資格など（`about.html`）

## 動作確認が必要な連絡先

- 公式LINE：`https://line.me/R/ti/p/@518mrsbs`（ID @518mrsbs から作ったリンクです。スマホで開いて友だち追加画面になるか確認してください）
- お問い合わせフォーム：旧サイトと同じ Formspree（`https://formspree.io/f/xwvzqvjy`）に送信します。公開後に一度テスト送信して、`andlulu369@gmail.com` に届くか確認してください。
- 連絡先を変えるときは、全ページのフッターと `contact.html` にあるので、一括置換が便利です。
