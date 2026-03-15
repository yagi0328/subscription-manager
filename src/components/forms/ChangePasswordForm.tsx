"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionStateType, changePassword } from "@/lib/supabase/auth";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState<ActionStateType, FormData>(changePassword, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success("パスワードを変更しました。");
    }
  }, [state]);
  return (
    <Card className="mt-4">
      <CardContent>
        <form action={formAction}>
          <div className="max-w-[384px] mx-auto">
            <div className="grid gap-2 mt-5">
              <Label className="font-medium" htmlFor="new_password">
                新しいパスワード
              </Label>
              <Input className="bg-white" id="new_password" name="new_password" type="password" />
              {state.error?.new_password ? (
                <p className="text-red-500">{state.error.new_password[0]}</p>
              ) : (
                <CardDescription className="text-sm">
                  新しいパスワードを入力してください
                </CardDescription>
              )}
            </div>
            <div className="grid gap-2 mt-5">
              <Label className="font-medium" htmlFor="confirm_password">
                新しいパスワード（確認）
              </Label>
              <Input
                className="bg-white"
                id="confirm_password"
                name="confirm_password"
                type="password"
              />
              {state.error?.confirm_password ? (
                <p className="text-red-500">{state.error.confirm_password[0]}</p>
              ) : (
                <CardDescription className="text-sm">
                  もう一度新しいパスワードを入力してください
                </CardDescription>
              )}
              {state.error?.message && <p className="text-red-500">{state.error.message}</p>}
            </div>
            <Button className="mt-5 cursor-pointer" type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              パスワードを変更
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
