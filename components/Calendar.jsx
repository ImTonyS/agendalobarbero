"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
} from "date-fns";

import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Example = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selected, setSelected] = useState(null);

  const startDay = startOfMonth(currentMonth);
  const endDay = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const handlePrevMonth = () => {

    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleClick = (dayIdx) => {
    return () => {
      const clickedDay = days[dayIdx]
      setSelected(clickedDay)
    }
  }


  return (
    <main className="py-20 px-10">
    <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
      <div className="md:pr-14">
        <div className="flex items-center">
          <h2 className="flex-auto text-sm font-semibold text-gray-900">
            {format(currentMonth, "MMMM yyyy")}
          </h2>

          <button
            type="button"
            onClick={handlePrevMonth}
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            flecha righ{" "}
          </button>

          <button
            type="button"
            onClick={handleNextMonth}
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            flecha righ{" "}
          </button>
         
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          <div>L</div>
          <div>M</div>
          <div>M</div>
          <div>J</div>
          <div>V</div>
          <div>S</div>
          <div>D</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div key={day.date} className={classNames(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
              <button
                onClick={handleClick(dayIdx)}
                type="button"
                className={classNames(
                  day === selected && 'text-white',
                  day.date !== selected && day.isToday && 'text-barber-blue',
                  day.date !== selected && !day.isToday && day.isCurrentMonth && 'text-gray-900',
                  day.date !== selected && !day.isToday && !day.isCurrentMonth && 'text-gray-400',
                  day.date === selected && day.isToday && 'bg-barber-blue',
                  day.date === selected && !day.isToday && 'bg-gray-900',
                  day.date !== selected && 'hover:bg-gray-200',
                  (day.date === selected || day.isToday) && 'font-semibold',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd").split('-').pop().replace(/^0/, '')}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Other parts of the component remain the same */}
    </div>
    </main>
  );
};

export default Example;