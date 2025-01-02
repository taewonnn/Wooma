import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import useCalendarStore from '../../../stores/calendar/useCalendarStore';

// mockdata
const events = [
  { date: '2025-01-01', income: 10000000, expense: 5000 },
  { date: '2025-01-02', income: 0, expense: 2000 },
  { date: '2025-01-03', income: 0, expense: 1000 },
];

function MainCalendar() {
  const { setSelectedDate } = useCalendarStore();

  // 특정 일자 클릭 시
  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr); // 선택된 날짜를 상태에 저장
  };

  // 이벤트 클릭 시
  const handleEventClick = (info: any) => {
    setSelectedDate(info.event.startStr); // 이벤트 날짜를 상태에 저장
  };

  // 캘린더 redner
  const renderEventContent = (eventInfo: any) => {
    const { income, expense } = eventInfo.event.extendedProps;

    return (
      <div>
        {income ? <div style={{ color: 'green' }}>+{income}</div> : null}
        {expense ? <div style={{ color: 'red' }}>-{expense}</div> : null}
      </div>
    );
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
        eventClick={handleEventClick} // 이벤트 클릭 이벤트
        buttonText={{
          today: '오늘', // 버튼 텍스트
        }}
        events={events.map(event => ({
          title: '',
          start: event.date,
          extendedProps: { income: event.income, expense: event.expense }, // 수입/지출 데이터
        }))}
        eventContent={renderEventContent} // 커스터마이징된 이벤트 렌더링
      />
    </>
  );
}

export default MainCalendar;
