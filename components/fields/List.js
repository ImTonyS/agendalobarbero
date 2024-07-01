import connectMongo from "@/libs/mongoose";
import Appointment from "@/models/Appointment";
import { formatMilliseconds } from "@/libs/utils";
import { format } from "date-fns";
import checkIcon from "@/public/images/checkIcon.png";
import Image from "next/image";

const parameters = [
  "Nombre",
  "Apellido",
  "Fecha",
  "Hora",
  "Telefono",
  "Estado",
  "Confirmar / Cancelar",
];

export default async function List({ barber }) {
  await connectMongo();
  const appointments = await Appointment.find({ barberId: barber.id });

  const handleCheck = (id) => {
    const appointment = appointments.find(
      (appointment) => appointment.id === id
    );
    if (appointment.status === "Pendiente") {
      appointment.status = "Confirmada";
    } else {
      appointment.status = "Pendiente";
    }
    appointment.save();
  };

  const handleCancel = (id) => {
    const appointment = appointments.find(
      (appointment) => appointment.id === id
    );
    if (appointment.status === "Pendiente") {
      appointment.status = "Cancelada";
    } else {
      appointment.status = "Pendiente";
    }
    appointment.save();
  };

  return (
    <>
      <ul role="list" className="divide-y divide-gray-200">
        <div className="grid grid-cols-7 gap-x-6 items-center mt-10 mb-2 [div>p]:self-center">
          {parameters.map((parameter, idx) => (
            <p key={idx} className="text-sm font-medium text-gray-900">
              {parameter}
            </p>
          ))}
        </div>
        {appointments.map(
          (appointment) =>
            appointment.status === "Pendiente" && (
              <li key={appointment.id} className="px-2 py-3 sm:px-0">
                <div className="grid grid-cols-7 gap-x-6 items-center mt-1 mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.name}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.lastname}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(appointment.selectedDay, "EEE - dd/MM")}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatMilliseconds(appointment.appointment)}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.whatsappNumber}
                  </p>
                  <p className="text-sm font-medium text-[#FFCC00] drop-shadow-sm">
                    {appointment.status}
                  </p>
                  <div className="flex gap-x-4">
                    <button
                      className="p-2 rounded-full bg-[#32CD32] drop-shadow-sm"
                      onClick={handleCheck(appointment.id)}
                    >
                      <Image
                        src={checkIcon}
                        width={24}
                        height={24}
                        alt="check icon"
                      />
                    </button>
                    <button
                      className="p-2 rounded-full bg-barber-red drop-shadow-sm"
                      onClick={handleCancel(appointment.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="white"
                        className="w-6 h-6"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </>
  );
}
