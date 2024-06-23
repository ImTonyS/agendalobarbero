"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import BarCard from "@/components/barberos/BarCard";

export default function Barberos() {
  const [barbers, setBarbers] = useState([]);
  const router = useRouter();

  const fetchBarbers = async () => {
    try {
      toast.loading("Cargando...", { id: "123" });
      const response = await fetch("/api/barber", { method: "GET" });
      const data = await response.json();
      console.log(data.data);
      setBarbers(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss("123");
    }
  };

  useEffect(() => {
    // Use useEffect to call fetchBarbers
    fetchBarbers();
  }, []);

  return (
    <main className="max-w-3xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      <div className="  bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Barberos
            </h3>
            <p>Tus barberos disponibles</p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button //No se como redireccionar a la pagina de agregar barberos
              onClick={() => {
                router.push("/onboarding/barber/new");
              }}
              type="button"
              className="relative inline-flex items-center rounded-md bg-barber-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Agregar barberos
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2">
        {barbers.length > 0 &&
          barbers
            .filter((barber) => barber.active)
            .map((barber) => (
              <ul className=" mt-2" key={barber.id}>
                <BarCard
                  name={barber.name}
                  lastname={barber.lastname}
                  // Assuming whatsapp is an object, you might want to access a specific property
                  whatsapp={barber.whatsapp.numberFull} // Adjusted to use a specific field of the whatsapp object
                  id={barber.id}
                  fetchBarbers={fetchBarbers}
                ></BarCard>
              </ul>
            ))}
      </div>
    </main>
  );
}
