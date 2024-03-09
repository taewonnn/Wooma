import { useState } from 'react';

function Create({ selectedDate }: any) {
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(event.target.value);
  };

  return (
    <>
      create
      <label htmlFor="category">유형: </label>
      <p>{selectedDate}</p>
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
