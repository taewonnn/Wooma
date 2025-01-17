import React from 'react';

export interface SpotData {
  name: string;
  code: string;
  count: number;
}

interface ISpotList {
  category: string; // 카테고리 이름
  items: SpotData[]; // 카테고리에 속하는 데이터
  onCheckChange: (item: SpotData, isChecked: boolean) => void; // 체크 함수
}

/** 장소 리스트 */
function SpotList({ category, items, onCheckChange }: ISpotList) {
  return (
    <dl className="border-e3e text-666 h-[223px] w-[233px] overflow-hidden rounded border bg-white">
      <dt className="boredr-b-e3e bg-f5f border-b p-[10px] text-[12px]">{category}</dt>
      <dd>
        <div className="h-[185px] overflow-y-auto p-[10px]">
          <ul className="flex flex-col gap-[10px]">
            {items.map(item => (
              <li className="flex items-center gap-[5px]" key={item.code}>
                <input
                  type="checkbox"
                  className="loc_target_plus_store_chkbox loc_target_plus_stores border-e3e checked:!bg-17a flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border bg-white bg-no-repeat checked:bg-[url('./assets/svg/check.svg')] checked:bg-[length:14px_9px] checked:ring-0 focus:shadow-none focus:ring-0"
                  id={`loc_target_plus_store_${item.code}`}
                  onChange={e => onCheckChange(item, e.target.checked)}
                />
                <label htmlFor={`loc_target_plus_store_${item.code}`}>{item.name}</label>
              </li>
            ))}
          </ul>
        </div>
      </dd>
    </dl>
  );
}

export default React.memo(SpotList);
