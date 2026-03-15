import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import Image from "next/image";

export default function ChangePasswordPage() {
  return (
    <section className="pt-15 pb-7.5 px-30 max-md:py-12 max-md:px-6">
      <div className="max-w-[495px] mx-auto">
        <div className="flex items-center gap-x-3.5">
          <figure>
            <Image src="/icn-person.svg" width={21} height={22} alt="" />
          </figure>
          <h2 className="text-xl font-extrabold">パスワード変更</h2>
        </div>
        <ChangePasswordForm />
      </div>
    </section>
  );
}
