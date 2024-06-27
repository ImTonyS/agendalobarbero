import NewBarbershopForm from "@/components/barbershop/NewBarbershopForm";

const OnboardingBarbershopNewPage = () => {
  return (
    <main className="min-h-screen pt-20 pb-24 bg-white px-4 ">
      <section className="max-w-xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Para continuar, por favor, llena los datos de tu negocio.
        </h2>
        <NewBarbershopForm />
      </section>
    </main>
  );
};

export default OnboardingBarbershopNewPage;
