import LocalList, { LocalData } from './LocalList';
import wholeData from '../../assets/local_depth.json';
import { useState } from 'react';

function Test() {
  /**
   * 화면에서 실제로 눈에 보이는 데이터, 시/도 or 구/군 체크박스 변동시 변경됨
   */
  const [districtSectionData, setDistrictSectionData] = useState<LocalData[]>([]);
  const [townSectionData, setTownSectionData] = useState<LocalData[]>([]);

  /**
   * 화면노출을위해 최근에 상세설정누른 Item 데이터 저장
   */
  const [recentSelectedCity, setRecentSelectedCity] = useState<string | null>(null);
  const [recentSelectedDistrict, setRecentSelectedDistrict] = useState<string | null>(null);

  /**
   * 실제로 선택된 지역 리스트
   */
  const [selectedData, setSelectedData] = useState<LocalData[]>([]);

  // 시/도 상세 설정 클릭 시 동작 없으면 채우고 있으면 비우고
  const handleCityDetailClick = (item: LocalData) => {
    const code = item.code;
    const city = wholeData.find(data => data.code === code);

    if (recentSelectedCity === code) {
      setDistrictSectionData([]);
      setRecentSelectedCity(null);
      setTownSectionData([]);
      setRecentSelectedDistrict(null);
    } else {
      setDistrictSectionData(city.children);
      setRecentSelectedCity(code);
    }
  };

  // 구/군 상세 설정 클릭 시 동작  없으면 채우고 있으면 비우고
  const handleDistrictDetailClick = (item: LocalData) => {
    const code = item.code;
    const district: LocalData = districtSectionData?.find(data => data.code === code)!!;
    console.log({ district: district });

    if (recentSelectedDistrict === code) {
      setTownSectionData([]);
      setRecentSelectedDistrict(null);
    } else {
      if (district && district.children) {
        setTownSectionData(district.children);
      }
      setRecentSelectedDistrict(code);
    }
  };

  function hasChild(item) {
    return item?.depth === 1 || item?.depth === 2;
  }

  /**
   * @description 지역 선택 시 데이터 담기
   * @param item 선택한 아이템
   * @param isChecked 체크여부
   */
  const handleCheckChange = (item: LocalData, isChecked: boolean) => {
    console.log('item', item);
    console.log('isChecked', isChecked);
    /*체크하면 selectedDate에 item 추가*/
    if (isChecked) {
      /* 1, 2 번 뎁스면 첫번째 자식까지만 추가*/
      if (hasChild(item)) {
        if (item?.children?.length > 0) {
          setSelectedData(prev => [...prev, item?.children?.find(data => data.is_whole)]);
        }
      }

      if (item.is_whole) {
        /**
         * @TODO is_whloe인 아이가 선택되면 is_whole이아닌 형제와 그 자녀 제거
         * */
      } else {
        /* 나와 같은 뎁스, 같은부모에 선택된 is_whole이 있으면 제외 */
        const isWhole = selectedData.some(
          data =>
            data.depth === item.depth && data.parent_code === item.parent_code && data.is_whole,
        );
        if (selectedData.some(() => isWhole)) {
          setSelectedData(prev => prev.filter(data => !isWhole));
        }
      }

      setSelectedData(prev => [...prev, item]);
    } else {
      /**
       * 체크 해제하면 selectedDate 에서 item 제거
       * selectedData에서 제거된 item의 code가 parent_code인 orphan 데이터가 있는지 확인하고 selectedData에서 orphan데이터도 제거
       * */
      setSelectedData(prev => prev.filter(data => data !== item && data.parent_code !== item.code));
    }
    console.log({ selectedData });
  };

  /**
   * 자식에의해 보여지는 데이터인가?
   * check는 되어있고, 노출은 안되어야하는 케이스를 위해 존재하는 함수
   * */
  const isRepresentativeByChild = (item): boolean => {
    return (
      hasChild(item) &&
      selectedData &&
      selectedData.some(data => data.depth === item.depth + 1 && data.parent_code === item.code)
    );
  };

  /*부모 가져오기*/
  const getParent = (item: LocalData): LocalData | undefined => {
    return (
      selectedData &&
      selectedData.find(data => data?.depth === item?.depth - 1 && data?.code === item?.parent_code)
    );
  };

  // 선택 지역 리스트 - 상위 지역 정보 찾기
  const getFullLocationName = (item: LocalData): string => {
    console.log({ selectedData });
    console.log({ item });
    console.log({ Dd: isRepresentativeByChild(item) });
    const district = item.depth === 3 ? getParent(item)?.name : '';
    const city = item.depth === 3 ? getParent(getParent(item)!!)?.name : getParent(item)?.name;
    switch (item.depth) {
      case 1:
        return isRepresentativeByChild(item) ? '' : `${item.children[0].name} 1`;
      case 2:
        return isRepresentativeByChild(item)
          ? ''
          : item.is_whole
            ? item.name
            : `(${city}) ${item.name} 2`;
      case 3:
        return item.is_whole ? `(${city}) ${item.name} 3` : `(${city}) ${district} ${item.name} 3`;
      default:
        return;
    }
  };

  return (
    <div className="flex flex-wrap gap-[20px]">
      <table>
        <tbody>
          {/** @todo 장소 설정 리스트 */}
          <tr className="flex flex-wrap gap-[20px]">
            <td>
              <LocalList
                title="시/도 (다중선택 가능)"
                data={wholeData}
                type="1st"
                onDetailClick={handleCityDetailClick}
                onCheckChange={handleCheckChange} // 함수 전달
                selectedData={selectedData}
              />
            </td>
            <td>
              <LocalList
                title="구/군 (다중선택 가능)"
                data={districtSectionData}
                type="2nd"
                onDetailClick={handleDistrictDetailClick}
                onCheckChange={handleCheckChange} // 함수 전달
                selectedData={selectedData}
              />
            </td>
            <td>
              <LocalList
                title="동/읍/면 (다중선택 가능)"
                data={townSectionData}
                type="3rd"
                onCheckChange={handleCheckChange} // 함수 전달
                selectedData={selectedData}
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
                          <li key={`${item.depth}-${item.code}`} className="flex justify-between">
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
