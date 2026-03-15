import PrivateHeader from "@/components/layout/PrivateHeader";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return (
    <>
      <PrivateHeader />
      <main>{children}</main>
    </>
  );
}
