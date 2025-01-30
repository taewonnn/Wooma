import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';
import Tabs from '../../common/Tabs/Tabs';
import { Tab } from '@headlessui/react';
import { useModalStore } from '../../../stores/useModalStore';
import Button from '../../common/button/Button';
import DiaryForm from './DiaryForm';

interface TabItem {
  key: 'income' | 'expense';
  label: string;
  type: 'incomeTransaction' | 'expenseTransaction';
}

// form 데이터 타입 정의
export interface ITransaction {
  date: string; // 일자
  amount: string; // 금액
  detail?: string; // 상세 내용
  method: 'salary' | 'allowance' | 'carryOver' | 'other' | 'card' | 'cash' | ''; // 수단
  diary?: string; // 다이어리
  diaryImg?: File; // 이미지
}

export interface IFormData {
  incomeTransaction?: ITransaction; // 수입 데이터
  expenseTransaction?: ITransaction; // 지출 데이터
}

// today
const today = dayjs().format('YYYY-MM-DD');

function Diary() {
  // 모달
  const { closeModal } = useModalStore();

  // tab 상태 관리
  const [selectedTab, setSelectedTab] = useState(0);

  // 이미지 상태 관리
  const [imgFile, setImgFile] = useState<{
    incomeTransaction?: { type: string; fileName: string; file: string } | null;
    expenseTransaction?: { type: string; fileName: string; file: string } | null;
  }>({
    incomeTransaction: null,
    expenseTransaction: null,
  });

  // React Hook Form 설정
  const { register, control, handleSubmit, reset, setValue } = useForm<IFormData>({
    defaultValues: {
      incomeTransaction: {
        date: today,
        amount: '',
        detail: '',
        method: '',
        diary: '',
        diaryImg: undefined,
      },
      expenseTransaction: {
        date: today,
        amount: '',
        detail: '',
        method: '',
        diary: '',
        diaryImg: undefined,
      },
    },
  });

  // 선택한 탭에 따라 동적으로 필드명 - 수입 / 지출
  const transactionType = selectedTab === 0 ? 'incomeTransaction' : 'expenseTransaction';

  // 이미지 처리
  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // 상태를 탭별로 업데이트
      setImgFile(prev => ({
        ...prev,
        [transactionType]: {
          type: transactionType,
          fileName: file.name,
          file: URL.createObjectURL(file),
        },
      }));

      // react-hook-form의 값 업데이트
      setValue(`${transactionType}.diaryImg`, file, { shouldValidate: false });
    }
  };

  // form 제출
  const onSubmit: SubmitHandler<IFormData> = data => {
    const formData = {
      type: selectedTab === 0 ? 'income' : 'expense',
      ...data[transactionType],
      date: dayjs(data[transactionType]?.date).format('YYYY-MM-DD'), // 날짜 형태 변경
    };

    console.log('최종 form', formData);

    // @todo: API 호출

    reset(); // 폼 리셋
    closeModal(); // 모달 닫기
  };

  // Tab
  const tabs: TabItem[] = [
    { key: 'income', label: '입금', type: 'incomeTransaction' },
    { key: 'expense', label: '지출', type: 'expenseTransaction' },
  ];

  return (
    <div className="p-5">
      <Tabs tabs={tabs.map(tab => tab.label)} onChange={setSelectedTab}>
        {tabs.map(tab => (
          <Tab.Panel key={tab.key} className="rounded-xl bg-white p-5 shadow">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              {/** 수입 / 수출 form */}
              <DiaryForm
                type={tab.key}
                register={register}
                handleImgChange={handleImgChange}
                imgFile={imgFile[tab.type] || null}
                control={control}
              />

              {/** 버튼  */}
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  title="닫기"
                  className="bg-red-500 hover:bg-red-600 rounded-md px-6 py-2 text-sm font-medium text-black shadow"
                  onClick={closeModal}
                />
                <Button
                  type="submit"
                  className="rounded-md bg-main px-6 py-2 text-sm font-medium text-white shadow hover:bg-blue-600"
                >
                  확인
                </Button>
              </div>
            </form>
          </Tab.Panel>
        ))}
      </Tabs>
    </div>
  );
}

export default Diary;
