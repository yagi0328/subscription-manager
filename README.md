# サブスク管理

## 概要
映画やドラマが好きでVOD系のサブスクリプションを多く契約しています。  
今までは意図的に支払い総額から目を背けていましたが、そろそろ現実と向き合うために制作しました。  
契約しているサブスクを登録・管理し、更新日には通知先に設定したメールアドレスに通知が届きます。

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

## 機能一覧
- メールアドレス・パスワード認証
- Google OAuth 認証
- パスワード変更
- サブスク登録・編集・削除
- 更新日の自動計算
- 更新日のメール通知（GitHub Actions）
- 通知先メールアドレスの変更

## 開発について
不明点や実装で詰まった際はまず自分で調べることを心がけ、  
15分以上解決しない場合のみ AI（Claude Code）を使用し、理解した上で実装することで、自走力の向上を意識しました。

## 参考
https://qiita.com/q-1-p/items/1ef5b9e581d350f8d8c1
