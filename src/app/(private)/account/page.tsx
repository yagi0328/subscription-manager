import { Button } from "@/components/ui/button";
import DeleteUserBtn from "@/components/ui/buttons/DeleteUserBtn";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAuth } from "@/lib/supabase/auth";
import Image from "next/image";
import Link from "next/link";

const AccountPage = async () => {
  const user = await requireAuth();
  const userId = user.id;
  return (
    <section className="pt-15 pb-7.5 px-30">
      <div className="max-w-[853px] mx-auto">
        <div className="flex items-center gap-x-3.5">
          <figure>
            <Image src="/icn-person.svg" width={21} height={22} alt="" />
          </figure>
          <h2 className="text-xl font-extrabold">アカウント情報</h2>
        </div>
        <Card className="mt-8 pt-10 pb-[65px] px-12 border-2">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-none">
                  <TableHead className="text-xs text-[#868686]">メールアドレス</TableHead>
                  <TableHead className="text-xs text-[#868686]">パスワード</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="grid-cols-2 !border-b border-solid border-border">
                  <TableCell className="pt-0">{user.email}</TableCell>
                  <TableCell className="pt-0">＊＊＊＊＊＊＊＊＊</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table className="w-[50%] mt-2.5">
              <TableHeader>
                <TableRow className="border-none">
                  <TableHead className="text-xs text-[#868686]">通知用メールアドレス</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="grid-cols-2 !border-b border-solid border-border">
                  <TableCell className="pt-0">{user.user_metadata?.notification_email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex items-center gap-x-4 mt-10">
              <Button asChild className="bg-gray text-primary border border-primary hover:bg-gray">
                <Link href="/account/notification-email">通知先メールアドレスを変更</Link>
              </Button>
              <DeleteUserBtn userId={userId} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AccountPage;
