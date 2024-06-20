import { PhoneIcon } from "@heroicons/react/20/solid";

export default function BarCard({ name, apellido, email, id }) {
  const handleBorrar = async (id) => {
    try {
      const response = await fetch(`/api/onboarding/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {name} {apellido}
              </h3>
              <p className="text-sm text-gray-500">
                <a href="#">{email}</a>
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
            onClick={() => handleBorrar(id)}
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
