"use client";
import Logo from "@/public/images/logo.png";
import Image from "next/image";

import { useState, useEffect } from "react";
import BarberBar from "./BarberBar";
import apiClient from "@/libs/api";

export default function ServiceContainer({ slug }) {
  const [data, setData] = useState(null);
  const [barbers, setBarbers] = useState(null);

  const fetchBarbershop = async () => {
    try {
      const response = await fetch(`/api/data/${slug}`, {
        method: "GET",
      });

      const data = await response.json();
      setData(data.data);
      console.log(data.data.userId);

      fetchBarbers(data.data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBarbers = async (userId) => {
    try {
      const { data } = await apiClient.get(`/databarber/${userId}`);

      setBarbers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBarbershop();
  }, []);

  return (
    <>
      <main className="flex justify-center items-center mx-auto bg-zinc-100 md:py-4 sm:h-screen lg:py-0 sm:px-6">
        <div className="flex  py-10 w-full sm:border-2 sm:max-w-5xl rounded-3xl h-screen sm:h-auto border-zinc-200 px-10 drop-shadow-md bg-white">
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-2 items-center">
              <Image src={Logo} width={36} height={36} alt="Logo" />
              <h1 className="text-md font-medium">AgendaloBarbero</h1>
            </div>
            <h1 className="text-3xl font-semibold">
              Bienvenido a <span className="text-barber-red">{data?.name}</span>
            </h1>
            <h2 className="text-xl font-semibold">Escoge tu barbero: </h2>
            <div>
              {barbers?.map((barber) => {
                return (
                  <BarberBar
                    key={barber.id}
                    slug={slug}
                    name={barber.name}
                    barberId={barber.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
