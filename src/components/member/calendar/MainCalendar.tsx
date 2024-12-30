import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import useCalendarStore from '../../../stores/calendar/useCalendarStore';

function MainCalendar() {
  const { setSelectedDate } = useCalendarStore();

  const handleDateClick = (info: any) => {
    //console
    console.log(info);

    setSelectedDate(info.dateStr); // 선택된 날짜를 상태에 저장
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        aspectRatio={1.0}
        height="auto"
        contentHeight="auto"
        dateClick={handleDateClick} // 날짜 클릭 이벤트
      />
    </>
  );
}

export default MainCalendar;
