import ButtonAccount from "@/components/ButtonAccount";
import { authOptions } from "@/libs/next-auth";
import Barbershop from "@/models/Barbershop";
import { getServerSession } from "next-auth";
import connectMongo from "@/libs/mongoose";
import { redirect } from "next/navigation";
import Barber from "@/models/Barber";
import List from "@/components/fields/List";

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
    <main className="h-screen p-8 pb-2">
      <div className="flex justify-between items-center mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Inicio</h1>
        <div className="flex flex-col items-end">
          <h2 className="text-xl font-semibold">user. {session.user.name}</h2>
          <p className="text-lg font-medium">barber. {barbershop.name}</p>
          <p>agendalobarbero.me/{barbershop.slug}</p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-10  mx-auto max-w-4xl">
        <h1 className="text-lg font-semibold">Citas agendadas</h1>
        <List barber={barber} />
      </div>
    </main>
  );
}
