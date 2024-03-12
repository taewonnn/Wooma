import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg } from 'fullcalendar';
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../api';
import { IDateSelectArg, ITransactions, TotalAmounts } from '../types/calendar';
import Create from '../components/calendar/Create';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

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
    // 날짜 클릭 상태 변경하여 create 모달 띄우기
    setDateClicked(true);
    setSelectedDate(clickedDate);
    setModalClose(false);
  };

  /** transactions Data(수입/지출 내역) 가져오기 */
  const {
    status,
    data: transactions,
    isLoading: transactionsLoading,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    cacheTime: 1000 * 60 * 60,
    // 테스트용 Json 정적데이터 ->  새로고침 시 새로운 요청X
    refetchOnWindowFocus: false,
  });
  console.log('지출내역: ', transactions);

  /** 상태 별 화면 */
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error!!!!!</div>;
  }

  /** 받아온 데이터 Fullcalendar event형식에 맞게 파싱 */
  const events = transactionsLoading
    ? []
    : transactions.map((data: ITransactions) => ({
        title: data.amount,
        date: data.date,
        memberId: data.memberId,
        amount: data.amount,
        // backgroundColor: data.transactionType === 'expense' ? 'red' : 'blue',
        // borderColor: data.transactionType === 'expense' ? 'red' : 'blue',
      }));
  console.log('지출내역 parsing: ', events);

  /** 총 지출 데이터  */
  // const { totalExpenses } = events.reduce(
  //   (acc: TotalAmounts, transaction: ITransactions) => {
  //     return (acc.totalExpenses += amount);
  //   },
  //   { totalIncome: 0, totalExpenses: 0 }
  // );
  const totalExpenses = events.reduce((acc: number, data: ITransactions) => {
    return (acc += data.amount);
  }, 0);
  console.log('총 지출: ', totalExpenses);

  /** 특정 이벤트 클릭 시 함수 */
  const handleEventTarget = (info: EventClickArg) => {
    // console.log('info 확인:', info);
    console.log('info 확인:', info.event._def.extendedProps);
  };

  return (
    <>
      {/* 이번 달  지출 */}
      <p>총 지출 : {totalExpenses}</p>
      <p>목표 : 1000000</p>
      <hr />

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

      {/* 기존 Create Start */}
      {/* {!modalClose && dateClicked ? (
        <Create selectedDate={selectedDate} setModalClose={setModalClose} />
      ) : null} */}
      {/* 기존 Create End */}

      <Outlet />
    </>
  );
}

export default Calendar;
