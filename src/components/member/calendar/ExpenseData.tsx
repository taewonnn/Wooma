import { useForm, SubmitHandler } from 'react-hook-form';
import { useModalStore } from '../../../stores/useModalStore';
import Button from '../../common/button/Button';
import { expenseMethods, incomeMethods } from '../../../constants';
import { useState } from 'react';
import Tabs from '../../common/Tabs/Tabs';
import { Tab } from '@headlessui/react';

// 폼 데이터 타입 정의
interface IFormData {
  category: string;
  amount: string;
  detail?: string;
  method: string;
}

function ExpenseData() {
  const { closeModal } = useModalStore();
  const { register, handleSubmit, reset } = useForm<IFormData>();

  // tab 상태 관리
  const [selectedTab, setSelectedTab] = useState(0);

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<IFormData> = data => {
    const category = selectedTab === 0 ? '입금' : '지출';
    console.log('form data:', data, category);

    // @todo: 서버 API 호출
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
