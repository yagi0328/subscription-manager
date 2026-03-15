import React from "react";
import Image from "next/image";
import SubscriptionList from "@/components/dashboard/SubscriptionList";
import { getSubscriptions } from "@/lib/data/subscription";
import MonthlyTotal from "@/components/dashboard/MonthlyTotal";
import YearlyTotal from "@/components/dashboard/YearlyTotal";
import SubscriptionCount from "@/components/dashboard/SubscriptionCount";
import UpcomingSubscriptions from "@/components/dashboard/UpcomingSubscriptions";
import { requireAuth } from "@/lib/supabase/auth";
import { updateSubscriptionDates } from "@/lib/actions/subscription";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const user = await requireAuth();
  const userId = user.id;
  await updateSubscriptionDates(userId);
  const subscriptions = await getSubscriptions(userId);

  return (
    <section className="pt-15 pb-7.5 px-12 max-md:py-12  max-md:px-6">
      <div className="max-w-[1456px] mx-auto">
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start">
          <div className="flex items-center gap-x-[9px]">
            <figure className="w-[25px] max-md:w-8">
              <Image
                className="w-full"
                src="/icn-dashboard.svg"
                width={25}
                height={21}
                alt="ダッシュボードのアイコン"
              />
            </figure>
            <h2 className="text-[20px] font-bold max-md:text-3xl">新規登録</h2>
          </div>
          <Button className="max-md:mt-4.5" asChild>
            <Link href="/addition">
              <Plus />
              サブスクを追加
            </Link>
          </Button>
        </div>
        <div className="flex justify-between mt-[35px] max-lg:flex-col max-lg:max-w-[750px] max-lg:mx-auto">
          <div className="w-[calc((1050/1456)*100%)] max-lg:w-full">
            <div className="grid grid-cols-3 gap-x-8.5 max-md:grid-cols-1 max-md:gap-y-4">
              <MonthlyTotal subscriptions={subscriptions} />
              <YearlyTotal subscriptions={subscriptions} />
              <SubscriptionCount subscriptions={subscriptions} />
            </div>
            <SubscriptionList subscriptions={subscriptions} userId={userId} />
          </div>
          <UpcomingSubscriptions subscriptions={subscriptions} />
        </div>
      </div>
    </section>
  );
}
