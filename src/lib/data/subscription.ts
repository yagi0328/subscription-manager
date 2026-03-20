import { unstable_cache } from "next/cache";
import { prisma } from "../prisma";

export const getSubscriptions = unstable_cache(
  async (userId: string) => {
    return await prisma.subscription.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        user_id: true,
        name: true,
        amount: true,
        next_update: true,
        update_cycle_number: true,
        update_cycle_unit: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["subscriptions"],
  { tags: ["subscriptions"] },
);

export const getSubscription = unstable_cache(
  async (userId: string, id: string) => {
    return await prisma.subscription.findUnique({
      where: {
        id: id,
        user_id: userId,
      },
      select: {
        id: true,
        user_id: true,
        name: true,
        amount: true,
        next_update: true,
        update_cycle_number: true,
        update_cycle_unit: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  ["subscription"],
  { tags: ["subscriptions"] },
);
