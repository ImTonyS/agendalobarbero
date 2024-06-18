"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function New() {
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apellido, setApellido] = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault();

    setLoading(true);
    try {
      const formData = {
        nombre: name,
        apellido: apellido,
        email: email,
      };
      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Barbero creado correctamente");
        setLoading(false);
      } else {
        toast.error("error");
      }
    } catch (error) {
      toast.error("Error al crear el barbero");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (Loading) return <div>Loading...</div>;

  return (
    <main className=" py-10 bg-white">
      <div className="max-w-3xl p-4 mx-auto border-2 border-gray-900/10">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Información del barbero
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Ingresa la información personal del barbero
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        >
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombre
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="Apellido"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Apellido
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="apellido"
                id="apellido"
                onChange={(e) => setApellido(e.target.value)}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button type="submit" className="border-2 px-4 py-2">
            Listo
          </button>
        </form>
      </div>
    </main>
  );
}
