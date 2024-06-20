"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import BarCard from "../_components/BarCard";

export default function Barberos() {
  const [barberos, setBarberos] = useState(null);
  const router = useRouter();

  const fetchBarberos = async () => {
    try {
      toast.loading("Cargando...", { id: "123" });

      const response = await fetch("/api/onboarding", { method: "GET" });
      const data = await response.json();
      console.log(data);
      setBarberos(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss("123");
    }
  };

  useEffect(() => {
    fetchBarberos();
  }, []);

  return (
    <main className="max-w-3xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      {barberos && barberos.length === 0 ? (
        <>
          <div className="border-2 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  No tienes barberos
                </h3>
                <p></p>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <button //No se como redireccionar a la pagina de agregar barberos
                  onClick={() => {
                    router.push("/dashboard/barberos/new");
                  }}
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-barber-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Agregar barbero
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="border-2  bg-white px-4 py-5 sm:px-6">
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
                    router.push("/dashboard/barberos/new");
                  }}
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Agregar barberos
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2">
            {barberos &&
              barberos
                .filter((barbero) => barbero.activo)
                .map((barbero) => (
                  <ul className="border-2">
                    <BarCard
                      key={barbero.id}
                      name={barbero.nombre}
                      apellido={barbero.apellido}
                      email={barbero.email}
                      id={barbero.id}
                    ></BarCard>
                  </ul>
                ))}
          </div>
        </>
      )}
    </main>
  );
}
