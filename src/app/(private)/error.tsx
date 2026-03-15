"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <h1 className="text-2xl font-bold">エラーが発生しました</h1>
      <p className="text-muted-foreground">データの取得に失敗しました。</p>
      <p className="text-muted-foreground">しばらく時間をおいてから再度お試しください。</p>
      <Link href="/dashboard" className="text-blue-500 underline">
        ダッシュボードに戻る
      </Link>
    </div>
  );
}
