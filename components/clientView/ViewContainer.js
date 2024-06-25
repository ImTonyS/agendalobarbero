"use client";
import Calendar from "@/components/Calendar";
import Logo from "@/public/images/logo.png";
import Image from "next/image";

export default function ViewContainer() {
  return (
    <>
      <main className="flex justify-center items-center mx-auto lg:h-screen bg-zinc-100 py-8 px-2 md:py-0 sm:px-6">
        <div className="flex flex-col w-full sm:border-2 sm:max-w-5xl rounded-3xl border-zinc-200 px-2 drop-shadow-md bg-white">
          <div className="flex items-center pt-6 px-6 gap-x-2">
            <Image src={Logo} width={40} height={40} alt="Logo" />
            <div>
              <h1 className="font-medium text-sm">AgendaloBarbero</h1>
              <p className="text-sm">Estás agendando cita para: RodStudio</p>
            </div>
          </div>

          <Calendar />
        </div>
      </main>
    </>
  );
}
