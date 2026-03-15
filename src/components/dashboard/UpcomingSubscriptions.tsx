import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Subscriptions } from "@/types/subscription";
import { addWeeks, format, startOfDay } from "date-fns";

export default function UpcomingSubscriptions({ subscriptions }: Subscriptions) {
  const today = startOfDay(new Date());
  const oneWeekLater = addWeeks(today, 1);

  const upcomingSubscriptions = subscriptions
    .filter((subscription) => {
      if (subscription.next_update >= today && subscription.next_update <= oneWeekLater) {
        return subscription;
      }
    })
    .sort((a, b) => a.next_update.getTime() - b.next_update.getTime());

  return (
    <Card className="w-[calc((350/1456)*100%)] max-lg:w-full max-lg:mt-9.5 max-md:mt-4">
      <CardHeader>
        <CardTitle className="font-medium">更新予定のサブスク</CardTitle>
        <CardDescription>7日以内に更新予定</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-2 border-none">
              <TableHead className="text-xs text-[#868686]">サブスク名</TableHead>
              <TableHead className="text-xs text-[#868686] text-right">更新日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="block">
            {upcomingSubscriptions.map((subscription) => (
              <TableRow key={subscription.id} className="grid grid-cols-2 ">
                <TableCell>{subscription.name}</TableCell>
                <TableCell className="text-right">
                  <time dateTime={format(subscription.next_update, "yyyy/MM/dd")}>
                    {format(subscription.next_update, "yyyy/MM/dd")}
                  </time>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
