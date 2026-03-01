import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-[105px] px-10 max-md:py-12 max-md:px-6 text-center">
      <h2 className="text-[40px] font-bold max-md:text-3xl">404</h2>
      <p className="mt-4 text-[#868686]">ページが見つかりませんでした。</p>
      <Link href="/" className="inline-block mt-8 underline text-primary">
        トップページに戻る
      </Link>
    </section>
  );
}
