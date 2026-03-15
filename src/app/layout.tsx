import type { Metadata } from "next";
// import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// const notoJP = Noto_Sans_JP({
//   variable: "--font-notojp",
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL("https://subscription-manager-liart.vercel.app"),
  title: {
    default: "サブスク管理",
    template: "%s | サブスク管理",
  },
  description:
    "サブスクリプションの料金・更新日を一元管理し、更新日をメールで通知するサービスです。",
  openGraph: {
    title: "サブスク管理",
    description:
      "サブスクリプションの料金・更新日を一元管理し、更新日をメールで通知するサービスです。",
    url: "https://subscription-manager-liart.vercel.app",
    siteName: "サブスク管理",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://subscription-manager-liart.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
