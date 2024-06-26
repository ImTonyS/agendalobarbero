"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
} from "date-fns";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import List from "./List";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const formatear = (array) => {
  return format(array, "d MMMM uuuu");
};

const Calendar = (userId) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfMonth(currentMonth);
  const endDay = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startDay, end: endDay });
  const today = format(new Date(), "d MMMM uuuu");

  const [selected, setSelected] = useState(today);

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleClick = (dayIdx) => {
    return () => {
      const clickedDay = format(days[dayIdx], "d MMMM uuuu");
      setSelected(clickedDay);
    };
  };

  return (
    <main className="pb-4 px-4 sm:px-6 h-full">
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:divide-x lg:divide-gray-500">
        <div className="md:pr-14">
          <h1 className="text-xl py-4 font-medium text-gray-900">
            Escoge la fecha:
          </h1>
          <div className="flex items-center">
            <h2 className="flex-auto text-sm font-medium text-gray-900">
              {format(currentMonth, "MMMM yyyy")}
            </h2>

            {format(new Date(), "MMMM") !== format(currentMonth, "MMMM") && (
              <button
                type="button"
                onClick={handlePrevMonth}
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {format(new Date(), "M") >= format(currentMonth, "M") && (
              <button
                type="button"
                onClick={handleNextMonth}
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
          {currentMonth.getMonth() === 7 && (
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
              <div>J</div>
              <div>V</div>
              <div>S</div>
              <div>D</div>
              <div>L</div>
              <div>M</div>
              <div>M</div>
            </div>
          )}
          {currentMonth.getMonth() === 6 && (
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
              <div>L</div>
              <div>M</div>
              <div>M</div>
              <div>J</div>
              <div>V</div>
              <div>S</div>
              <div>D</div>
            </div>
          )}
          <div className="mt-2 grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={dayIdx}
                className={classNames(
                  dayIdx > 6 && "border-t border-gray-200",
                  "py-2"
                )}
              >
                <button
                  onClick={handleClick(dayIdx)}
                  type="button"
                  className={classNames(
                    format(new Date(), "MMMM") ===
                      format(currentMonth, "MMMM") &&
                      format(day, "dd") < format(new Date(), "dd") &&
                      "cursor text-zinc-200 hover:bg-white",
                    formatear(day) === selected && "text-white",
                    formatear(day) === selected &&
                      today === formatear(day) &&
                      "text-barber-blue",
                    formatear(day) === selected &&
                      today === formatear(day) &&
                      "bg-barber-blue",
                    formatear(day) == selected &&
                      today !== formatear(day) &&
                      "bg-gray-900",
                    formatear(day) !== selected && "hover:bg-gray-200",
                    (formatear(day) === selected || today === formatear(day)) &&
                      "font-semibold",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                  )}
                  disabled={
                    format(day, "dd") < format(new Date(), "dd") &&
                    format(new Date(), "MMMM") === format(currentMonth, "MMMM")
                  }
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")
                      .split("-")
                      .pop()
                      .replace(/^0/, "")}
                  >
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}
          </div>
        </div>

        <List selected={selected} userId={userId} currentMonth={currentMonth} />
        {/* Other parts of the component remain the same */}
      </div>
    </main>
  );
};

export default Calendar;
