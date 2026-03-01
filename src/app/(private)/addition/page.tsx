import AddSubscriptionForm from "@/components/forms/AddSubscriptionForm";

const AdditionPage = () => {
  return (
    <section className="pt-15 pb-7.5 px-30 max-md:py-12 max-md:px-6">
      <div className="max-w-[530px] mx-auto">
        <h2 className="text-xl font-extrabold">サブスク追加</h2>
        <AddSubscriptionForm />
      </div>
    </section>
  );
};

export default AdditionPage;
