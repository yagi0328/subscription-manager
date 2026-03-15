import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Subscriptions } from "@/types/subscription";

export default function SubscriptionCount({ subscriptions }: Subscriptions) {
  return (
    <Card className=" pt-[17px] pb-[45px]">
      <CardHeader>
        <CardTitle className="font-medium">サブスク合計</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-right">
          <span className="text-2xl inline-block mr-[10px]">{subscriptions.length}</span>件
        </p>
      </CardContent>
    </Card>
  );
}
