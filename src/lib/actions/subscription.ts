"use server";

import { UpdateCycleUnit } from "@/generated/prisma";
import { subcriptionSchema } from "../validations/subscription";
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
import { revalidatePath } from "next/cache";
import { map } from "zod";

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

async function parseAndValidate(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    amount: Number(formData.get("amount")),
    update_cycle_number: Number(formData.get("update_cycle_number")),
    update_cycle_unit: (formData.get("update_cycle_unit") as UpdateCycleUnit) || undefined,
    next_update: formData.get("next_update") as string,
  };

  const validationResult = subcriptionSchema.safeParse(data);
  if (!validationResult.success) {
    return { success: false as const, error: validationResult.error.flatten().fieldErrors };
  }

  const user = await requireAuth();
  return { success: true as const, data: validationResult.data, userId: user.id };
}

export async function addSubscription(prevState: ActionStateType, formData: FormData) {
  const result = await parseAndValidate(formData);
  if (!result.success) return result;
  try {
    await prisma.subscription.create({
      data: { user_id: result.userId, ...result.data },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "登録に失敗しました" };
  }
}

export async function editSubscription(prevState: ActionStateType, formData: FormData) {
  const id = formData.get("subscriptionId") as string;
  const result = await parseAndValidate(formData);
  if (!result.success) return result;

  try {
    await prisma.subscription.update({
      where: { id },
      data: { ...result.data },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "更新に失敗しました" };
  }
}

export async function updateSubscriptionDates(userId: string) {
  const today = startOfDay(new Date());

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        user_id: userId,
        next_update: { lt: today },
      },
    });

    await Promise.all(
      subscriptions.map((sub) => {
        let nextUpdate = startOfDay(sub.next_update);
        let cyclesNeeded: number;

        switch (sub.update_cycle_unit) {
          case "DAY": {
            const daysDiff = differenceInDays(today, nextUpdate);
            cyclesNeeded = Math.floor(daysDiff / sub.update_cycle_number) + 1;
            nextUpdate = addDays(nextUpdate, cyclesNeeded * sub.update_cycle_number);
            break;
          }
          case "MONTH": {
            const monthsDiff = differenceInMonths(today, nextUpdate);
            cyclesNeeded = Math.floor(monthsDiff / sub.update_cycle_number) + 1;
            nextUpdate = addMonths(nextUpdate, cyclesNeeded * sub.update_cycle_number);
            break;
          }
          case "YEAR": {
            const yearsDiff = differenceInYears(today, nextUpdate);
            cyclesNeeded = Math.floor(yearsDiff / sub.update_cycle_number) + 1;
            nextUpdate = addYears(nextUpdate, cyclesNeeded * sub.update_cycle_number);
            break;
          }
        }

        return prisma.subscription.update({
          where: { id: sub.id },
          data: { next_update: nextUpdate },
        });
      }),
    );
  } catch (error) {
    console.error("日付更新に失敗しました:", error);
  }
}

export async function deleteSubscription(id: string, userId: string) {
  try {
    await prisma.subscription.delete({
      where: {
        user_id: userId,
        id,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Subscription deletion failed:", error);
    throw new Error("削除に失敗しました。");
  }
}
