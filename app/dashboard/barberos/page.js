"use client";

import { useState, useEffect } from "react";

import { toast } from "react-hot-toast";

export default function Barberos() {
  const [barberos, setBarberos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   const router = useRouter();
  useEffect(() => {
    const fetchBarberos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/onboarding", { method: "GET" });
        const data = await response.json();
        setBarberos(data);

        toast.success("Barberos traidos");
      } catch (error) {
        console.log(error);
        setBarberos([]);
        toast.error("error al traer barberos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBarberos();
  }, []);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <main className="max-w-3xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      {barberos && barberos.length !== 0 ? (
        <section className="flex justify-center items-center mx-auto h-screen">
          <div className="border-2 px-10 py-6">
            <div className="flex flex-col space-y-2 items-center justify-center max-w-3xl  bg-white px-4 py-5 sm:px-6">
              <h1 className="font-bold">No tienes barberos</h1>

              <button className="border-[1px] px-4 py-2 font-bold hover:bg-gray-200">
                Agregar uno
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="border-2 border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Job Postings
                </h3>
                <p></p>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <button //No se como redireccionar a la pagina de agregar barberos
                  //   onClick={() => {
                  //     router.push("/dashboard/barberos/new");
                  //   }}
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Agregar barberos
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 px-4">
            <ul>
              {barberos &&
                barberos.map((barbero) => (
                  <li key={barbero.id}>{barbero.nombre}</li>
                ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}