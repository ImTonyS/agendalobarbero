import NewBarberForm from "@/components/barberos/NewBarberForm";

const OnboardingBarberNewPage = () => {
  return (
    <main className="min-h-screen pt-20 pb-24 bg-white px-8 sm:px-6 ">
      <section className="max-w-xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Para continuar, por favor, llena los datos de tu barbero.
        </h2>
        <NewBarberForm />
      </section>
    </main>
  );
};

export default OnboardingBarberNewPage;
