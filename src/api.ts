import { ICreateExpenseForm } from './types/calendar';

/** GET */
export function get(url: string) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error('Network error');
    }
    return res.json();
  });
}

/** 입력한 기존 수입/지출내역 가져오기 - 테스트용 json */
/** json -server 이용시 : http://localhost:3000/transactions */
// $ : json-server --watch public/expenseData.json
// export function getTransactions() {
//   return fetch('http://localhost:3000/transactions')
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Network error');
//       }
//       return res.json();
//     })
//     .then((data) => data);
// }

/** POST */
export function post(url: string, data: any) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Network error');
    }
    return res.json();
  });
}

/** 내역 추가하기 - 테스트용 json */
export function postTransaction(newData: ICreateExpenseForm) {
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
