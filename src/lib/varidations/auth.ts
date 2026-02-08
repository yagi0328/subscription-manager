import z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .email({ message: "有効なメールアドレスを入力してください" }),

  password: z
    .string()
    .min(1, { message: "パスワードは必須です" })
    .min(6, { message: "パスワードは6文字以上である必要があります" }),
});

export const notificationEmailSchema = z.object({
  notification_email: z
    .string()
    .min(1, { message: "通知先メールアドレスは必須です" })
    .email({ message: "有効なメールアドレスを入力してください" }),
});

export const changePasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(1, { message: "新しいパスワードは必須です" })
      .min(6, { message: "新しいパスワードは6文字以上である必要があります" }),
    confirm_password: z
      .string()
      .min(1, { message: "確認用パスワードは必須です" })
      .min(6, { message: "確認用パスワードは6文字以上である必要があります" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "新しいパスワードと確認用パスワードが一致しません",
    path: ["confirm_password"],
  });

export type authFormValues = z.infer<typeof authSchema>;
export type notificationEmailFormValues = z.infer<typeof notificationEmailSchema>;
export type changePasswordFormValues = z.infer<typeof changePasswordSchema>;
