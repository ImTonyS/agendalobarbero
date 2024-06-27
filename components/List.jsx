import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import DottedButton from "./ButtonWrapper";

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

  const startDay = startOfMonth(currentMonth);
  const endDay = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const user = userId.userId;

  const fetchBarberData = async () => {
    try {
      const response = await fetch(`/api/databarber/${user}`, {
        method: "GET",
      });
      const data = await response.json();
      setBarberData(data.barbers);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBarberData(userId);
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
    if (barberData.length > 0) {
      fetchAppointments(barberData[0].id);
    }
  }, [barberData]);

  useEffect(() => {
    const newInitialTimes = [];
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
  }, [barberData, currentMonth]);

  const handleAppointClick = (selectedDay, selectedHour, barberId) => {
    console.log(selected, selectedHour, barberId);

    try {
      fetch("/api/appointment", {
        method: "POST",
        body: JSON.stringify({
          barberId: barberId,
          day: format(selected, "EEEE").toLowerCase(),
          selectedDay: selected,
          appointment: selectedHour,
          status: false, //Texto
        }),
      });
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

  useEffect(() => {
    console.log(times);
  }, [selected]);

  return (
    <section className="w-full flex flex-col items-center mx-auto mt-12 pb-8 md:mt-0 md:pl-14">
      <h2 className="self-start text-xl font-medium py-4 leading-6 text-gray-900">
        Escoge la hora:
      </h2>
      <ol className="flex flex-col items-center w-full h-10 py-3 space-y-3 text-sm leading-6 h-[20rem] overflow-y-auto">
        {times.map((time, idx) => {
          const isBooked = appointments?.some(
            (appointment) =>
              appointment.appointment === time.appointment &&
              format(selected, "yyyy-MM-dd") ===
                format(new Date(appointment.selectedDay), "yyyy-MM-dd") &&
              appointment.barberId !== time.barberId
          );

          if (
            time.day === format(selected, "EEEE").toLowerCase() &&
            !isBooked &&
            time.status
          ) {
            return (
              <li key={idx}>
                <DottedButton
                  onClick={() => {
                    handleAppointClick(
                      time.day,
                      time.appointment,
                      time.barberId
                    );
                    fetchAppointments();
                  }}
                >
                  <p className="text-md font-medium">
                    {formatMilliseconds(time.appointment)}
                  </p>
                </DottedButton>
              </li>
            );
          }

          return null;
        })}
      </ol>
    </section>
  );
}
