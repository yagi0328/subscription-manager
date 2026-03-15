"use server";

import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "./server";
import { revalidatePath } from "next/cache";
import { authSchema, changePasswordSchema, notificationEmailSchema } from "../validations/auth";

export type ActionStateType = {
  success: boolean;
  message?: string;
  error?: {
    email?: string[];
    password?: string[];
    new_password?: string[];
    confirm_password?: string[];
    notification_email?: string[];
    message?: string;
  };
};

export async function login(prevState: ActionStateType, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validate = authSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      error: validate.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      success: false,
      error: { message: "メールアドレスまたはパスワードが正しくありません" },
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(prevState: ActionStateType, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validate = authSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      error: validate.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        notification_email: data.email,
      },
    },
  });

  if (error) {
    console.error("Signup failed:", error);
    return {
      success: false,
      error: { message: `登録に失敗しました: ${error.message}` },
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// ---------------------------------------------
// Googleログイン
// ---------------------------------------------
export async function signInWithGoogle() {
  const supabase = await createClient();

  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) console.error("Google login error:", error.message);
  if (!error && url) redirect(url);
}

// ---------------------------------------------
// ログアウト
// ---------------------------------------------
export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    return false;
  }

  return true;
}

// ---------------------------------------------
// ユーザー削除
// ---------------------------------------------
export async function deleteUser(id: string) {
  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

  if (error) {
    console.error("User deletion failed:", error);
    throw new Error("ユーザーの削除に失敗しました。");
  }
}

export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return user;
}

// ---------------------------------------------
// パスワードリセットメール送信
// ---------------------------------------------
export async function sendPasswordResetEmail(prevState: ActionStateType, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  const validate = authSchema.shape.email.safeParse(email);

  if (!validate.success) {
    return {
      success: false,
      error: { email: validate.error.flatten().formErrors },
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/change-password`,
  });

  if (error) {
    console.error("Password reset email error:", error);
    return {
      success: false,
      error: { message: "メールの送信に失敗しました" },
    };
  }

  return {
    success: true,
    message: "パスワードリセット用のメールを送信しました",
  };
}

// ---------------------------------------------
// パスワード変更
// ---------------------------------------------
export async function changePassword(prevState: ActionStateType, formData: FormData) {
  const supabase = await createClient();

  const data = {
    new_password: formData.get("new_password") as string,
    confirm_password: formData.get("confirm_password") as string,
  };

  const validate = changePasswordSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      error: validate.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: data.new_password,
  });

  if (error) {
    console.error("Password change error:", error);
    return {
      success: false,
      error: { message: "パスワードの変更に失敗しました" },
    };
  }

  return {
    success: true,
    message: "パスワードを変更しました",
  };
}

// ---------------------------------------------
// 通知用メールアドレス変更
// ---------------------------------------------
export async function updateNotificationEmail(prevState: ActionStateType, formData: FormData) {
  const supabase = await createClient();

  const data = {
    notification_email: formData.get("notification_email") as string,
  };

  const validate = notificationEmailSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      error: validate.error.flatten().fieldErrors,
    };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      success: false,
      error: { message: "認証に失敗しました" },
    };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      notification_email: data.notification_email,
    },
  });

  if (updateError) {
    console.error("Notification email update failed:", updateError);
    return {
      success: false,
      error: { message: "更新に失敗しました" },
    };
  }

  return {
    success: true,
    message: "通知先メールアドレスを変更しました",
  };
}
