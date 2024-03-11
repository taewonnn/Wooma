import { useState } from 'react';
import { CreateProps } from '../../types/calendar';

function Create({ selectedDate, setModalClose }: CreateProps) {
  /** 유형 선택 상태 */
  const [transactionType, setTransactionType] = useState('');

  /** 유형 선택 확인 함수 */
  const handleTransactionType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
    const { value } = event.target;
    setTransactionType(value);
  };

  const handleModal = () => {
    setModalClose(true);
  };

  return (
    <>
      <p>{selectedDate}</p>
      <label htmlFor="category">유형: </label>
      <select
        name="transactionType"
        id="category"
        value={transactionType}
        onChange={handleTransactionType}
      >
        <option value="">--Please choose an option--</option>
        <option value="expenditure">지출</option>
        <option value="deposit">수입</option>
      </select>
      <label htmlFor="amount">금액:</label>
      <input type="text" name="amount" id="amount" />
      <button>입력</button>
      <hr />
      <button onClick={handleModal}>닫기</button>
    </>
  );
}

export default Create;
