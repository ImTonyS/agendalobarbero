import DottedButton from "./ButtonWrapper";
import { format } from "date-fns";

const meetings = [
  {
    id: 1,
    day: "14 June 2024",
    hours: "10",
    minutes: "00",
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

export default function List({ selected }) {
  return (
    <section className="w-full flex flex-col items-center mx-auto mt-12 md:mt-0 md:pl-14">
      <h2 className=" self-start text-xl font-medium py-4 leading-6 text-gray-900">
        Escoge la hora:
      </h2>
      <ol className="flex flex-col items-center w-full mt-3 space-y-3 text-sm leading-6">
        {meetings.map(
          (meeting) =>
            selected === meeting.day &&
            meeting.isFree && (
              <li key={meeting.id}>
                <DottedButton>
                  <p className="text-md font-medium">
                    {meeting.hours}:{meeting.minutes}
                  </p>
                </DottedButton>
              </li>
            )
        )}
      </ol>
    </section>
  );
}
