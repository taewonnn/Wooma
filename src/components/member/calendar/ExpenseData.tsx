import { useForm, SubmitHandler } from 'react-hook-form';
import { useModalStore } from '../../../stores/useModalStore';
import Button from '../../common/button/Button';
import { expenseMethods, incomeMethods } from '../../../constants';
import { useState } from 'react';
import Tabs from '../../common/Tabs/Tabs';
import { Tab } from '@headlessui/react';

// form 데이터 타입 정의
interface IFormData {
  category: string;
  amount: string;
  detail?: string;
  method: string;
  incomeDiary?: string;
  incomeDiaryImg?: File;
  expenseDiary?: string;
  expenseDiaryImg?: File;
}

function ExpenseData() {
  // 모달
  const { closeModal } = useModalStore();

  // tab 상태 관리
  const [selectedTab, setSelectedTab] = useState(0);
  // file 상태 관리
  const [imgFile, setImgFile] = useState<{
    type: 'incomeDiaryImg' | 'expenseDiaryImg';
    fileName: string;
    file: string;
  } | null>(null);

  // hook-form
  const { register, handleSubmit, reset, setValue } = useForm<IFormData>();

  // 이미지 처리
  const handleImgChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'incomeDiaryImg' | 'expenseDiaryImg',
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // console
      console.log('file: ', file?.name, URL.createObjectURL(file));

      setImgFile({ type: type, fileName: file?.name, file: URL.createObjectURL(file) }); // type / 파일명 / URL 저장
      setValue(type, file, { shouldValidate: false }); // hook-form 등록
    }
  };

  // 이미지 미리보기
  const previewImg = () => {};

  // form 제출
  const onSubmit: SubmitHandler<IFormData> = data => {
    const category = selectedTab === 0 ? '입금' : '지출';
    console.log('form data:', data, category);

    // @todo: API 호출
    reset();
    closeModal();
  };

  return (
    <div className="p-5">
      <Tabs tabs={['입금', '지출']} onChange={setSelectedTab}>
        {/* 입금 탭 */}
        <Tab.Panel className="rounded-xl bg-white p-5 shadow">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            {/** 금액 */}
            <div>
              <label htmlFor="income" className="text-gray-700 block text-left text-sm font-medium">
                금액
              </label>
              <input
                id="income"
                type="text"
                placeholder="금액"
                {...register('amount', { required: '금액을 입력하세요.' })}
                className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/** 상세내용 */}
            <div>
              <label
                htmlFor="income-detail"
                className="text-gray-700 block text-left text-sm font-medium"
              >
                상세내용
              </label>
              <input
                id="income-detail"
                type="text"
                placeholder="메모"
                {...register('detail')}
                className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/** 수단 */}
            <div className="flex items-center gap-6">
              {incomeMethods.map(option => (
                <label key={option.value} className="flex items-center text-left">
                  <input
                    type="radio"
                    value={option.value}
                    {...register('method')}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            {/** 다이어리 */}
            <div>
              <label
                htmlFor="incomeDiary"
                className="text-gray-700 block text-left text-sm font-medium"
              >
                다이어리
              </label>
              <textarea
                id="incomeDiary"
                placeholder="일기"
                {...register('incomeDiary')}
                className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/** 다이어리 - 이미지 */}
            <div>
              <label
                htmlFor="incomeDiaryImg"
                className="text-gray-700 block text-left text-sm font-medium"
              >
                이미지
              </label>

              <input
                id="incomeDiaryImg"
                type="file"
                style={{ display: 'none' }}
                {...register('incomeDiaryImg', {
                  onChange: e => handleImgChange(e, 'incomeDiaryImg'), // 파일 선택 시 처리
                })}
                className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <Button
                onClick={() => document.getElementById('incomeDiaryImg')?.click()}
                className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md px-4 py-2 text-sm font-medium shadow"
              >
                이미지 추가
              </Button>
              <div className="mt-2 h-[20px]">
                {imgFile?.type === 'incomeDiaryImg' && (
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

            <Button
              type="submit"
              className="rounded-md bg-main px-6 py-2 text-sm font-medium text-white shadow hover:bg-blue-600"
            >
              확인
            </Button>
          </form>
        </Tab.Panel>

        {/* 지출 탭 */}
        <Tab.Panel className="rounded-xl bg-white p-5 shadow">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            {/** 금액 */}
            <div>
              <label
                htmlFor="expense"
                className="text-gray-700 block text-left text-sm font-medium"
              >
                금액
              </label>
              <input
                id="expense"
                type="text"
                placeholder="금액"
                {...register('amount', { required: '금액을 입력하세요.' })}
                className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/** 상세내용 */}
            <div>
              <label
                htmlFor="expense-detail"
                className="text-gray-700 block text-left text-sm font-medium"
              >
                상세내용
              </label>
              <input
                id="expense-detail"
                type="text"
                placeholder="메모"
                {...register('detail')}
                className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/** 결제수단 */}
            <div className="flex items-center gap-6">
              {expenseMethods.map(option => (
                <label key={option.value} className="flex items-center text-left">
                  <input
                    type="radio"
                    value={option.value}
                    {...register('method')}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            {/** 다이어리 */}
            <div>
              <label
                htmlFor="expenseDiary"
                className="text-gray-700 block text-left text-sm font-medium"
              >
                다이어리
              </label>
              <textarea
                id="expenseDiary"
                placeholder="일기"
                {...register('expenseDiary')}
                className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/** 다이어리 - 이미지 */}
            <div>
              <label
                htmlFor="expenseDiaryImg"
                className="text-gray-700 block text-left text-sm font-medium"
              >
                이미지
              </label>

              <input
                id="expenseDiaryImg"
                type="file"
                style={{ display: 'none' }}
                {...register('expenseDiaryImg', {
                  onChange: e => handleImgChange(e, 'expenseDiaryImg'), // 파일 선택 시 처리
                })}
                className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              <Button
                type="button"
                onClick={() => document.getElementById('expenseDiaryImg')?.click()} // 숨겨진 input 클릭
                className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md px-4 py-2 text-sm font-medium shadow"
              >
                이미지 첨부
              </Button>
              <div className="mt-2 h-[20px]">
                {imgFile?.type === 'expenseDiaryImg' && (
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

            <Button
              title="확인"
              type="submit"
              className="rounded-md bg-main px-6 py-2 text-sm font-medium text-white shadow hover:bg-blue-600"
            />
          </form>
        </Tab.Panel>
      </Tabs>

      {/* 닫기 버튼 */}
      <div className="mt-6 flex justify-end gap-4">
        <Button
          title="닫기"
          className="bg-red-500 hover:bg-red-600 rounded-md px-6 py-2 text-sm font-medium text-black shadow"
          onClick={closeModal}
        />
      </div>
    </div>
  );
}

export default ExpenseData;
