import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ITabs {
  tabs: string[]; // 탭 이름 배열
  onChange?: (index: number) => void; // 탭 변경 이벤트 핸들러
  children: React.ReactNode; // 각 탭 콘텐츠
}

function Tabs({ tabs, onChange, children }: ITabs) {
  return (
    <Tab.Group onChange={onChange}>
      {/* Tab Header */}
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {tabs.map(tab => (
          <Tab
            key={tab}
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
            {tab}
          </Tab>
        ))}
      </Tab.List>

      {/* Tab Panels */}
      <Tab.Panels className="mt-4 min-w-[307px] max-w-[400px] sm:w-[360px]">{children}</Tab.Panels>
    </Tab.Group>
  );
}

export default Tabs;
