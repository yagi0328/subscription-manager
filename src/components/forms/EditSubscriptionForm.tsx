"use client";

import React, { useActionState, useEffect } from "react";
import NextUpdateDatePicker from "@/components/forms/NextUpdateDatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ActionStateType, editSubscription } from "@/lib/actions/subscription";
import { Spinner } from "../ui/spinner";
import { Subscription } from "@/types/subscription";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  subscription: Subscription;
};

export default function EditSubscriptionForm({ subscription }: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionStateType, FormData>(
    editSubscription,
    {
      success: false,
    },
  );

  useEffect(() => {
    if (state.success) {
      toast.success("サブスクリプションを更新しました");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else if (state.message) {
      toast.error(state.message);
    } else if (state.error) {
      toast.error("更新に失敗しました");
    }
  }, [state, router]);

  return (
    <Card className="mt-8 pt-10 pb-12 max-md:mt-6 max-md:pt-6 max-md:pb-8">
      <CardContent className="px-12 max-md:px-6">
        <form action={formAction}>
          <div className="grid gap-2">
            <Label className="font-medium" htmlFor="name">
              サブスク名
            </Label>
            <Input
              className="bg-white"
              id="name"
              name="name"
              type="text"
              placeholder="Netflix"
              defaultValue={subscription.name}
            />
            {state.error?.name && <p className="text-red-500 text-sm">{state.error.name[0]}</p>}
          </div>
          <div className="grid gap-2 mt-5">
            <Label className="font-medium" htmlFor="amount">
              料金
            </Label>
            <Input
              className="bg-white"
              id="amount"
              name="amount"
              type="number"
              placeholder="1,000"
              defaultValue={subscription.amount}
            ></Input>
            {state.error?.amount && <p className="text-red-500 text-sm">{state.error.amount[0]}</p>}
          </div>
          <div className="flex justify-between mt-5">
            <div className="grid gap-2 w-[203px]">
              <Label className="font-medium" htmlFor="update_cycle_number">
                更新サイクル
              </Label>
              <Input
                className="bg-white"
                id="update_cycle_number"
                name="update_cycle_number"
                type="number"
                placeholder="1"
                defaultValue={subscription.update_cycle_number}
              ></Input>
              {state.error?.update_cycle_number && (
                <p className="text-red-500 text-sm">{state.error.update_cycle_number[0]}</p>
              )}
            </div>
            <div className="grid gap-2 w-[203px]">
              <Label className="font-medium" htmlFor="update_cycle_unit"></Label>
              <Select defaultValue={subscription.update_cycle_unit} name="update_cycle_unit">
                <SelectTrigger className="w-full bg-white mt-4 h-[40px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DAY">日</SelectItem>
                  <SelectItem value="MONTH">ヶ月</SelectItem>
                  <SelectItem value="YEAR">年</SelectItem>
                </SelectContent>
              </Select>
              {state.error?.update_cycle_unit && (
                <p className="text-red-500 text-sm">{state.error.update_cycle_unit[0]}</p>
              )}
            </div>
          </div>
          <NextUpdateDatePicker
            errors={state.error?.next_update}
            defaultDate={subscription.next_update}
          />
          <input type="hidden" name="subscriptionId" value={subscription.id} />
          <div className="flex justify-end mt-[46px] gap-x-4">
            <Button
              asChild
              variant="secondary"
              className="w-[102px] h-10 py-2 bg-gray border-1 border-solid border-black"
            >
              <Link href="/dashboard">キャンセル</Link>
            </Button>
            <Button type="submit" className="h-10" disabled={isPending}>
              {isPending && <Spinner />}
              保存
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
