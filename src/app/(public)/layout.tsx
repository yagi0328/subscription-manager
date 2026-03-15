import PublicHeader from "@/components/layout/PublicHeader";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
}
