import ButtonAccount from "@/components/ButtonAccount";
import { authOptions } from "@/libs/next-auth";
import Barbershop from "@/models/Barbershop";
import { getServerSession } from "next-auth";
import connectMongo from "@/libs/mongoose";
import { redirect } from "next/navigation";
import Barber from "@/models/Barber";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  await connectMongo();
  const session = await getServerSession(authOptions);
  const barbershop = await Barbershop.findOne({ userId: session.user.id });
  const barber = await Barber.findOne({ userId: session.user.id });
  // If the user is not a barbershop, redirect to the onboarding page
  if (!barbershop) redirect("/onboarding/barbershop/new");
  if (!barber) redirect("/onboarding/barber/new");

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
      </section>
    </main>
  );
}
