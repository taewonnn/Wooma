import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

function Calendar() {
  /** 일자 확인 함수 */
  const handleDateClick = (arg: any) => {
    // console.log(arg);
    const clickedDate = arg.dateStr;
    console.log('클릭한 일자 :', clickedDate);
  };

  return (
    <>
      {/* FullCalendar */}
      <div className="w-full h-1/2">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
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
