import { useState } from 'react';
import { CreateProps } from '../../types/calendar';
import { useForm } from 'react-hook-form';

function Create({ selectedDate, setModalClose }: CreateProps) {
  /** 유형 선택 상태 */
  const [transactionType, setTransactionType] = useState('');

  /** 유형 선택 확인 함수 */
  const handleTransactionType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setTransactionType(value);
  };

  /** 모달 창 관리 */
  const handleModal = () => {
    setModalClose(true);
  };

  /** hook-form 입력값 */
  const { register, watch, handleSubmit } = useForm({ mode: 'onChange' });
  // 입력깂
  console.log('입력값 확인: ', watch());

  /** validation 끝난 이후 실행함수 */
  const onValid = () => {};

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <p>{selectedDate}</p>
        <label htmlFor="transactionType">유형: </label>
        <select
          name="transactionType"
          id="transactionType"
          value={transactionType}
          onChange={handleTransactionType}
        >
          <option value="select">--Please choose an option--</option>
          <option value="expenditure">지출</option>
          <option value="deposit">수입</option>
        </select>
        <label htmlFor="amount">금액:</label>
        <input
          {...register('amount', { required: '필수: 금액' })}
          type="text"
          name="amount"
          id="amount"
        />
        <label htmlFor="description">내용:</label>
        <input
          {...register('description', { required: '필수: 내용' })}
          type="text"
          name="description"
          id="description"
        />
        <button>입력</button>
        <hr />
        <button onClick={handleModal}>닫기</button>
      </form>
    </>
  );
}

export default Create;
