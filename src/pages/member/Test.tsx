import LocalList, { LocalData } from './LocalList';
import depthData from '../../assets/local_depth.json';

import { useEffect, useState } from 'react';

function Test() {
  // 상태관리
  const [selectedList, setSelectedList] = useState<LocalData[]>([]); // 선택한 지역 배열에 추가
  const [selectedFirstCode, setSelectedFirstCode] = useState<LocalData | null>(null); // 시/도 클릭한 code 저장
  const [selectedSecondCode, setSelectedSecondCode] = useState<LocalData | null>(null); // 구/군 클릭한 code 저장
  const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({}); // 체크 상태용

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

  const updateParentState = (item: LocalData, updatedList: LocalData[]) => {
    // 상위 "전체" 항목 해제
    const parent = depthData.find(parent => parent.code === item.parent_code);
    if (parent) {
      const wholeItem = parent.children?.find(child => child.is_whole);
      if (wholeItem) {
        const index = updatedList.findIndex(i => i.code === wholeItem.code);
        if (index > -1) {
          updatedList.splice(index, 1); // 리스트에서 "전체" 항목 제거
        }
      }
    }
  };

  const updateChildState = (item: LocalData, updatedList: LocalData[]) => {
    // 하위 항목 모두 해제
    if (item.children) {
      item.children.forEach(child => {
        const index = updatedList.findIndex(i => i.code === child.code);
        if (index > -1) {
          updatedList.splice(index, 1); // 리스트에서 하위 항목 제거
        }
      });
    }
  };

  /**
   * 체크박스 선택 시 함수
   * 선택한 리스트에 담기 + 하위뎁스 전체도 체크
   */
  const handleCheck = (item: LocalData, isChecked: boolean) => {
    setSelectedList(prev => {
      const updatedList = [...prev];

      if (isChecked) {
        // "전체" 선택 시 하위 항목 제거
        if (item.is_whole) {
          updateChildState(item, updatedList);
        } else {
          // 세부 항목 선택 시 상위 "전체" 제거
          updateParentState(item, updatedList);
        }
        // 현재 항목 추가
        if (!updatedList.some(i => i.code === item.code)) {
          updatedList.push({ ...item, children: undefined });
        }
      } else {
        // 현재 항목 제거
        const index = updatedList.findIndex(i => i.code === item.code);
        if (index > -1) {
          updatedList.splice(index, 1);
        }
      }

      return updatedList;
    });

    // 체크 상태 업데이트
    setCheckedStates(prev => {
      const newState = { ...prev, [item.code]: isChecked };

      // "전체" 체크 시 하위 항목 체크 해제
      if (item.is_whole && item.children) {
        item.children.forEach(child => {
          newState[child.code] = false;
        });
      }

      // 세부 항목 체크 시 상위 "전체" 해제
      if (!item.is_whole) {
        const parent = depthData.find(parent => parent.code === item.parent_code);
        if (parent) {
          const wholeItem = parent.children?.find(child => child.is_whole);
          if (wholeItem) {
            newState[wholeItem.code] = false;
          }
        }
      }

      return newState;
    });
  };

  useEffect(() => {
    console.log('담긴 List:', selectedList);
  }, [setSelectedList, selectedList]);

  return (
    <div className="flex flex-wrap gap-[20px]">
      <table>
        <tbody>
          {/** @todo 장소 설정 리스트 */}
          <tr className="flex flex-wrap gap-[20px]">
            <td>
              <LocalList
                title="시/도 (다중선택 가능)"
                data={depthData}
                type="1st"
                onDetailClick={handleFirstClick}
                onCheckChange={handleCheck}
                checkedStates={checkedStates}
              />
            </td>
            <td>
              <LocalList
                title="구/군 (다중선택 가능)"
                data={filteredSecond}
                type="2nd"
                onDetailClick={handleSecondClick}
                onCheckChange={handleCheck}
                checkedStates={checkedStates}
              />
            </td>
            <td>
              <LocalList
                title="동/읍/면 (다중선택 가능)"
                type="3rd"
                data={filteredThird}
                onCheckChange={handleCheck}
                checkedStates={checkedStates}
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
                        {selectedList.map(item => (
                          <li key={`${item.code}`} className="flex justify-between">
                            <span>{item.name}</span>
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
