"use client";
import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import DottedButton from "./ButtonWrapper";
import Modal from "./Modal";
import { Input, SubmitButton } from "@/components/fields";
import { useForm } from "react-hook-form";
import apiClient from "@/libs/api";

function timeToMilliseconds(timeStr) {
  const [hours, minutes] = timeStr.split(":");
  return (parseInt(hours, 10) * 60 * 60 + parseInt(minutes, 10) * 60) * 1000;
}

function formatMilliseconds(milliseconds) {
  const date = new Date(milliseconds);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export default function List({ selected, userId, currentMonth }) {
  const [barberData, setBarberData] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [times, setTimes] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const startDay = startOfMonth(currentMonth);
  const endDay = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = userId.userId;

  const fetchBarberData = async () => {
    if (processing) return;
    setProcessing(true);
    try {
      const { data } = await apiClient.get(`/databarber/${user}`);
      setProcessing(false);

      setBarberData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchBarberData();
  }, [userId]);

  const fetchAppointments = async (barberId) => {
    try {
      const response = await fetch(`/api/appointment/${barberId}`, {
        method: "GET",
      });
      const data = await response.json();
      setAppointments(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAppointments(barberData.id);
  }, [barberData]);

  useEffect(() => {
    const newInitialTimes = [];

    if (barberData.length === 0) return;
    console.log("barberData", barberData);
    barberData.forEach((barber) => {
      days.forEach((day) => {
        barber.hours.forEach((hour) => {
          if (hour.day === format(day, "EEEE").toLowerCase()) {
            const start = timeToMilliseconds(hour.start);

            const end = timeToMilliseconds(hour.end);

            if (start > end) return null;
            for (let current = start; current <= end; current += 1800000) {
              // 30 minutes interval
              newInitialTimes.push({
                barberId: barber.id,
                day: format(day, "EEEE").toLowerCase(),
                dayMonth: format(day, "d MMMM uuuu"),
                appointment: current,
                status: true,
              });
            }
          }
        });
      });
    });

    setTimes(newInitialTimes);
  }, [barberData, selected]);

  const handleAppointClick = (selectedDay, selectedHour, barberId, data) => {
    console.log("Selected:", selectedDay, selectedHour, barberId, data);
    setIsModalOpen(true);
    try {
      console.log("Values:", data.name, data.lastname, data.whatsappNumber);

      fetch("/api/appointment", {
        method: "POST",
        body: JSON.stringify({
          barberId: barberId,
          day: format(selected, "EEEE").toLowerCase(),
          selectedDay: selected,
          appointment: selectedHour,
          name: data.name,
          lastname: data.lastname,
          whatsappNumber: data.whatsappNumber,
          //Texto
        }),
      });

      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }

    const updatedTimes = times.map((time) => {
      if (
        time.dayMonth.includes(selected) &&
        time.day.includes(selectedDay) &&
        time.appointment === selectedHour
      ) {
        console.log("Updating:", time);
        return { ...time, status: false };
      }
      return time;
    });

    setTimes(updatedTimes);
  };

  //**SUBMIT DATA
  const onSubmit = (formData) => {
    if (selectedTime) {
      handleAppointClick(
        selectedTime.day,
        selectedTime.appointment,
        selectedTime.barberId,
        formData
      );
    }
  };

  return (
    <>
      <section className="w-full flex flex-col items-center mx-auto mt-12 pb-8 md:mt-0 md:pl-14">
        <h2 className="self-start text-xl font-medium py-4 leading-6 text-gray-900">
          Escoge la hora:
        </h2>
        <ol className="flex flex-col items-center w-full h-10 py-3 space-y-3 text-sm leading-6 h-[20rem] overflow-y-auto">
          {times.map((time, idx) => {
            const isBooked = appointments?.some(
              (appointment) =>
                appointment.appointment === time.appointment &&
                time.dayMonth === appointment.selectedDay
            );

            const isPast = time.appointment < Date.now();

            const isAvailable = appointments?.some(
              (appointment) =>
                appointment.status === false && appointment.id !== time.barberId
            );

            if (
              time.dayMonth === selected &&
              !isBooked &&
              !isAvailable &&
              isPast &&
              time.status === true
            ) {
              return (
                <li key={idx} className="z-10 ">
                  <DottedButton
                    onClick={() => {
                      setSelectedTime(time);
                      setIsModalOpen(true);
                    }}
                  >
                    <p className="text-md font-bold">
                      {formatMilliseconds(time.appointment)}
                    </p>
                  </DottedButton>
                </li>
              );
            }
            return null;
          })}
        </ol>

        <Modal
          title="Agendar cita"
          advice="Por favor, llena los siguientes campos para agendar tu cita, tener cuidado con la hora seleccionada ya que no puede haber cambios."
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        >
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Barbershop name */}
            <div className="field my-3 flex flex-col sm:flex-row gap-x-10 gap-y-6">
              <div className="field flex ">
                <Input
                  label="Nombre"
                  name="name"
                  type="text"
                  placeholder="Ej: Antonio"
                  register={{
                    ...register("name", {
                      //Se puede optimizar esto
                      required: {
                        value: true,
                        message: "Tu nombre es requerido",
                      },
                    }),
                  }}
                  errorMessage={errors.name?.message}
                />
              </div>
              <div className="field flex">
                <Input
                  label="Apellido"
                  name="lastname"
                  type="text"
                  placeholder="Ej: Villaverde"
                  register={{
                    ...register("lastname", {
                      //Se puede optimizar esto
                      required: {
                        value: true,
                        message: "El nombre de tu barberia es requerido",
                      },
                    }),
                  }}
                  errorMessage={errors.lastname?.message}
                />
              </div>
              <div className="field flex">
                <Input
                  label="Numero de telefono"
                  name="whatsappNumber"
                  type="tel"
                  placeholder="Ej: 614-233-4322"
                  register={{
                    ...register("whatsappNumber", {
                      //Se puede optimizar esto
                      required: {
                        value: true,
                        message: "El numero de whatsapp es requerido",
                      },
                    }),
                  }}
                  errorMessage={errors.whatsappNumber?.message}
                />
              </div>
            </div>

            <SubmitButton isLoading={processing} text="Agendar" className />
          </form>
        </Modal>
      </section>
    </>
  );
}

// handleAppointClick(
//   time.day,
//   time.appointment,
//   time.barberId
// )
