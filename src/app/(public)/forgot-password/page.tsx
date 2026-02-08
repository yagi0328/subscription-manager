import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import Image from "next/image";

const ForgotPasswordPage = () => {
  return (
    <section className="pt-15 pb-7.5 px-30">
      <div className="max-w-[495px] mx-auto">
        <div className="flex items-center gap-x-3.5">
          <figure>
            <Image src="/icn-person.svg" width={21} height={22} alt="" />
          </figure>
          <h2 className="text-xl font-extrabold">パスワードリセット</h2>
        </div>
        <ForgotPasswordForm />
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
