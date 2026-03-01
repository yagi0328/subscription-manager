import EditSubscriptionForm from "@/components/forms/EditSubscriptionForm";
import { getSubscription } from "@/lib/data/subscription";
import { requireAuth } from "@/lib/supabase/auth";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: Params) {
  const user = await requireAuth();
  const userId = user.id;
  const { id } = await params;

  const subscription = await getSubscription(userId, id);

  if (!subscription) {
    notFound();
  }

  return (
    <section className="pt-15 pb-7.5 px-30 max-md:py-12 max-md:px-6">
      <div className="max-w-[530px] mx-auto">
        <h2 className="text-xl font-extrabold">サブスク編集</h2>
        <EditSubscriptionForm subscription={subscription} />
      </div>
    </section>
  );
}
