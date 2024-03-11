import { useState } from 'react';
import { CreateProps, ICreateForm } from '../../types/calendar';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postFinancialTransactions } from '../../api';
import { v4 as uuidv4 } from 'uuid';

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

  /** POST */
  const mutation = useMutation(postFinancialTransactions);

  /** hook-form 입력값 */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateForm>({ mode: 'onChange' });

  // console.log('입력값 확인: ', watch());

  /** validation 끝난 이후 실행함수 */
  const onValid = (data: ICreateForm) => {
    console.log('제출한 데이터 묶음 확인:', data);

    // // amount 숫자로 변경
    // data.amount = Number(data.amount);

    // // UUID 적용
    // const dataWithUUID = { ...data, UUID: uuidv4() };

    // // POST
    // mutation.mutate(dataWithUUID);

    mutation.mutate({ ...data, UUID: uuidv4(), amount: Number(data.amount) });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <p>일자: {selectedDate}</p>
        <input type="hidden" {...register('date')} value={selectedDate} />
        <label htmlFor="transactionType">유형: </label>
        <select
          {...register('transactionType', {
            required: '필수: 타입',
            validate: (value) => value !== 'select' || '유형을 선택해주세요.',
          })}
          name="transactionType"
          id="transactionType"
          value={transactionType}
          onChange={handleTransactionType}
        >
          <option value="select">--Please choose an option--</option>
          <option value="expenditure">지출</option>
          <option value="deposit">수입</option>ㅙㅐ
        </select>
        {errors?.transactionType && (
          <p className="text-red-500">{errors.transactionType.message}</p>
        )}

        <label htmlFor="amount">금액:</label>
        <input
          {...register('amount', {
            required: '필수: 금액',
            pattern: {
              value: /^[0-9]+$/,
              message: '금액은 숫자만 입력 가능합니다.',
            },
          })}
          type="text"
          name="amount"
          id="amount"
        />
        {errors?.amount && <p className="text-red-500">{errors.amount.message}</p>}

        <label htmlFor="description">내용:</label>
        <input
          {...register('description', {
            required: '필수: 내용',
            maxLength: {
              value: 15,
              message: '내용은 최대 15글자까지 입력 가능합니다.',
            },
          })}
          type="text"
          name="description"
          id="description"
        />
        {errors?.description && <p className="text-red-500">{errors.description.message}</p>}

        <button type="submit">입력</button>
        <hr />
        <button type="button" onClick={handleModal}>
          닫기
        </button>
      </form>
    </>
  );
}

export default Create;
