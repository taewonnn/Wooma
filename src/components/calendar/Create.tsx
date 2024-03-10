import { useState } from 'react';

function Create({ selectedDate }: any) {
  /** 유형 선택 상태 */
  const [transactionType, setTransactionType] = useState('');

  /** 유형 선택 확인 함수 */
  const handleTransactionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
    const { value } = event.target;
    setTransactionType(value);
  };

  return (
    <>
      create
      <p>{selectedDate}</p>
      <label htmlFor="category">유형: </label>
      <select
        name="transactionType"
        id="category"
        value={transactionType}
        onChange={handleTransactionTypeChange}
      >
        <option value="">--Please choose an option--</option>
        <option value="expenditure">지출</option>
        <option value="deposit">수입</option>
      </select>
      <label htmlFor="amount">금액:</label>
      <input type="text" name="amount" id="amount" />
      <button>입력</button>
      <button>취소</button>
    </>
  );
}

export default Create;
