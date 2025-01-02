/**
 * 숫자를 세 자리마다 ,를 추가하는 함수
 * @param value - format 숫자 또는 문자열
 * @returns format한 문자열
 */
export const formatNumber = (value: number | string): string => {
  // 숫자 또는 숫자 형식의 문자열인지 확인
  if (typeof value === 'string' && isNaN(Number(value))) {
    throw new Error('Invalid input: value must be a number or numeric string');
  }

  // 문자열을 숫자로 변환
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;

  // 숫자를 세 자리마다 , 추가
  return numberValue.toLocaleString('en-US');
};

/**
 * 지정된 길이를 초과하면 말줄임(...) 처리
 * @param value - format 문자열 또는 숫자
 * @param maxLength - 최대 길이
 * @returns format한 문자열
 */
export const truncateText = (value: number | string, maxLength: number): string => {
  const stringValue = String(value); // 숫자 또는 문자열을 문자열로 변환
  return stringValue.length > maxLength ? `${stringValue.slice(0, maxLength)}...` : stringValue;
};
