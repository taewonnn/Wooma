/** 입력한 기존 수입/지출내역 가져오기 - 테스트용 json */
export function getfinancialTransactions() {
  return fetch('/testdata.json').then((res) => {
    return res.json();
  });
}
