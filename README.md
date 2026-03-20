# サブスク管理

![opengraph-image](https://github.com/user-attachments/assets/15b434c4-f40e-47e1-b3b9-11544185f062)


## 概要
契約しているサブスクリプションを登録・管理し、更新日には通知先に設定したメールアドレスに通知が届きます。
更新サイクルの設定なども行えます。


## 制作理由
私自身、映画やドラマが好きでVOD系のサブスクリプションを多く契約しています。
今までは意図的に支払い総額から目を背けていましたが、そろそろ現実と向き合うために制作しました。


## URL
https://subscription-manager-liart.vercel.app/


## 使用技術
| カテゴリ | 技術 |
|---------|------|
| フロントエンド | Next.js / TypeScript / Tailwind CSS / shadcn/ui |
| 認証 | Supabase Auth |
| ORM | Prisma |
| DB | Supabase |
| インフラ | Vercel |
| 通知 | GitHub Actions / Nodemailer |
| 開発ツール | Claude Code |


## 機能一覧

- メールアドレス・パスワード認証
- Google OAuth 認証

<img width="858" height="611" alt="image 3" src="https://github.com/user-attachments/assets/b43dff7e-6eda-40fe-a33d-601d9662411a" />

<br>

- パスワード変更

<img width="857" height="380" alt="image 5" src="https://github.com/user-attachments/assets/4a261117-0507-400e-b430-a6924f7debb7" />
<br>

- サブスク登録・編集・削除

<img width="860" height="521" alt="image" src="https://github.com/user-attachments/assets/b9803a1c-42ff-4825-aa5e-c03adaddaab1" />
<img width="859" height="498" alt="image 6" src="https://github.com/user-attachments/assets/398d97b2-cb74-45c0-a6f9-f60e79599cc1" />
<img width="858" height="498" alt="image 7" src="https://github.com/user-attachments/assets/9446c996-ec2f-420d-a4cd-d6c0cbb0ba43" />

<br>

- 更新日の自動計算
- 更新日のメール通知（GitHub Actions）
- 通知先メールアドレスの変更


## 技術選定の理由

### Next.js
情報量が多くキャッチアップしやすい点と、実務でも広く使われていることから選びました。
また、Server ActionsによりAPI Routesを作成せずにサーバー処理を実装でき、コード量を抑えられる点や、Vercelへのデプロイのしやすさも魅力に感じています。

### Tailwind CSS
ユーティリティファーストのCSSフレームワークで、HTMLに直接スタイルを記述できクラス名を考える必要がなく、開発効率が高いと感じたため採用しました。

### shadcn/ui
Tailwind CSSベースのコンポーネントライブラリである点と、MUIなどと比較してカスタマイズが簡単なため採用しました。

### Prisma
ORMの学習を目的として採用しました。TypeScriptで型安全にDB操作できる点が実務でも活かせると考えました。

### Supabase
学習教材でSupabaseを使用していた点と、業務でMySQLに少し触れた経験があったため、NoSQLベースのFirebaseよりPostgreSQLベースのSupabaseの方が扱いやすいと判断し採用しました。


## 苦労した点

### Supabase Auth と Prisma の二重管理
認証はSupabase Auth、ユーザー情報の管理はPrismaで行う設計にしていましたが、両者が自動で同期されないため、二重管理されている状態でした。
Supabaseのトリガー機能を使用し、Supabase Authへの変更を自動的にPrisma側へ同期する設計に変更し解決しました。
今後はNext Authを使用しPrismaで一元管理しようと思います。

### GitHub Actions
更新日が近いサブスクリプションをメールで通知する機能をGitHub Actionsで実装しました。
`notify.yml`にスケジュール実行の設定を記載し、通知処理を定期的に実行しています。
CI/CDの実装が初めてだったため、設定ファイルの書き方などに苦労しました。


## 参考
サブスクリプション管理サービスを作るにあたり、既存サービスや記事を参考にしながら機能の方向性を決めました。
実装（認証・DB設計・通知処理など）は自分で行っています。

https://qiita.com/q-1-p/items/1ef5b9e581d350f8d8c1
