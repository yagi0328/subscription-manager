"use client";

import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { ActionStateType, signup } from "@/lib/supabase/auth";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Card, CardContent, CardDescription } from "../ui/card";

const RegisterForm = () => {
  const [state, formAction] = useActionState<ActionStateType, FormData>(signup, {
    success: true,
  });

  return (
    <div className="max-w-[495px] mx-auto">
      <div className="flex justify-center items-center gap-x-[9px]">
        <figure className="w-4">
          <Image src="/icn-person.svg" width={16} height={17} alt="人のアイコン" />
        </figure>
        <h2 className="text-[20px] font-bold">新規登録</h2>
      </div>
      <Card className="mt-4  shadow-none">
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
              <Button className="mt-7 cursor-pointer" type="submit">
                新規登録
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
