import dayjs from 'dayjs';
import { UseFormRegister } from 'react-hook-form';
import { expenseMethods, incomeMethods } from '../../../constants';
import Button from '../../common/button/Button';
import { IFormData } from './Diary';
import DatePicker from '../../common/date/DatePicker';
import { Controller } from 'react-hook-form';

interface IDiaryForm {
  type: 'income' | 'expense';
  register: UseFormRegister<IFormData>;
  handleImgChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'incomeDiaryImg' | 'expenseDiaryImg',
  ) => void;

  imgFile: { type: string; fileName: string; file: string } | null;
  control: any;
}

function DiaryForm({ type, register, handleImgChange, imgFile, control }: IDiaryForm) {
  const isIncome = type === 'income';
  const diaryImgType = isIncome ? 'incomeDiaryImg' : 'expenseDiaryImg';
  const diaryType = isIncome ? 'incomeDiary' : 'expenseDiary';
  const methods = isIncome ? incomeMethods : expenseMethods;
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <>
      {/** 일자 */}
      <div>
        <label
          htmlFor={`${type}Date`}
          className="text-gray-700 block text-left text-sm font-medium"
        >
          일자
        </label>

        <Controller
          name={`${type}Date`}
          control={control}
          render={({ field }) => {
            return (
              <DatePicker
                value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : null} // Controller가 관리하는 value
                format="YYYY-MM-DD"
                onChange={field.onChange} // Controller가 제공하는 onChange
                defaultValue={today}
              />
            );
          }}
        />
      </div>

      {/** 금액 */}
      <div>
        <label
          htmlFor={`${type}Amount`}
          className="text-gray-700 block text-left text-sm font-medium"
        >
          금액
        </label>
        <input
          id={`${type}Amount`}
          type="text"
          placeholder="금액"
          {...register(`${type}Amount`, { required: '금액을 입력하세요.' })}
          className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/** 상세내용 */}
      <div>
        <label
          htmlFor={`${type}Detail`}
          className="text-gray-700 block text-left text-sm font-medium"
        >
          상세내용
        </label>
        <input
          id={`${type}Detail`}
          type="text"
          placeholder="메모"
          {...register(`${type}Detail`)}
          className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/** 수단 */}
      <div>
        <label
          htmlFor={isIncome ? 'incomeMethod' : 'expenseMethod'}
          className="text-gray-700 mb-2 block text-left text-sm font-medium"
        >
          내용
        </label>
        <div className="flex items-center gap-4">
          {methods.map(option => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                value={option.value}
                {...register(isIncome ? 'incomeMethod' : 'expenseMethod')}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/** 다이어리 */}
      <div>
        <label htmlFor={diaryType} className="text-gray-700 block text-left text-sm font-medium">
          다이어리
        </label>
        <textarea
          id={diaryType}
          placeholder="일기"
          {...register(diaryType)}
          className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/** 다이어리 - 이미지 */}
      <div>
        <label htmlFor={diaryImgType} className="text-gray-700 block text-left text-sm font-medium">
          이미지
        </label>

        <input
          id={diaryImgType}
          type="file"
          style={{ display: 'none' }}
          {...register(diaryImgType, {
            onChange: e => handleImgChange(e, diaryImgType), // 파일 선택 시 처리
          })}
          className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <Button
          onClick={() => document.getElementById(diaryImgType)?.click()}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          이미지 추가
        </Button>
        <div className="mt-2 h-[20px]">
          {imgFile?.type === diaryImgType && (
            <div className="text-left text-sm underline">
              {imgFile.fileName}
              {imgFile.file && (
                <a
                  href={imgFile.file}
                  target="_blank" // 새 창에서 링크를 열기 위한 속성
                  rel="noopener noreferrer" // 새 창을 열 때 보안 및 성능 향상을 위해 사용하는 속성
                  className="text-main underline"
                >
                  (이미지 보기)
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DiaryForm;
