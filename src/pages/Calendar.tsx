import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg } from 'fullcalendar';
import { useQuery } from 'react-query';
import { getfinancialTransactions } from '../api';
import { IDateSelectArg, ITransactions } from '../types/calendar';
import Create from '../components/calendar/Create';
import { useState } from 'react';
/** 
  • 전체 데이터셋: financialTransactions
	•	개별 거래: transaction
	•	날짜: date
	•	거래 유형: transactionType
	•	거래 금액: amount
	•	거래 설명: description
 */

function Calendar() {
  /** 추가 / 선택한 날짜 확인 상태 */
  const [dateClicked, setDateClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  /** Create - modal 상태 */
  const [modalClose, setModalClose] = useState(false);

  /** 일자 확인 함수 */
  const handleDateClick = (date: IDateSelectArg) => {
    const clickedDate = date.dateStr;
    console.log('클릭한 일자 :', clickedDate);
    setDateClicked(true);
    setSelectedDate(clickedDate);
    setModalClose(false);
  };

  /** financialTransactions Data(수입/지출 내역) 가져오기 */
  const { data: financialTransactions, isLoading: ftisLoading } = useQuery({
    queryKey: ['financialTransactions'],
    queryFn: getfinancialTransactions,
    cacheTime: 1000 * 60 * 60,
    // 테스트용 Json 정적데이터 ->  새로고침 시 새로운 요청X
    refetchOnWindowFocus: false,
  });
  // console.log('수입/지출내역: ', financialTransactions);

  // 받아온 데이터 Fullcalendar event형식에 맞게 파싱
  const events = ftisLoading
    ? []
    : financialTransactions.map((data: ITransactions) => ({
        title: data.amount,
        date: data.date,
        type: data.transactionType,
        backgroundColor: data.transactionType === 'expense' ? 'red' : 'blue',
        borderColor: data.transactionType === 'expense' ? 'red' : 'blue',
      }));
  // console.log('수입/지출내역 parsing: ', events);

  /** 특정 이벤트 클릭 시 함수 */
  const handleEventTarget = (info: EventClickArg) => {
    console.log('info 확인:', info);
    // console.log('info 확인:', info.event._def.extendedProps.type);
    const type = info.event._def.extendedProps.type;
    type === 'expense' ? console.log('지출!!!') : type === 'income' && console.log('수입!!');
  };

  return (
    <>
      {/* FullCalendar */}
      <div className="w-full h-1/2">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          editable={true}
          dateClick={handleDateClick}
          eventClick={handleEventTarget}
        />
      </div>
      {!modalClose && dateClicked ? (
        <Create selectedDate={selectedDate} setModalClose={setModalClose} />
      ) : null}
    </>
  );
}

export default Calendar;
