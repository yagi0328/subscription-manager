import NotificationEmailForm from "@/components/forms/NotificationEmailForm";
import Image from "next/image";

const NotificationEmailPage = () => {
  return (
    <section className="pt-15 pb-7.5 px-30 max-md:py-12 max-md:px-6">
      <div className="max-w-[495px] mx-auto">
        <div className="flex items-center gap-x-3.5">
          <figure>
            <Image src="/icn-person.svg" width={21} height={22} alt="" />
          </figure>
          <h2 className="text-xl font-extrabold">通知先メールアドレス</h2>
        </div>
        <NotificationEmailForm />
      </div>
    </section>
  );
};

export default NotificationEmailPage;
