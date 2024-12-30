import useCalendarStore from '../../../stores/calendar/useCalendarStore';

function Card() {
  const { selectedDate } = useCalendarStore();

  // 예제 데이터 (날짜별 내역)
  const data: Record<string, string[]> = {
    '2024-12-25': ['🎄 크리스마스 선물 구매', '🍽️ 저녁 식사'],
    '2024-12-30': ['🏋️ 헬스장 결제', '📚 책 구매'],
  };

  return (
    <div className="bg-gray-100 mt-5 rounded p-4 shadow">
      {selectedDate ? (
        <>
          <h2 className="mb-2 text-lg font-bold">{selectedDate} 내역</h2>
          <ul>
            {data[selectedDate]?.length ? (
              data[selectedDate].map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))
            ) : (
              <p>내역이 없습니다.</p>
            )}
          </ul>
        </>
      ) : (
        <p>날짜를 선택해주세요.</p>
      )}
    </div>
  );
}

export default Card;
