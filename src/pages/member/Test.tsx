import LocalList, { LocalData } from './LocalList';
import depthData from '../../assets/local_depth.json';

import { useEffect, useState } from 'react';

function Test() {
  // 상태관리
  const [selectedList, setSelectedList] = useState<LocalData[]>([]); // 선택한 지역 배열에 추가
  const [selectedFirstCode, setSelectedFirstCode] = useState<LocalData | null>(null); // 시/도 클릭한 code 저장
  const [selectedSecondCode, setSelectedSecondCode] = useState<LocalData | null>(null); // 구/군 클릭한 code 저장

  /**
   * 상세설정 선택 함수 -  2가지 필요(시/도 - first, 구/군 - second)
   * 다음 뎁스 체크 + 다음 뎁스 노출
   */
  const handleFirstClick = (item: LocalData) => {
    setSelectedFirstCode(item);
    setSelectedSecondCode(null); // 2Depth 초기화
  };

  const handleSecondClick = (item: LocalData) => {
    setSelectedSecondCode(item);
  };

  // 구/군 필터 data
  const filteredSecond = selectedFirstCode?.children || [];
  // 동/읍/면 필터 data
  const filteredThird = selectedSecondCode?.children || [];

  /**
   * 체크박스 선택 시 함수
   * 선택한 리스트에 담기 + 하위뎁스 전체도 체크
   */
  const handleCheck = (item: LocalData, isChecked: boolean) => {
    setSelectedList(prev => {
      if (isChecked) {
        const { children, ...itemWithoutChildren } = item; // 불필요 - children 제거
        // console.log('체크된 상태의 item', itemWithoutChildren);
        return [...prev, itemWithoutChildren];
      } else {
        // 체크 해제 시
        const { children, ...itemWithoutChildren } = item; // 불필요 - children 제거
        // console.log('체크 해제 Item', itemWithoutChildren);
        return prev.filter(prevItem => prevItem.code !== itemWithoutChildren.code);
      }
    });
  };

  /**
   * filter - 하위 항목이 있는지
   */
  const filterLowestDepth = (selectedList: LocalData[]): LocalData[] => {
    return selectedList.filter(item => {
      // 현재 item의 code가 다른 item의 parent_code와 일치하면 상위 주소이므로 false
      const isParent = selectedList.some(other => other.parent_code === item.code);
      return !isParent;
    });
  };

  /**
   * 부모 데이터 가져오기
   */
  const getParent = (item: LocalData, data: LocalData[] = depthData): LocalData | null => {
    for (const entry of data) {
      if (entry.code === item.parent_code) {
        return entry; // 부모를 찾으면 반환
      }
      if (entry.children) {
        const parent = getParent(item, entry.children); // children 탐색
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  };

  /**
   * 부모의 시/도와 구/군 이름 가져오기
   */
  const getFullLocationName = (item: LocalData): string => {
    const parent = getParent(item); // 현재 항목의 부모 가져오기
    const grandParent = parent ? getParent(parent) : null; // 부모의 부모 가져오기

    const district = item.depth === 3 ? parent?.name || '없음' : ''; // 구/군 이름
    const city = item.depth === 3 ? grandParent?.name || '없음' : parent?.name || '없음'; // 시/도 이름

    switch (item.depth) {
      case 1:
        return `${item.name} 전체`; // 시/도만 선택된 경우
      case 2:
        return `(${city}) ${item.name} 전체`; // 구/군만 선택된 경우
      case 3:
        return `(${city}) ${district} ${item.name}`; // 동/읍/면 선택된 경우
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-wrap gap-[20px]">
      <table>
        <tbody>
          <tr className="flex flex-wrap gap-[20px]">
            <td>
              <LocalList
                title="시/도 (다중선택 가능)"
                data={depthData}
                type="1st"
                onDetailClick={handleFirstClick}
                onCheckChange={handleCheck}
              />
            </td>
            <td>
              <LocalList
                title="구/군 (다중선택 가능)"
                data={filteredSecond}
                type="2nd"
                onDetailClick={handleSecondClick}
                onCheckChange={handleCheck}
              />
            </td>
            <td>
              <LocalList
                title="동/읍/면 (다중선택 가능)"
                type="3rd"
                data={filteredThird}
                onCheckChange={handleCheck}
              />
            </td>
            <td>
              <dl className="border-e3e text-666 h-[223px] w-[233px] overflow-hidden rounded border bg-white">
                <dt className="boredr-b-e3e bg-f5f border-b p-[10px] text-[12px]">선택 지역</dt>
                <dd className="relative h-[185px] overflow-y-auto p-[10px]">
                  <div className="w-full">
                    {selectedList.length === 0 ? (
                      <div
                        id="loc_target_plus_result_none"
                        className="loc_target_plus_result_area absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] whitespace-nowrap"
                      >
                        {/* 기본 문구 */}
                        선택한 시/군/구가 노출됩니다.
                      </div>
                    ) : (
                      <ul id="loc_target_plus_result">
                        {filterLowestDepth(selectedList).map(item => (
                          <li key={item.code} className="flex justify-between">
                            <span>{getFullLocationName(item)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </dd>
              </dl>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

export default Test;
