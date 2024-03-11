import { useState } from 'react';

function Create({ selectedDate }: any) {
  /** 유형 선택 상태 */
  const [transactionType, setTransactionType] = useState('');

  /** 유형 선택 확인 함수 */
  const handleTransactionType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
    const { value } = event.target;
    setTransactionType(value);
  };

  /** 입력 창 상태 */
  const [modalClose, setModalClose] = useState(false);

  const handleModal = () => {
    setModalClose((prev) => !prev);
    console.log('모달상태', modalClose);
  };

  return (
    <>
      {modalClose ? null : (
        <div>
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
          <button onClick={handleModal}>닫기</button>{' '}
        </div>
      )}
    </>
  );
}

export default Create;
