import { useForm, SubmitHandler } from 'react-hook-form';
import { useModalStore } from '../../../stores/useModalStore';
import Button from '../../common/button/Button';
import { useState } from 'react';
import Tabs from '../../common/Tabs/Tabs';
import { Tab } from '@headlessui/react';
import DiaryForm from './DiaryForm';

// form 데이터 타입 정의
export interface IFormData {
  category: 'income' | 'expense'; // 탭 구분
  incomeDate: string; // 일자(수입)
  expenseDate: string; // 일자(지출)
  incomeAmount: string; // 금액(수입)
  expenseAmount: string; // 금액(지출)
  incomeDetail?: string; // 상세 내용(수입)
  expenseDetail?: string; // 상세 내용(지출)
  incomeMethod: 'salary' | 'allowance' | 'carryOver' | 'other'; // 수단(수입)
  expenseMethod: 'card' | 'cash' | 'other'; // 수단(지출)
  incomeDiary?: string; // 다이어리(수입)
  expenseDiary?: string; // 다이어리(지출)
  incomeDiaryImg?: File; // 이미지(수입)
  expenseDiaryImg?: File; // 이미지(지출)
}

function Diary() {
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
      console.log('type: ', type);

      setImgFile({ type: type, fileName: file?.name, file: URL.createObjectURL(file) }); // type / 파일명 / URL 저장
      setValue(type, file, { shouldValidate: false }); // hook-form 등록
    }
  };

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
        {/* 수입 탭 */}
        <Tab.Panel className="rounded-xl bg-white p-5 shadow">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <DiaryForm
              type="income"
              register={register}
              handleImgChange={handleImgChange}
              imgFile={imgFile}
            />
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
            <DiaryForm
              type="expense"
              register={register}
              handleImgChange={handleImgChange}
              imgFile={imgFile}
            />
            <Button
              type="submit"
              className="rounded-md bg-main px-6 py-2 text-sm font-medium text-white shadow hover:bg-blue-600"
            >
              확인
            </Button>
          </form>
        </Tab.Panel>
      </Tabs>

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

export default Diary;
