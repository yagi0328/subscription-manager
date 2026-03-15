import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="flex justify-between items-center pt-4.5 pr-[23px] pb-3.5 pl-8.5 bg-gray-dr">
      <h1 className="w-[93px]">
        <Link href="/">
          <Image src="/lg-header.svg" width={93} height={23} alt="サブスクのロゴ" />
        </Link>
      </h1>
      <Button asChild>
        <Link href="/signup">新規登録</Link>
      </Button>
    </header>
  );
}
