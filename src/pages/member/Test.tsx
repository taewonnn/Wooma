import LocalList, { LocalData } from './\bLocalList';
import depthData from '../../assets/local_depth.json';

import { useEffect, useState } from 'react';

function Test() {
  // 데이터 필터 - 시/도
  const depth1Items = depthData.filter(data => data.depth === 1);

  // 상태관리
  const [selectedList, setSelectedList] = useState<LocalData[]>([]); // 선택한 지역 배열에 추가
  const [selectedFirstCode, setSelectedFirstCode] = useState<string | null>(null); // 시/도 클릭한 code 저장
  const [selectedSecondCode, setSelectedSecondCode] = useState<string | null>(null); // 구/군 클릭한 code 저장

  /**
   * 상세설정 선택 함수 -  2가지 필요(시/도 - first, 구/군 - second)
   * 다음 뎁스 체크 + 다음 뎁스 노출
   */
  const handleFirstClick = (code: string) => {
    setSelectedFirstCode(code);
    setSelectedSecondCode(null);
  };

  const handleSecondClick = (code: string) => {
    setSelectedSecondCode(code);
  };

  // 구/군 필터 -> code 이용
  const filteredSecond = depthData
    .flatMap(data => data.children)
    .filter(data => data.parent_code === selectedFirstCode);
  // console.log('구/군 필터', filteredSecond);

  // 동/읍/면 필터 -> code 이용
  const filteredThird = filteredSecond
    .filter(data => data.code === selectedSecondCode)
    .flatMap(data => data.children);
  // console.log('동/읍/면 필터', filteredThird);

  /**
   * 체크박스 선택 시 함수
   * 선택한 리스트에 담기 + 하위뎁스 전체도 체크
   */
  const handleCheck = (item: LocalData, isChecked: boolean) => {
    // 값 저장
    setSelectedList(prev => {
      // 체크된 상태
      if (isChecked) {
        return [...prev, item];
      } else {
        // 체크 해제 시
        return prev.filter(prevItem => prevItem.code !== item.code);
      }
    });
  };

  useEffect(() => {
    console.log('체크된 items list', selectedList);
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
                data={depth1Items}
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
                  <div className="w-full"></div>
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
