/** 입력한 기존 수입/지출내역 가져오기 - 테스트용 json */
export function getfinancialTransactions() {
  return fetch('/testdata.json')
    .then((res) => res.json())
    .then((data) => data.transactions);
}

/** 내역 추가하기 - 테스트용 json */
export function postFinancialTransactions(newData: any) {
  return fetch('/testdata.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('newtwork erro');
    }
    return res.json();
  });
}
