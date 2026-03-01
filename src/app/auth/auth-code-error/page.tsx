import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <section className="py-[105px] px-10 max-md:py-12 max-md:px-6 text-center">
      <h2 className="text-2xl font-bold">認証リンクが無効です</h2>
      <p className="mt-4 text-[#868686]">
        リンクの有効期限が切れているか、無効なリンクです。
        <br />
        再度お試しください。
      </p>
      <Link
        href="/forgot-password"
        className="inline-block mt-8 underline text-primary"
      >
        パスワードリセットページへ戻る
      </Link>
    </section>
  );
}
