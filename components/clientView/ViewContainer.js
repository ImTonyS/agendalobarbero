"use client";
import Calendar from "@/components/Calendar";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import Icons from "@/components/hero/OrbitingCirclesDemo";
import Link from "next/link";

export default function ViewContainer({ barberId }) {
  const [data, setData] = useState(null);

  const fetchBarber = async () => {
    //Trae la data de un barbero
    try {
      const response = await fetch(`/api/getonebarber/${barberId}`, {
        method: "GET",
      });
      const data = await response.json();

      setData(data.barber); //Guarda en data
    } catch (e) {
      console.log(e);
    }

    useEffect(() => {
      fetchBarber();
    }, [barberId]);
  };

  return (
    <>
      <main className="flex justify-center items-center mx-auto bg-zinc-100 md:py-4 lg:h-screen lg:py-0 sm:px-6">
        <div className="flex flex-col w-full sm:border-2 sm:max-w-5xl rounded-3xl border-zinc-200 px-2 drop-shadow-md bg-white">
          <div className="flex flex-col gap-y-4 sm:flex-row sm:justify-between justify-start items-start py-6 px-6">
            <div className="flex gap-x-4 items-center">
              <Image src={Logo} width={50} height={50} alt="Logo" />
              <div className="flex-1">
                <h1 className="font-medium text-sm">AgendaloBarbero</h1>
                <p className="text-sm">
                  Estás agendando cita para: {data?.name}
                </p>
              </div>
            </div>
            <Link
              href={`https://wa.me/${data?.whatsapp.fullNumber}`}
              className=" flex items-center gap-x-2 border-[2px] border-[#23b33a] px-4 py-1 rounded-xl "
            >
              <h1 className="text-[#23b33a] text-sm font-semibold">
                Enviar mensaje{" "}
              </h1>
              <Icons.whatsapp width={30} />
            </Link>
          </div>

          {data?.userId && <Calendar userId={data?.userId} />}
          {/* Manda el userId a Calendar */}
        </div>
      </main>
    </>
  );
}
