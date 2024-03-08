import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from 'react-query';
import { getfinancialTransactions } from '../api';
import { IDateSelectArg, ITransactions } from '../types/calendar';

/** 
  • 전체 데이터셋: financialTransactions
	•	개별 거래: transaction
	•	날짜: date
	•	거래 유형: transactionType
	•	거래 금액: amount
	•	거래 설명: description
 */

function Calendar() {
  /** 일자 확인 함수 */
  const handleDateClick = (date: IDateSelectArg) => {
    const clickedDate = date.dateStr;
    console.log('클릭한 일자 :', clickedDate);
  };

  /** financialTransactions Data(수입/지출 내역) 가져오기 */
  const { data: financialTransactions, isLoading: ftisLoading } = useQuery({
    queryKey: ['financialTransactions'],
    queryFn: getfinancialTransactions,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
  console.log('수입/지출내역: ', financialTransactions);

  // 받아온 데이터 Fullcalendar event형식에 맞게 파싱
  const events = ftisLoading
    ? []
    : financialTransactions.map((data: ITransactions) => ({
        title: data.amount,
        date: data.date,
        type: data.transactionType,
      }));
  console.log('수입/지출내역 parsing: ', events);

  /** 특정 이벤트 클릭 시 함수 */
  const onClickTrarget = (info: any) => {
    console.log('info 확인:', info.event);
  };

  return (
    <>
      {/* FullCalendar */}
      <div className="w-full h-1/2">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          editable={true}
          eventClick={onClickTrarget}
        />
      </div>
    </>
  );
}

export default Calendar;
