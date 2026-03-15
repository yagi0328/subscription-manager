import { endOfYear, getDaysInYear, startOfYear } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Subscriptions } from "@/types/subscription";

export default function YearlyTotal({ subscriptions }: Subscriptions) {
  const today = new Date();
  const startYear = startOfYear(today);
  const endYear = endOfYear(today);
  const days = getDaysInYear(today);

  const total = subscriptions.reduce((sum, subscription) => {
    if (startYear <= subscription.next_update && endYear >= subscription.next_update) {
      if (subscription.update_cycle_unit === "DAY") {
        const cycleCount = days / subscription.update_cycle_number;
        return sum + subscription.amount * cycleCount;
      } else if (subscription.update_cycle_unit === "MONTH") {
        const cycleCount = 12 / subscription.update_cycle_number;
        return sum + subscription.amount * cycleCount;
      } else {
        return sum + subscription.amount;
      }
    }
    return sum;
  }, 0);

  return (
    <Card className=" pt-[17px] pb-[45px]">
      <CardHeader>
        <CardTitle className="font-medium">年間合計</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-right">
          <span className="text-2xl inline-block mr-[10px]">{total}</span>円
        </p>
      </CardContent>
    </Card>
  );
}
