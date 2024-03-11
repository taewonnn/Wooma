import { ICreateForm } from './types/calendar';

/** 입력한 기존 수입/지출내역 가져오기 - 테스트용 json */
/** json -server X : /testdata.json */
export function getfinancialTransactions() {
  return fetch('/testdata.json')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network error');
      }
      return res.json();
    })
    .then((data) => data.transactions);
}

/** 입력한 기존 수입/지출내역 가져오기 - 테스트용 json */
/** json -server 이용시 : http://localhost:3000/transactions */
// $ : json-server --watch public/testdata.json
// export function getfinancialTransactions() {
//   return fetch('http://localhost:3000/transactions')
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Network error');
//       }
//       return res.json();
//     })
//     .then((data) => data);
// }

/** 내역 추가하기 - 테스트용 json */
export function postFinancialTransactions(newData: ICreateForm) {
  return fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Network error');
    }
    return res.json();
  });
}
