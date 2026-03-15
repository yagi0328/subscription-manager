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

export default async function AccountPage() {
  const user = await requireAuth();
  const userId = user.id;
  return (
    <section className="pt-15 pb-7.5 px-30 max-md:py-12 max-md:px-6">
      <div className="max-w-[853px] mx-auto">
        <div className="flex items-center gap-x-3.5">
          <figure>
            <Image src="/icn-person.svg" width={21} height={22} alt="" />
          </figure>
          <h2 className="text-xl font-extrabold">アカウント情報</h2>
        </div>
        <Card className="mt-8 pt-10 pb-[65px] px-12 border-2 max-md:mt-6 max-md:max-w-[600px] max-md:mx-auto max-md:pt-6 max-md:pb-8 max-md:px-0">
          <CardContent>
            <Table>
              <TableHeader className="max-md:hidden">
                <TableRow className="border-none">
                  <TableHead className="text-xs text-[#868686]">メールアドレス</TableHead>
                  <TableHead className="text-xs text-[#868686]">パスワード</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="grid-cols-2 !border-b border-solid border-border max-md:flex max-md:flex-col max-md:border-none">
                  <TableCell className="pt-0 max-md:py-2 max-md:border-b max-md:border-solid max-md:border-border max-md:w-fit">
                    <span className="hidden max-md:block text-xs text-[#868686] mb-0.5">
                      メールアドレス
                    </span>
                    {user.email}
                  </TableCell>
                  <TableCell className="pt-0 max-md:py-2 max-md:border-b max-md:border-solid max-md:border-border max-md:w-fit max-md:last-of-type:pt-5">
                    <span className="hidden max-md:block text-xs text-[#868686] mb-0.5">
                      パスワード
                    </span>
                    ＊＊＊＊＊＊＊＊＊
                  </TableCell>
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
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-10 max-md:mt-7">
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
}
