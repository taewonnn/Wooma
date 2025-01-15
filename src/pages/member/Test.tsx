import LocalList, { LocalData } from './\bLocalList';
import firstLocal from '../../assets/first_local.json';
import secondLocal from '../../assets/second_local.json';
import thirdLocal from '../../assets/third_local.json';
import { useEffect, useState } from 'react';

function Test() {
  // 체크박스 리스트 상태관리
  const [selectedData, setSelectedData] = useState<LocalData[]>([]);
  // 현재 선택된 시/도 코드를 저장
  const [selectedCityCode, setSelectedCityCode] = useState<string | null>(null);
  // 현재 선택된 구/군 코드를 저장
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);

  // 시/도 상세 설정 클릭 시 동작
  const handleCityDetailClick = (code: string) => {
    setSelectedCityCode(code);
    setSelectedDistrictCode(null); // 구/군 초기화
  };

  // 구/군 상세 설정 클릭 시 동작
  const handleDistrictDetailClick = (code: string) => {
    setSelectedDistrictCode(code);
  };

  // 지역 선택 시 데이터 담기
  const handleCheckChange = (item: LocalData, isChecked: boolean) => {
    if (isChecked) {
      setSelectedData(prev => [...prev, item]);
    } else {
      setSelectedData(prev => prev.filter(data => data.code !== item.code));
    }
  };

  // 삭제
  const handleRemoveSelected = (code: string) => {
    setSelectedData(prev => prev.filter(data => data.code !== code));
  };

  // 선택 지역 리스트 - 상위 지역 정보 찾기
  const getFullLocationName = (item: LocalData): string => {
    const district = secondLocal.find(d => d.code === item.parent_code);
    const city = firstLocal.find(c => c.code === district?.parent_code);

    if (item.code.length === 2) {
      return `${item.name} 전체`;
    } else {
      return `(${city?.name || ''}) ${district?.name || ''} ${item.name}`;
    }
  };

  // 선택된 시/도에 해당하는 구/군 데이터 필터링
  const filteredDistricts = secondLocal.filter(
    district => district.parent_code === selectedCityCode,
  );

  useEffect(() => {
    console.log('districts', filteredDistricts);
  }, [setSelectedDistrictCode]);

  // 선택된 구/군에 해당하는 동/읍/면 데이터 필터링
  const filteredTowns = thirdLocal.filter(town => town.parent_code === selectedDistrictCode);
  console.log(filteredTowns);

  return (
    <div className="flex flex-wrap gap-[20px]">
      <table>
        <tbody>
          {/** @todo 장소 설정 리스트 */}
          <tr className="flex flex-wrap gap-[20px]">
            <td>
              <LocalList
                title="시/도 (다중선택 가능)"
                data={firstLocal}
                type="1st"
                onDetailClick={handleCityDetailClick}
                onCheckChange={handleCheckChange} // 함수 전달
              />
            </td>
            <td>
              <LocalList
                title="구/군 (다중선택 가능)"
                data={filteredDistricts}
                type="2nd"
                onDetailClick={handleDistrictDetailClick}
                onCheckChange={handleCheckChange} // 함수 전달
              />
            </td>
            <td>
              <LocalList
                title="동/읍/면 (다중선택 가능)"
                data={filteredTowns}
                type="3rd"
                onCheckChange={handleCheckChange} // 함수 전달
              />
            </td>
            <td>
              <dl className="border-e3e text-666 h-[223px] w-[233px] overflow-hidden rounded border bg-white">
                <dt className="boredr-b-e3e bg-f5f border-b p-[10px] text-[12px]">선택 지역</dt>
                <dd className="relative h-[185px] overflow-y-auto p-[10px]">
                  <div className="w-full">
                    {selectedData.length === 0 ? (
                      <div
                        id="loc_target_plus_result_none"
                        className="loc_target_plus_result_area absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] whitespace-nowrap"
                      >
                        {/* 기본 문구 */}
                        선택한 시/군/구가 노출됩니다.
                      </div>
                    ) : (
                      <ul id="loc_target_plus_result">
                        {selectedData.map(item => (
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
