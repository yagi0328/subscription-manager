"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionStateType, sendPasswordResetEmail } from "@/lib/supabase/auth";
import { useActionState, useEffect } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [state, formAction, isPending] = useActionState<ActionStateType, FormData>(
    sendPasswordResetEmail,
    {
      success: false,
    },
  );

  useEffect(() => {
    if (state.success) {
      toast.success("パスワードリセットメールを送信しました。");
    }
  }, [state]);

  return (
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
                  登録済みのメールアドレスを入力してください
                </CardDescription>
              )}
              {state.error?.message && <p className="text-red-500">{state.error.message}</p>}
            </div>
            <Button className="mt-5 cursor-pointer" type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              パスワードリセットメールを送信
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
