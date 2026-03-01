import LoginForm from "@/components/forms/LoginForm";

export default function Home() {
  return (
    <section className="py-[105px] px-10 max-md:py-12  max-md:px-6">
      <h2 className="text-[40px] font-bold leading-[1.2] text-center max-md:text-3xl">
        あなたのサブスクを、
        <br className="md:hidden" />
        ひと目で。
      </h2>
      <p className="text-xl text-center mt-5 max-md:text-[15px]">
        支払いを整理し、無駄を減らすウェブアプリ
      </p>
      <LoginForm />
    </section>
  );
}
