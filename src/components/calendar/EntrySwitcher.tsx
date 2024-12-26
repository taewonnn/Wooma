import { useState } from 'react';
import Diary from './Diary';
import Expense from './Expense';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const categories = ['지출', '일기'];

function EntrySwitcher({ closeModal }: { closeModal: () => void }) {
  /** toggle 상태 */
  const [isSelected, SetIsSelected] = useState(false);

  /** toggle 상태 변경 함수 */
  const toggleSelection = () => {
    SetIsSelected(!isSelected);
  };

  return (
    <div className='p-5'>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map(category => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
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
        <Tab.Panels>
          <Tab.Panel className="w-[700px] h-[700px]">
            <Expense closeModal={closeModal} />
          </Tab.Panel>
          <Tab.Panel className="w-[700px] h-[700px]">
            <Diary closeModal={closeModal} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default EntrySwitcher;
