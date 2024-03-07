import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar() {
  /** 이벤트 관리 */

  return (
    <>
      {/* FullCalendar */}
      <div className="w-full h-1/2">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
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
