import { Popover } from '@headlessui/react';
import dayjs from 'dayjs';
import DateCalendar from './DateCalendar';

type IDatePicker = {
  value: Date | null;
  format: string;
  defaultValue?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  onChange: (value: Date | null) => void;
  disabled?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement> | null;
};

function DatePicker({
  value,
  format,
  defaultValue = '',
  minDate = null,
  maxDate = null,
  onChange,
  disabled = false,
  btnRef = null,
}: IDatePicker) {
  return (
    <Popover className="relative">
      <Popover.Button
        ref={btnRef}
        disabled={disabled}
        className="flex h-full w-full items-center gap-[18px] outline-none"
      >
        <div
          className={`${
            disabled ? 'bg-eee text-999' : 'bg-white'
          } flex h-[38px] w-[120px] items-center justify-between gap-[10px] rounded border border-line px-[10px]`}
        >
          <span>
            {value ? dayjs(value).format(format) : <span className="text-999">{defaultValue}</span>}
          </span>
        </div>
      </Popover.Button>

      <Popover.Panel className="fixed left-0 right-0 z-40 mx-auto max-w-[300px]">
        {({ close }) => (
          <DateCalendar
            value={value}
            onChange={onChange}
            close={close}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}
      </Popover.Panel>
    </Popover>
  );
}

export default DatePicker;
