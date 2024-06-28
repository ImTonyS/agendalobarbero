const items = [
  { id: 1 },
  { id: 2 },
  // More items...
];
import connectMongo from "@/libs/mongoose";
import Appointment from "@/models/Appointment";
import { formatMilliseconds } from "@/libs/utils";

export default async function List({ barber }) {
  await connectMongo();
  const appointments = await Appointment.find({ barberId: barber.id });
  console.log(appointments);

  return (
    <ul role="list" className="divide-y divide-gray-200">
      <div className="flex gap-x-16 items-center justify-between mt-10 mb-2">
        <p className="text-sm font-medium text-gray-900">Nombre</p>
        <p className="text-sm text-gray-500">Apellido</p>
        <p className="text-sm text-gray-500">Fecha de la cita</p>
        <p className="text-sm text-gray-500">Hora de la cita</p>
        <p className="text-sm text-gray-500">Numero de telefono</p>
        <p className="text-sm text-gray-500">Estado</p>
      </div>
      {appointments.map((appointment) => (
        <li key={appointment.id} className="px-2 py-4 sm:px-0">
          <div className="flex gap-x-2">
            <div className="flex gap-x-16 items-center justify-between ">
              <p className="text-sm font-medium text-gray-900">Nombre</p>
              <p className="text-sm text-gray-500">Apellido</p>
              <p className="text-sm text-gray-500">{appointment.selectedDay}</p>
              <p className="text-sm text-gray-500">
                {formatMilliseconds(appointment.appointment)}
              </p>
              <p className="text-sm text-gray-500">Numero de telefono</p>
              <p className="text-sm text-gray-500">{appointment.status}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
