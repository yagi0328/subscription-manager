"use client";

import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { ActionStateType, login, signInWithGoogle } from "@/lib/supabase/auth";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Card, CardContent, CardDescription } from "../ui/card";
import Link from "next/link";
import { Spinner } from "../ui/spinner";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<ActionStateType, FormData>(login, {
    success: true,
  });

  const onCLickGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="max-w-[495px] mx-auto mt-[78px] max-md:mt-12">
      <div className="flex justify-center items-center gap-x-[9px]">
        <figure className="w-4">
          <Image src="/icn-person.svg" width={16} height={17} alt="人のアイコン" />
        </figure>
        <p className="text-[20px] font-bold">ログイン</p>
      </div>
      <Card className="mt-4">
        <CardContent>
          <form action={formAction}>
            <div className="max-w-[384px] mx-auto">
              <div className="grid gap-2">
                <Label className="font-medium" htmlFor="email">
                  メールアドレス
                </Label>
                <Input
                  className="bg-white"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                {state.error?.email ? (
                  <p className="text-red-500">{state.error.email[0]}</p>
                ) : (
                  <CardDescription className="text-sm">
                    メールアドレスを入力してください
                  </CardDescription>
                )}
              </div>
              <div className=" grid gap-2 mt-5">
                <Label className="font-medium" htmlFor="password">
                  パスワード
                </Label>
                <Input
                  className="bg-white"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {state.error?.password ? (
                  <p className="text-red-500">{state.error.password[0]}</p>
                ) : (
                  <CardDescription className="text-sm">
                    パスワードを入力してください
                  </CardDescription>
                )}
                {state.error?.message && <p className="text-red-500">{state.error.message}</p>}
              </div>
              <Link className="block text-[15px] mt-4" href="/forgot-password">
                パスワードをお忘れの方はこちら
              </Link>
              <Button className="mt-5 cursor-pointer" type="submit" disabled={isPending}>
                {isPending && <Spinner />}
                ログイン
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-center mt-[21px]">または</p>
      <Button className="w-full mt-[25px]" onClick={onCLickGoogleLogin}>
        Googleでログイン
      </Button>
    </div>
  );
}
