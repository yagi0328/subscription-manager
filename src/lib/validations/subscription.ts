import { UpdateCycleUnit } from "@/generated/prisma";
import z from "zod";

export const subcriptionSchema = z.object({
  name: z.string().min(1, { message: "サブスク名を入力して下さい" }),
  amount: z.number().min(1, { message: "金額を入力して下さい" }),
  update_cycle_number: z.number().min(1, { message: "1以上の数値を入力してください" }),
  update_cycle_unit: z.nativeEnum(UpdateCycleUnit, {
    required_error: "選択してください",
  }),
  next_update: z
.string()
    .min(1, { message: "次回更新日を選択してください" })
    .transform((val) => new Date(val)),
});
