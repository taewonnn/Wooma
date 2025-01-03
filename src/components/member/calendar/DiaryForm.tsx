import dayjs from 'dayjs';
import { UseFormRegister } from 'react-hook-form';
import { expenseMethods, incomeMethods } from '../../../constants';
import Button from '../../common/button/Button';
import { IFormData } from './Diary';
import DatePicker from '../../common/date/DatePicker';
import { Controller } from 'react-hook-form';

interface IDiaryForm {
  type: 'income' | 'expense'; // 타입 - 수입/지출
  register: UseFormRegister<IFormData>; // react hook form - register
  handleImgChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 이미지 변경 처리 핸들러
  imgFile: { type: string; fileName: string; file: string } | null; // 이미지 파일 상태
  control: any; // react hook form - control
}

function DiaryForm({ type, register, handleImgChange, imgFile, control }: IDiaryForm) {
  const fieldName = type === 'income' ? 'incomeTransaction' : 'expenseTransaction'; // 수입/지출에 따라 사용할 필드네임
  const methods = type === 'income' ? incomeMethods : expenseMethods; // 수입/지출에 따라 사용할 수단(methods) 생성
  const today = dayjs().format('YYYY-MM-DD'); // 오늘 날짜

  return (
    <>
      {/** 일자 */}
      <div>
        <label
          htmlFor={`${fieldName}Date`}
          className="text-gray-700 block text-left text-sm font-medium"
        >
          일자
        </label>

        <Controller
          name={`${fieldName}.date`}
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : null}
              format="YYYY-MM-DD"
              onChange={field.onChange}
              defaultValue={today}
            />
          )}
        />
      </div>

      {/** 금액 */}
      <div>
        <label
          htmlFor={`${fieldName}Amount`}
          className="text-gray-700 block text-left text-sm font-medium"
        >
          금액
        </label>
        <input
          id={`${fieldName}Amount`}
          type="text"
          placeholder="금액"
          {...register(`${fieldName}.amount`, { required: '금액을 입력하세요.' })}
          className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/** 상세내용 */}
      <div>
        <label
          htmlFor={`${fieldName}Detail`}
          className="text-gray-700 block text-left text-sm font-medium"
        >
          상세내용
        </label>
        <input
          id={`${fieldName}Detail`}
          type="text"
          placeholder="메모"
          {...register(`${fieldName}.detail`)}
          className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/** 수단 */}
      <div>
        <label
          className="text-gray-700 block text-left text-sm font-medium"
          htmlFor={`${fieldName}Method`}
        >
          수단
        </label>
        <div className="flex items-center gap-4">
          {methods.map(option => (
            <label
              key={option.value}
              htmlFor={`${fieldName}Method${option.value}`}
              className="flex items-center"
            >
              <input
                id={`${fieldName}Method${option.value}`}
                type="radio"
                value={option.value}
                {...register(`${fieldName}.method`)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/** 다이어리 */}
      <div>
        <label
          htmlFor={`${fieldName}Diary`}
          className="text-gray-700 block text-left text-sm font-medium"
        >
          다이어리
        </label>
        <textarea
          id={`${fieldName}Diary`}
          placeholder="일기"
          {...register(`${fieldName}.diary`)}
          className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/** 다이어리 - 이미지 */}
      <div>
        <label
          htmlFor={`${fieldName}DiaryImg`}
          className="text-gray-700 block text-left text-sm font-medium"
        >
          이미지
        </label>
        <input
          id={`${fieldName}DiaryImg`}
          type="file"
          style={{ display: 'none' }}
          onChange={handleImgChange}
          className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <Button
          onClick={() => document.getElementById(`${fieldName}DiaryImg`)?.click()}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          이미지 추가
        </Button>
        <div className="mt-2 h-[20px]">
          {imgFile?.type === fieldName && (
            <div className="text-left text-sm underline">
              {imgFile.fileName}
              {imgFile.file && (
                <a
                  href={imgFile.file} // 업로드된 이미지의 URL
                  target="_blank" // 새 창에서 열기
                  rel="noopener noreferrer" // 보안 향상
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
