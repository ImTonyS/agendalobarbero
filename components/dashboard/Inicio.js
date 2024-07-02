import List from "../fields/List";
import Image from "next/image";
import iconBarber from "@/public/images/iconBarber.png";
import CopyButton from "../fields/CopyButton";
export const dynamic = "force-dynamic";

export default function Inicio({ barbershop, barber }) {
  return (
    <main className="h-screen p-8 pb-2 mx-auto max-w-4xl">
      <div className="flex flex-col  gap-y-3">
        <h1 className="text-3xl font-bold">Inicio</h1>

        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <Image src={iconBarber} width={24} height={24} alt="Icon Barber" />
            <p className="text-lg font-medium">{barber.name}</p>
          </div>
          <CopyButton slug={barbershop.slug} />
        </div>
      </div>

      <div className="flex flex-col items-start mt-10 mx-auto max-w-4xl">
        <h1 className="text-2xl text-barber-red font-bold">CITAS AGENDADAS</h1>
        <List barber={barber} />
      </div>
    </main>
  );
}
