import moment from "moment";
import DottedButton from "./ButtonWrapper";
import { format } from "date-fns";

const meetings = [
  {
    id: 1,
    day: "14 June 2024",
    hours: "10:30",
    isFree: true,
  },
  {
    id: 2,
    day: "14 June 2024",
    hours: "10",
    minutes: "30",
    isFree: true,
  },
  {
    id: 3,
    day: "14 June 2024",
    hours: "11",
    minutes: "00",
    isFree: true,
  },
  {
    id: 4,
    day: "14 June 2024",
    hours: "11",
    minutes: "30",
    isFree: true,
  },
  {
    id: 5,
    day: "14 June 2024",
    hours: "12",
    minutes: "00",
    isFree: true,
  },
  {
    id: 6,
    day: "14 June 2024",
    hours: "12",
    minutes: "30",
    isFree: true,
  },
  {
    id: 20,
    day: "14 June 2024",
    hours: "13",
    minutes: "00",
    isFree: true,
  },
  {
    id: 21,
    day: "30 June 2024",
    hours: "11",
    minutes: "30",
    isFree: true,
  },
  // More meetings...
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function timeToMilliseconds(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number); // Split the string by colon and convert to numbers
  return (hours * 60 * 60 + minutes * 60) * 1000; // Convert hours to milliseconds and add minutes converted to milliseconds
}
const start = timeToMilliseconds("10:00");
const end = timeToMilliseconds("13:00");
const times = [];

days.forEach((day) => {
  for (let current = start; current <= end; current += 1800000) {
    times.push({ day: day, appointment: current, status: true }); // Store the current time in milliseconds in the array
  }
});

function formatMilliseconds(ms) {
  const hours = Math.floor(ms / 3600000); // Convert milliseconds to hours
  const minutes = Math.floor((ms % 3600000) / 60000); // Convert remainder to minutes

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}
times.map((time) => {
  console.log(time);
});

const getDayNumber = (dayName) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days.indexOf(dayName);
};

console.log(getDayNumber("Tuesday"));

// times.forEach((time) => {
//   console.log(time.day);
// });

export default function List({ selected }) {
  const day = new Date(selected).getDay() - 1;
  console.log(times);

  return (
    <section className="w-full flex flex-col items-center mx-auto mt-12 md:mt-0 md:pl-14">
      <h2 className=" self-start text-xl font-medium py-4 leading-6 text-gray-900">
        Escoge la hora:
      </h2>
      <ol className="flex flex-col items-center w-full mt-3 space-y-3 text-sm leading-6">
        {times.map(
          (time, idx) =>
            day === getDayNumber(time.day) &&
            time.status && (
              <li key={idx}>
                <DottedButton>
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
