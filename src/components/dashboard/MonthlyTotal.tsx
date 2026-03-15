import { endOfMonth, getDaysInMonth, startOfMonth } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Subscriptions } from "@/types/subscription";

export default function MonthlyTotal({ subscriptions }: Subscriptions) {
  const today = new Date();
  const startMonth = startOfMonth(today);
  const endMonth = endOfMonth(today);
  const days = getDaysInMonth(today);

  const total = subscriptions.reduce((sum, subscription) => {
    if (subscription.next_update >= startMonth && subscription.next_update <= endMonth) {
      if (subscription.update_cycle_unit === "DAY") {
        const cycleCount = days / subscription.update_cycle_number;
        return sum + subscription.amount * cycleCount;
      }
      return sum + subscription.amount;
    }
    return sum;
  }, 0);
  return (
    <Card className=" pt-[17px] pb-[45px]">
      <CardHeader>
        <CardTitle className="font-medium">月間合計</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-right">
          <span className="text-2xl inline-block mr-[10px]">{total}</span>円
        </p>
      </CardContent>
    </Card>
  );
}
