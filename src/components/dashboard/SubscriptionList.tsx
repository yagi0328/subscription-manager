"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Link from "next/link";
import Image from "next/image";
import { Subscriptions } from "@/types/subscription";
import { format } from "date-fns";
import { deleteSubscription } from "@/lib/actions/subscription";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = Subscriptions & { userId: string };

export default function SubscriptionList({ subscriptions, userId }: Props) {
  const router = useRouter();
  const handleDelete = async (id: string, userId: string) => {
    try {
      await deleteSubscription(id, userId);
      router.refresh();
    } catch (error) {
      toast.error("サブスクリプションの削除に失敗しました");
      console.error(error);
    }
  };

  return (
    <Card className="mt-9.5 max-md:mt-4">
      <CardHeader>
        <CardTitle className="font-medium">サブスク一覧</CardTitle>
        <CardDescription>追加済みのサブスク一覧</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-[repeat(4,minmax(0,1fr))_24%] border-none max-lg:grid-cols-4 max-sm:grid-cols-[46%_30%_24%]">
              <TableHead className="text-xs text-[#868686]">サブスク名</TableHead>
              <TableHead className="text-xs text-[#868686] max-sm:hidden">料金</TableHead>
              <TableHead className="text-xs text-[#211b1b] max-lg:hidden">更新サイクル</TableHead>
              <TableHead className="text-xs text-[#868686]">次回更新日</TableHead>
              <TableHead className="text-xs text-[#868686]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="block">
            {subscriptions.map((subscription) => (
              <TableRow
                key={subscription.id}
                className="grid grid-cols-[repeat(4,minmax(0,1fr))_24%] max-lg:grid-cols-4 max-sm:grid-cols-[46%_30%_24%]"
              >
                <TableCell className="whitespace-break-spaces">{subscription.name}</TableCell>
                <TableCell className="max-sm:hidden">{subscription.amount} 円</TableCell>
                <TableCell className="max-lg:hidden">
                  {subscription.update_cycle_number}
                  {subscription.update_cycle_unit === "DAY" && "日"}
                  {subscription.update_cycle_unit === "MONTH" && "ヶ月"}
                  {subscription.update_cycle_unit === "YEAR" && "年"}
                  ごと
                </TableCell>
                <TableCell>{format(subscription.next_update, "yyyy/MM/dd")}</TableCell>
                <TableCell className="flex justify-end items-center gap-x-[13px] max-sm:gap-x-2.5">
                  <figure className="w-[15px]">
                    <Link href={`/edit/${subscription.id}`}>
                      <Image src="/icn-edit.svg" width={15} height={15} alt="編集のアイコン" />
                    </Link>
                  </figure>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="w-[14px]">
                        <Image
                          src="/icn-delete.svg"
                          width={14}
                          height={16}
                          alt="ゴミ箱のアイコン"
                        />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                        <AlertDialogDescription>
                          サブスクリプションを削除します。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(subscription.id, userId)}>
                          削除
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
