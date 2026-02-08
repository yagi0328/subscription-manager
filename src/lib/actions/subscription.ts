"use server";

import { UpdateCycleUnit } from "@/generated/prisma";
import { subcriptionSchema } from "../varidations/subscription";
import { prisma } from "../prisma";
import { requireAuth } from "../supabase/auth";
import {
  startOfDay,
  addDays,
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export type ActionStateType = {
  success: boolean;
  message?: string;
  error?: {
    name?: string[];
    amount?: string[];
    update_cycle_number?: string[];
    update_cycle_unit?: string[];
    next_update?: string[];
  };
};

export async function addSubscription(prevState: ActionStateType, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    amount: Number(formData.get("amount")),
    update_cycle_number: Number(formData.get("update_cycle_number")),
    update_cycle_unit: (formData.get("update_cycle_unit") as UpdateCycleUnit) || undefined,
    next_update: formData.get("next_update") as string,
  };

  const validationResult = subcriptionSchema.safeParse(data);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.flatten().fieldErrors };
  }

  const user = await requireAuth();
  const userId = user.id;

  const { name, amount, update_cycle_number, update_cycle_unit, next_update } =
    validationResult.data;

  await prisma.subscription.create({
    data: {
      user_id: userId,
      name,
      amount,
      update_cycle_number,
      update_cycle_unit,
      next_update,
    },
  });
  return { success: true };
}

export async function editSubscription(prevState: ActionStateType, formData: FormData) {
  const data = {
    id: formData.get("subscriptionId") as string,
    name: formData.get("name") as string,
    amount: Number(formData.get("amount")),
    update_cycle_number: Number(formData.get("update_cycle_number")),
    update_cycle_unit: (formData.get("update_cycle_unit") as UpdateCycleUnit) || undefined,
    next_update: formData.get("next_update") as string,
  };

  const validationResult = subcriptionSchema.safeParse(data);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.flatten().fieldErrors };
  }

  const user = await requireAuth();
  const userId = user.id;

  const { name, amount, update_cycle_number, update_cycle_unit, next_update } =
    validationResult.data;

  await prisma.subscription.update({
    where: {
      id: data.id,
    },
    data: {
      user_id: userId,
      name,
      amount,
      update_cycle_number,
      update_cycle_unit,
      next_update,
    },
  });
  return { success: true };
}

export async function updateSubscriptionDates(userId: string) {
  const today = startOfDay(new Date());

  const subscriptions = await prisma.subscription.findMany({
    where: {
      user_id: userId,
      next_update: { lt: today },
    },
  });

  for (const sub of subscriptions) {
    let nextUpdate = startOfDay(sub.next_update);
    let cyclesNeeded: number;

    switch (sub.update_cycle_unit) {
      case "DAY":
        const daysDiff = differenceInDays(today, nextUpdate);
        cyclesNeeded = Math.ceil(daysDiff / sub.update_cycle_number);
        nextUpdate = addDays(nextUpdate, cyclesNeeded * sub.update_cycle_number);
        break;
      case "MONTH":
        const monthsDiff = differenceInMonths(today, nextUpdate);
        cyclesNeeded = Math.ceil(monthsDiff / sub.update_cycle_number);
        nextUpdate = addMonths(nextUpdate, cyclesNeeded * sub.update_cycle_number);
        break;
      case "YEAR":
        const yearsDiff = differenceInYears(today, nextUpdate);
        cyclesNeeded = Math.ceil(yearsDiff / sub.update_cycle_number);
        nextUpdate = addYears(nextUpdate, cyclesNeeded * sub.update_cycle_number);
        break;
      default:
        const defaultMonthsDiff = differenceInMonths(today, nextUpdate);
        cyclesNeeded = Math.ceil(defaultMonthsDiff);
        nextUpdate = addMonths(nextUpdate, cyclesNeeded);
    }

    await prisma.subscription.update({
      where: { id: sub.id },
      data: { next_update: nextUpdate },
    });
  }
}

export async function deleteSubscription(id: string) {
  try {
    await prisma.subscription.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Subscription deletion failed:", error);
    throw new Error("削除に失敗しました。レコードが存在しない可能性があります。");
  }
}
