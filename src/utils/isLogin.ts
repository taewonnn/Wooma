/** 로그인 상태 확인 함수 */
export const isLoggedIn = () => {
  // 테스트 위해 user 지정
  const user = 1;

  // 비로그인 시
  // const user = false;
  if (user) {
    return true;
  }
  return false;
};
