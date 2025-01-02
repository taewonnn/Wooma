import { Tab } from '@headlessui/react';
import { useModalStore } from '../../../stores/useModalStore';
import Button from '../../common/button/Button';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function ExpenseData() {
  // 모달
  const { closeModal } = useModalStore();

  return (
    <div className="p-5">
      <Tab.Group>
        {/* 탭 헤더 */}
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['입금', '지출'].map(category => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        {/* 탭 콘텐츠 */}
        <Tab.Panels className="mt-4 min-w-[400px]">
          {/* 입금 탭 */}
          <Tab.Panel className="rounded-xl bg-white p-5 shadow">
            <form className="flex flex-col gap-6">
              {/** 금액 */}
              <div>
                <label
                  htmlFor="income"
                  className="text-gray-700 block text-left text-sm font-medium" // 왼쪽 정렬
                >
                  금액
                </label>
                <input
                  id="income"
                  type="text"
                  placeholder="금액"
                  className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              {/** 상세내용 */}
              <div>
                <label
                  htmlFor="income-detail"
                  className="text-gray-700 block text-left text-sm font-medium" // 왼쪽 정렬
                >
                  상세내용
                </label>
                <input
                  id="income-detail"
                  type="text"
                  placeholder="메모"
                  className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              {/** 수단 */}
              <div className="flex items-center gap-6">
                <label className="flex items-center text-left">
                  <input type="radio" name="income-method" value="salary" className="mr-2" />
                  월급
                </label>
                <label className="flex items-center text-left">
                  <input type="radio" name="income-method" value="allowance" className="mr-2" />
                  용돈
                </label>
                <label className="flex items-center text-left">
                  <input type="radio" name="income-method" value="carryOver" className="mr-2" />
                  이월
                </label>
                <label className="flex items-center text-left">
                  <input type="radio" name="income-method" value="other" className="mr-2" />
                  기타
                </label>
              </div>
            </form>
          </Tab.Panel>

          {/* 지출 탭 */}
          <Tab.Panel className="rounded-xl bg-white p-5 shadow">
            <form className="flex flex-col gap-6">
              {/** 금액 */}
              <div>
                <label
                  htmlFor="expense"
                  className="text-gray-700 block text-left text-sm font-medium" // 왼쪽 정렬
                >
                  금액
                </label>
                <input
                  id="expense"
                  type="text"
                  placeholder="금액"
                  className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              {/** 상세내용 */}
              <div>
                <label
                  htmlFor="expense-detail"
                  className="text-gray-700 block text-left text-sm font-medium" // 왼쪽 정렬
                >
                  상세내용
                </label>
                <input
                  id="expense-detail"
                  type="text"
                  placeholder="메모"
                  className="border-gray-300 w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              {/** 결제수단 */}
              <div className="flex items-center gap-6">
                <label className="flex items-center text-left">
                  <input type="radio" name="expense-method" value="card" className="mr-2" />
                  신용카드
                </label>
                <label className="flex items-center text-left">
                  <input type="radio" name="expense-method" value="cash" className="mr-2" />
                  현금
                </label>
                <label className="flex items-center text-left">
                  <input type="radio" name="expense-method" value="checkCard" className="mr-2" />
                  체크카드
                </label>
                <label className="flex items-center text-left">
                  <input type="radio" name="expense-method" value="other" className="mr-2" />
                  기타
                </label>
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/** 버튼 */}
      <div className="mt-6 flex justify-end gap-4">
        <Button className="rounded-md bg-main px-6 py-2 text-sm font-medium text-white shadow hover:bg-blue-600">
          확인
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 rounded-md px-6 py-2 text-sm font-medium text-black shadow"
          onClick={closeModal}
        >
          취소
        </Button>
      </div>
    </div>
  );
}

export default ExpenseData;
