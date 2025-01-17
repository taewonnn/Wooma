import { useEffect, useState } from 'react';

import LocalList, { LocalData } from './LocalList';
import jsonLocal from '../../assets/local_depth.json';
import jsonSpot from '../../assets/spot.json';
import SpotList, { SpotData } from './SpotList';

export default function LocalPlusTemp() {
  // 지역 - 상태관리
  const [selectedList, setSelectedList] = useState<LocalData[]>([]); // 선택한 지역 배열에 추가
  const [selectedFirstCode, setSelectedFirstCode] = useState<LocalData | null>(null); // 시/도 클릭한 code 저장
  const [selectedSecondCode, setSelectedSecondCode] = useState<LocalData | null>(null); // 구/군 클릭한 code 저장
  const [codes, setCodes] = useState<string>(''); // 선택된 code 값을 문자열로 저장

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

  // 필터 데이터
  const filteredSecond = selectedFirstCode?.children || []; // 구/군 data
  const filteredThird = selectedSecondCode?.children || []; // 동/읍/면 data

  /**
   * 체크박스 선택 시 함수
   * 선택한 리스트에 담기 + 하위뎁스 전체도 체크
   */
  const handleCheck = (item: LocalData, isChecked: boolean) => {
    setSelectedList(prev => {
      if (isChecked) {
        const { children, ...itemWithoutChildren } = item; // 불필요 - children 제거
        return [...prev, itemWithoutChildren];
      } else {
        // 체크 해제 시
        const { children, ...itemWithoutChildren } = item; // 불필요 - children 제거
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
   * 필터링된 선택 지역에서 code만 추출
   */
  useEffect(() => {
    const selectedCodes = filterLowestDepth(selectedList)
      .map(item => item.code)
      .join(','); // code를 ','로 구분해 문자열로 변환
    setCodes(selectedCodes);
  }, [selectedList]);

  /**
   * 부모 데이터 가져오기
   */
  const getParent = (item: LocalData, data: LocalData[] = jsonLocal): LocalData | null => {
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

  /** 미사용 함수로 보여 주석 처리 */
  // if (idx != '') {
  //   fnc_location_infos(idx);
  // }

  // @todo 장소 설정 - 상태관리
  const [toggleSpot, setToggleSpot] = useState(false); // on/off 상태
  const [selectedSpotList, setSelectedSpotList] = useState<SpotData[]>([]); // 선택한 장소 리스트
  const [spotCodes, setSpotCodes] = useState('');

  /**
   * 장소 on/off 토글
   */
  const handleOnOff = () => setToggleSpot(prev => !prev);

  /**
   * 장소 input 체크
   */
  const handleSpotCheck = (item: SpotData, isChecked: boolean) => {
    setSelectedSpotList(
      prev =>
        isChecked
          ? [...prev, item] // 추가
          : prev.filter(prevItem => prevItem.code !== item.code), // 제거
    );
  };

  /**
   * POST용 데이터 - 선택한 장소 리스트에서 코드값만 추출
   */
  useEffect(() => {
    const filteredSpotCodes = selectedSpotList.map(spot => spot.code).join(',');
    setSpotCodes(filteredSpotCodes);
  }, [selectedSpotList]);

  useEffect(() => {
    console.log('최종 선택 list', selectedSpotList);
  }, [selectedSpotList, setSelectedSpotList]);

  return (
    <form name="frm" id="frm" method="post">
      <input type="hidden" id="keyword_localplus_dmp_types" value="localplus" />
      <input type="hidden" id="commit_status" value="false" />
      <input type="hidden" id="idx" />
      <div className="flex items-center gap-[20px] pl-[10px]">
        <div className="text-222 min-w-[110px] font-bold">소재명</div>
        <div className="relative w-[55%]">
          <input
            type="text"
            name="resource_name"
            id="resource_name"
            className="border-e3e h-[38px] w-full rounded-[3px] border p-[10px] pr-[60px] focus:border-main focus:ring-0"
            placeholder="소재명을 입력해주세요."
            // onChange={e => fnc_resourcename_change()}
            // onInput={e =>
            //   $(e.target).css('color', (e.target as HTMLInputElement).value ? '#666' : '#999')
            // }
            // defaultValue={name}
            onKeyPress={e => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          />
          <span className="text-999 absolute right-[10px] top-[10px]">
            <span id="resource_bytecnt">0</span>/45자
          </span>
        </div>
      </div>
      <div className="bg-f5f my-[15px] min-h-[1px] w-full"></div>
      <div className="flex items-center gap-[20px] pl-[10px]">
        {/* @todo - 스토어/복합몰/브랜드 구분해서 코드 적용해야함  POST용 data */}
        <input type="hidden" name="local_checked_codes" id="local_checked_codes" value={codes} />
        <input
          type="hidden"
          name="local_store_checked_codes"
          id="local_store_checked_codes"
          value={spotCodes}
        />
        <input
          type="hidden"
          name="local_multiplex_checked_codes"
          id="local_multiplex_checked_codes"
        />
        <input type="hidden" name="local_brand_checked_codes" id="local_brand_checked_codes" />
        <div className="text-222 min-w-[110px] font-bold">설정</div>
        <div className="flex flex-wrap gap-[20px]">
          <table>
            <tbody>
              <tr className="flex flex-wrap gap-[20px]">
                <td>
                  <LocalList
                    title="시/도 (다중선택 가능)"
                    data={jsonLocal}
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
                            {/* <MapMarker /> */}
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
      </div>
      {/** 장소 */}
      <div className="bg-f5f my-[15px] min-h-[1px] w-full"></div>
      <div className="flex items-center gap-[20px] pl-[10px]">
        <div className="text-222 min-w-[110px] font-bold">
          <div className="text-222 flex cursor-pointer items-center gap-[5px]">
            장소 설정
            {/* 장소 설정 <QuestionTooltip content={`해당 지역의 방문 장소까지 타게팅합니다.`} /> */}
          </div>
        </div>
        <div className="flex items-center justify-start gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <button
              name="location_plus_store"
              id="location_plus_store"
              className={`relative h-[28px] w-[60px] rounded-full text-[11px] font-bold transition-colors ${
                toggleSpot ? 'bg-main text-white' : 'bg-ddd text-[#a9a9a9]'
              } `}
              type="button"
              onClick={handleOnOff}
            >
              <span className="inline-flex h-[28px] w-[30px] items-center justify-center pl-[12px]">
                ON
              </span>
              <span className="inline-flex h-[28px] w-[30px] items-center justify-center pr-[8px]">
                OFF
              </span>
              <div
                id="location_plus_store_sub"
                className={`absolute left-0 top-0 z-10 flex h-[28px] w-[30px] items-center justify-center rounded-[1000px] bg-inherit transition-transform ${
                  toggleSpot ? 'translate-x-full' : ''
                }`}
              >
                <div className="h-[20px] w-[20px] rounded-[1000px] bg-white"></div>
              </div>
            </button>
            {toggleSpot && (
              <div
                className="location_plus_store_area text-999 flex"
                style={{ visibility: toggleSpot ? 'visible' : 'hidden' }}
              >
                <table>
                  <tbody>
                    <tr className="flex flex-wrap gap-[20px]">
                      {/* 장소 리스트 */}
                      <td>
                        <SpotList
                          category="스토어"
                          items={jsonSpot[0].items}
                          onCheckChange={handleSpotCheck}
                        />
                      </td>
                      <td>
                        <SpotList
                          category="복합몰"
                          items={jsonSpot[1].items}
                          onCheckChange={handleSpotCheck}
                        />
                      </td>
                      <td>
                        <SpotList
                          category="브랜드"
                          items={jsonSpot[2].items}
                          onCheckChange={handleSpotCheck}
                        />
                      </td>
                      <td>
                        <dl className="border-e3e text-666 h-[223px] w-[233px] overflow-hidden rounded border bg-white">
                          <dt className="boredr-b-e3e bg-f5f border-b p-[10px] text-[12px]">
                            선택 장소
                          </dt>
                          <dd className="relative h-[185px] overflow-y-auto p-[10px]">
                            <div className="w-full">
                              <div id="loc_target_plus_store_result">
                                {selectedSpotList.length === 0 ? (
                                  <div
                                    id="loc_target_plus_store_result_none"
                                    className="loc_target_plus_store_result_area absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] whitespace-nowrap"
                                  >
                                    {/* <MapMarker /> */}
                                    선택한 장소가 노출됩니다.
                                  </div>
                                ) : (
                                  selectedSpotList.map(spot => (
                                    <li key={spot.code} className="flex justify-between">
                                      <span>{spot.name}</span>
                                    </li>
                                  ))
                                )}
                              </div>
                            </div>
                          </dd>
                        </dl>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
