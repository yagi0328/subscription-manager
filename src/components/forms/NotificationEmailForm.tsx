"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionStateType, updateNotificationEmail } from "@/lib/supabase/auth";
import { useActionState, useEffect } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const NotificationEmailForm = () => {
  const [state, formAction, isPending] = useActionState<ActionStateType, FormData>(
    updateNotificationEmail,
    {
      success: false,
    },
  );

  useEffect(() => {
    if (state.success) {
      toast.success("通知用メールアドレスを更新しました");
    } else if (state.error) {
      toast.error("更新に失敗しました");
    }
  }, [state]);
  return (
    <Card className="mt-8 max-md:mt-6">
      <CardContent>
        <form action={formAction}>
          <div className="max-w-[384px] mx-auto">
            <div className="grid gap-2">
              <Label className="font-medium" htmlFor="email">
                メールアドレス
              </Label>
              <Input
                className="bg-white"
                id="notification_email"
                name="notification_email"
                type="email"
                placeholder="Email"
              />
              {state.error?.notification_email ? (
                <p className="text-red-500">{state.error.notification_email[0]}</p>
              ) : (
                <CardDescription className="text-sm">
                  メールアドレスを入力してください
                </CardDescription>
              )}
            </div>
            <Button className="mt-5 cursor-pointer" type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              通知先メールアドレスを変更
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NotificationEmailForm;
