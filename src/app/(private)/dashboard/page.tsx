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

const DashboardPage = async () => {
  const user = await requireAuth();
  const userId = user.id;
  await updateSubscriptionDates(userId);
  const subscriptions = await getSubscriptions(userId);

  return (
    <section className="pt-15 pb-7.5 px-12">
      <div className="max-w-[1456px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-[9px]">
            <figure className="w-[25px]">
              <Image
                src="/icn-dashboard.svg"
                width={25}
                height={21}
                alt="ダッシュボードのアイコン"
              />
            </figure>
            <h2 className="text-[20px] font-bold">新規登録</h2>
          </div>
          <Button asChild>
            <Link href="/addition">
              <Plus />
              サブスクを追加
            </Link>
          </Button>
        </div>
        <div className="flex justify-between mt-[35px]">
          <div className="w-[calc((1050/1456)*100%)]">
            <div className="grid grid-cols-3 gap-x-8.5">
              <MonthlyTotal subscriptions={subscriptions} />
              <YearlyTotal subscriptions={subscriptions} />
              <SubscriptionCount subscriptions={subscriptions} />
            </div>
            <SubscriptionList subscriptions={subscriptions} />
          </div>
          <UpcomingSubscriptions subscriptions={subscriptions} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
