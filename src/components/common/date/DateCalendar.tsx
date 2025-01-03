import { useState } from 'react';
import dayjs from 'dayjs';
import { days } from '../../../constants';
import Button from '../button/Button';
import DatePicker from './DatePicker';

type CalendarProps = {
  label?: string;
  value: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  onChange: (value: Date | null) => void;
  close: (
    focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined,
  ) => void;
};

function DateCalendar({
  value,
  label = '',
  onChange,
  close,
  minDate = null,
  maxDate = null,
}: CalendarProps) {
  const [date, setDate] = useState(value ? value : new Date());

  const currentYear = dayjs(date).year();
  const currentMonth = dayjs(date).month() + 1;
  const daysInMonth = dayjs(date).daysInMonth();
  const firstDay = dayjs(`${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`).day();
  const totalSlots = Math.ceil((daysInMonth + firstDay) / 7) * 7;

  const handleDate = (newDate: Date) => {
    onChange(newDate);
    close();
  };

  const increaseMonth = () => {
    const newValue = new Date(dayjs(date).add(1, 'M').toString());
    setDate(newValue);
  };

  const decreaseMonth = () => {
    const newValue = new Date(dayjs(date).subtract(1, 'M').toString());
    setDate(newValue);
  };

  return (
    <section className="text-222 z-40 flex flex-col items-center rounded border border-gray bg-white px-[20px] pb-[15px] pt-[12px] text-[12px] shadow-[0px_3px_10px_0px_rgba(0,0,0,0.10)]">
      {label && <div className="text-999">{label}</div>}

      <div className="flex items-center gap-[19px] text-[18px] font-bold">
        <Button onClick={decreaseMonth}>
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 10.59L3.05533 6L8 1.41L6.47773 0L0 6L6.47773 12L8 10.59Z" fill="#999999" />
          </svg>
        </Button>
        <div>
          {currentYear}. {currentMonth.toString().padStart(2, '0')}
        </div>
        <Button onClick={increaseMonth}>
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 10.59L4.94467 6L0 1.41L1.52227 0L8 6L1.52227 12L0 10.59Z" fill="#999999" />
          </svg>
        </Button>
      </div>

      <table>
        <thead>
          <tr className="mb-[4px] mt-[10px] flex w-full gap-[2px]">
            {days.map((day, index) => (
              <th
                className="text-666 flex h-[26px] w-[26px] cursor-default select-none items-center justify-center font-normal"
                key={index}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: totalSlots / 7 }, (_, weekIndex) => (
            <tr className="text-222 mt-[6px] flex w-full gap-[2px]" key={weekIndex}>
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const day = weekIndex * 7 + dayIndex - (firstDay - 1);
                const newDate = dayjs(date).set('date', day);
                const isSame = dayjs(value).isSame(newDate, 'day');
                const isToday = dayjs().isSame(
                  `${dayjs(date).year()}.${dayjs(date).month() + 1}.${day}`,
                  'day',
                );
                const isBefore = minDate !== null && dayjs(newDate).isBefore(dayjs(minDate), 'day');
                const isAfter = maxDate !== null && dayjs(newDate).isAfter(dayjs(maxDate), 'day');
                const flexCenter = 'flex h-full w-full items-center justify-center';

                return (
                  <td
                    className={`${
                      isBefore || isAfter || day > daysInMonth || day < 1
                        ? 'pointer-events-none'
                        : 'cursor-pointer'
                    } h-[26px] w-[26px] select-none`}
                    key={dayIndex}
                    onClick={() => handleDate(newDate.toDate())}
                  >
                    {day > daysInMonth || day < 1 ? (
                      <div className={`${flexCenter} cursor-default`} />
                    ) : isSame ? (
                      <div className={`${flexCenter} rounded-[80px] bg-main text-white`}>{day}</div>
                    ) : (
                      <div
                        className={`${flexCenter} ${isToday ? 'font-bold' : ''} ${
                          isBefore || isAfter ? 'text-999' : ''
                        }`}
                      >
                        {day}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default DateCalendar;
