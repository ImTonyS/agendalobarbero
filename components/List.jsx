import DottedButton from "./ButtonWrapper";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { useEffect, useState } from "react";

function timeToMilliseconds(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return (hours * 60 * 60 + minutes * 60) * 1000;
}

function formatMilliseconds(ms) {
  const hours = Math.floor(ms / 3600000); // Convert milliseconds to hours
  const minutes = Math.floor((ms % 3600000) / 60000); // Convert remainder to minutes

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

//TODO: Necesito el currentmonth para poder mapearlo o sacar la fecha del selected ahi
export default function List({ selected, currentMonth }) {
  const start = timeToMilliseconds("10:00");
  const end = timeToMilliseconds("13:00");

  const [times, setTimes] = useState([]);

  useEffect(() => {
    const startDay = startOfMonth(currentMonth);
    const endDay = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: startDay, end: endDay });
    let initialTimes = [];

    days.forEach((day) => {
      for (let current = start; current <= end; current += 1800000) {
        // 30 minutes interval
        initialTimes.push({
          day: format(day, "d MMMM uuuu"),
          appointment: current,
          status: true,
        });
      }
    });

    setTimes(initialTimes); // Initialize times state
  }, [currentMonth]); // Dependency array to re-calculate times on month change

  const handleAppointClick = (selectedDay, selectedHour) => {
    const updatedTimes = times.map((time) => {
      if (time.day.includes(selectedDay) && time.appointment === selectedHour) {
        console.log("Updating:", time);
        return { ...time, status: false };
      }
      return time;
    });

    setTimes(updatedTimes);
  };

  times.map((time) => {
    console.log(time);
  });
  return (
    <section className="w-full flex flex-col items-center mx-auto mt-12 md:mt-0 md:pl-14">
      <h2 className=" self-start text-xl font-medium py-4 leading-6 text-gray-900">
        Escoge la hora:
      </h2>
      <ol className="flex flex-col items-center w-full mt-3 space-y-3 text-sm leading-6">
        {times.map(
          (time, idx) =>
            selected === time.day &&
            time.status && (
              <li key={idx}>
                <DottedButton
                  onClick={() => {
                    handleAppointClick(time.day, time.appointment);
                  }}
                >
                  <p className="text-md font-medium">
                    {formatMilliseconds(time.appointment)}
                  </p>
                </DottedButton>
              </li>
            )
        )}
      </ol>
    </section>
  );
}
