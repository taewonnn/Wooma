import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import useCalendarStore from '../../../stores/calendar/useCalendarStore';
import Button from '../../common/button/Button';
import { useModalStore } from '../../../stores/useModalStore';
import Diary from './Diary';
import { formatNumber, truncateText } from '../../../constants/common';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useTransactions } from '../../../hooks/TransactionsQuery';

// mockdata
const events = [
  { date: '2025-01-01', income: 1000000, expense: 5000 },
  { date: '2025-01-02', income: 0, expense: 2000 },
  { date: '2025-01-03', income: 0, expense: 1000 },
  { date: '2025-02-04', income: 0, expense: 1000 },
];

function MainCalendar() {
  // 모바일 사이즈 감지
  const isMobile = useMediaQuery('(max-width: 768px)');

  // 캘린더 선택일자 상태
  const { setSelectedDate } = useCalendarStore();

  // 모달
  const { openModal } = useModalStore();

  // 모달 함수
  const modalOpen = () => {
    openModal('custom', {
      title: '내역',
      customContent: <Diary />,
    });
  };

  // data
  const { data: transactions } = useTransactions();
  console.log(transactions);

  // 특정 일자 클릭 시
  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr); // 선택된 날짜를 상태에 저장
  };

  // 이벤트 클릭 시
  const handleEventClick = (info: any) => {
    setSelectedDate(info.event.startStr); // 이벤트 날짜를 상태에 저장
  };

  // 캘린더 일자 event redner
  const renderEventContent = (eventInfo: any) => {
    const { income, expense } = eventInfo.event.extendedProps;

    return (
      <div className="text-xs">
        {income ? (
          <div style={{ color: 'green' }}>
            {isMobile ? truncateText(formatNumber(income), 7) : income}
          </div>
        ) : null}
        {expense ? (
          <div style={{ color: 'red' }}>
            {isMobile ? truncateText(formatNumber(expense), 7) : expense}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        aspectRatio={isMobile ? 1.2 : 1.7}
        dateClick={handleDateClick} // 날짜 클릭 이벤트
        eventClick={handleEventClick} // 이벤트 클릭 이벤트
        customButtons={{
          addButton: {
            text: '+',
            click: modalOpen,
          },
        }}
        headerToolbar={{
          left: 'title',
          right: 'addButton prev,next',
        }}
        events={transactions?.map(event => ({
          title: '',
          start: event.date,
          extendedProps: {
            income: event.type === 'income' && event.amount,
            expense: event.type === 'expense' && event.amount,
          }, // 수입/지출 데이터
        }))}
        eventContent={renderEventContent} // 커스터마이징된 이벤트 렌더링
      />

      <Button
        onClick={modalOpen}
        className="fixed bottom-[calc(90px+env(safe-area-inset-bottom))] right-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-2xl text-white shadow-lg"
      >
        +
      </Button>
    </>
  );
}

export default MainCalendar;
