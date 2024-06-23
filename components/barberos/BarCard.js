import { PhoneIcon } from "@heroicons/react/20/solid";

export default function BarCard({
  name,
  lastname,
  whatsapp,
  id,
  fetchBarbers,
}) {
  const handleBorrar = async (id) => {
    try {
      const response = await fetch(`/api/barber/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        fetchBarbers(); // Call the function to refresh the list of barbers
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {name} {lastname}
              </h3>
              <p className="text-sm text-gray-500">
                <a href={`https://wa.me/${whatsapp}`}>{whatsapp}</a>
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PhoneIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Llamar</span>
          </button>
          <button
            onClick={async () => {
              await handleBorrar(id);
            }}
            type="button"
            className="relative ml-3 inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm  ring-inset ring-gray-300 hover:bg-red-500"
          >
            <span>Borrar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
