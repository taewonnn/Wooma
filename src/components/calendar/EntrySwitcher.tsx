import { useState } from 'react';
import Diary from './Diary';
import Expense from './Expense';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function EntrySwitcher({ closeModal }: { closeModal: () => void }) {
  let [categories] = useState({
    지출: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    일기: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });
  /** toggle 상태 */
  const [isSelected, SetIsSelected] = useState(false);

  /** toggle 상태 변경 함수 */
  const toggleSelection = () => {
    SetIsSelected(!isSelected);
  };

  return (
    <>
      <div className="h-8 w-32 rounded-full p-1 flex cursor-pointer" onClick={toggleSelection}>
        <div
          className={`h-full w-1/4 rounded-full transition-transform duration-200 ${
            isSelected ? 'bg-blue-500 transform translate-x-full' : 'bg-green-500'
          }`}
        >
          {isSelected ? '일기' : '지출'}
        </div>
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map(category => (
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
      </Tab.Group>

      {isSelected ? <Diary closeModal={closeModal} /> : <Expense closeModal={closeModal} />}
    </>
  );
}

export default EntrySwitcher;
