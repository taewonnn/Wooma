import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';

function Calendar() {
  /** 일자 상태 */
  const [date, SetDate] = useState({});

  /** 일자 클릭 시 이벤트 */
  const handleDateClick = (arg: any) => {
    console.log(arg);
    //console.log(arg.event._def);
    SetDate('arg');
  };

  return (
    <>
      {/* FullCalendar */}
      <div className="w-full h-1/2">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventClick={handleDateClick}
          events={[
            { title: '테스트1', date: '2024-03-20' },
            { title: '테스트2', date: '2024-03-15' },
          ]}
        />
      </div>
    </>
  );
}

export default Calendar;
