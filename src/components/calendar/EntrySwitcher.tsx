import { useState } from 'react';
import Diary from './Diary';
import Expense from './Expense';
import { CreateProps } from '../../types/calendar';

function EntrySwitcher({ selectedDate }: CreateProps) {
  /** toggle 상태 */
  const [isSelected, SetIsSelected] = useState(false);

  /** toggle 상태 변경 함수 */
  const toggleSelection = () => {
    SetIsSelected(!isSelected);
  };

  return (
    <>
      <div className="h-8 w-32 rounded-full p-1 flex cursor-pointer" onClick={toggleSelection}>
        <div
          className={`h-full w-1/4 rounded-full transition-transform duration-200 ${
            isSelected ? 'bg-blue-500 transform translate-x-full' : 'bg-green-500'
          }`}
        >
          {isSelected ? '일기' : '지출'}
        </div>
      </div>

      <div>{isSelected ? <Diary /> : <Expense selectedDate={selectedDate} />}</div>
    </>
  );
}

export default EntrySwitcher;
