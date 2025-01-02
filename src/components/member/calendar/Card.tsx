import useCalendarStore from '../../../stores/calendar/useCalendarStore';

function Card() {
  const { selectedDate } = useCalendarStore();

  // 예제 데이터 (날짜별 내역)
  const data: Record<string, string[]> = {
    '2025-01-01': ['💡 월급 10000000원', '🍽️ 저녁 식사  5000원'],
    '2025-01-02': ['📚 책 구매 2000원'],
    '2025-01-03': ['🎶 편의점 1000원'],
  };

  return (
    <div className="bg-gray-100 mt-5 rounded p-4 shadow">
      {selectedDate ? (
        <>
          <h2 className="mb-2 text-lg font-bold">{selectedDate}</h2>
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
