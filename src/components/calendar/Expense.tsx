import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ICreateExpenseForm } from '../../types/calendar';
import { useForm } from 'react-hook-form';
import { dateClickedState, selectedDateState } from '../../atoms';
import { v4 as uuidv4 } from 'uuid';

function Expense() {
  /** 선택한 일자 */
  const selectedDate = useRecoilValue(selectedDateState);

  /** 일자 클릭 상태 변경 -> 모달 닫기 */
  const setDateClicked = useSetRecoilState(dateClickedState);

  /** hook-form 입력값 */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateExpenseForm>({ mode: 'onChange' });
  // console.log('입력값 확인: ', watch());

  /** validation 끝난 이후 실행함수 */
  const onValid = (data: ICreateExpenseForm) => {
    // console.log('제출한 데이터 묶음 확인:', data);

    // amount -> Number
    data.amount = Number(data.amount);

    // UUID 적용
    const formData = { ...data, UUID: uuidv4() };
    console.log('UUID 포함 데이터: ', formData);

    // POST - Mutaion
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <p>일자: {selectedDate}</p>
        <input type="hidden" {...register('date')} value={selectedDate} />

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
        <button type="button" onClick={() => setDateClicked(false)}>
          닫기
        </button>
      </form>
    </>
  );
}

export default Expense;
