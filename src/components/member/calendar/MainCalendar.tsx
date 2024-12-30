import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function MainCalendar() {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        aspectRatio={1.0}
        height="auto"
        contentHeight="auto"
      />
    </>
  );
}

export default MainCalendar;
