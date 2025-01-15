export interface LocalData {
  code: string;
  name: string;
  parent_code?: string;
}

interface ILocalList {
  title: string; // 섹션 제목 (시/도, 구/군, 동/읍/면)
  type: '1st' | '2nd' | '3rd'; // 타입: 시/도, 구/군, 동/읍/면
  data: LocalData[]; // json 데이터 리스트
  parentCode?: string; // 선택된 상위 지역 코드 (구/군에서 필요)
  onDetailClick?: (code: string) => void;
  onCheckChange?: (item: LocalData, isChecked: boolean) => void; // 체크박스 상태 변경 핸들러
}
export default function LocalList({ title, type, data, onDetailClick, onCheckChange }: ILocalList) {
  return (
    <dl className="border-e3e text-666 h-[223px] w-[233px] overflow-hidden rounded border bg-white">
      <dt className="boredr-b-e3e bg-f5f border-b p-[10px] text-[12px]">{title}</dt>
      <dd>
        <div className="h-[185px] overflow-y-auto p-[10px]">
          <ul className="flex flex-col gap-[10px]">
            {data.map(item => (
              <li key={item.code} className="flex items-center gap-[5px]">
                <input
                  type="checkbox"
                  className={`chkbox_loc_target_plus chk_loc_target_plus_${type} border-e3e checked:!bg-17a flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border bg-white bg-no-repeat checked:bg-[url('./assets/svg/check.svg')] checked:bg-[length:14px_9px] checked:ring-0 focus:shadow-none focus:ring-0`}
                  name={`loc_target_plus_${type}_chk[]`}
                  id={`loc_target_plus_${type}_${item.code}`}
                  data-code={item.code}
                  data-depth={type.split('')[0]}
                  data-name={type === '1st' ? item.name + ' 전체' : item.name}
                  value={item.code}
                  onChange={e => onCheckChange?.(item, e.target.checked)} // 체크박스 상태 전달
                />
                <label htmlFor={`loc_target_plus_${type}_${item.code}`}>{item.name}</label>
                {(type === '1st' || (type === '2nd' && !item.name.includes('전체'))) && (
                  <span
                    id={`loc_target_plus_${type}_${item.code}_span`}
                    className="flex cursor-pointer"
                    onClick={() => {
                      console.log('Detail Click Code: ', item.code);
                      onDetailClick?.(item.code);
                    }}
                  >
                    &#62; 상세설정
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </dd>
    </dl>
  );
}
