import { useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';

const fetchTransactions = async () => {
  const res = await http.get('/expenseData.json');

  return res?.data.transactions;
};

export const useTransactions = () => {
  return useQuery({ queryKey: ['transaction'], queryFn: fetchTransactions });
};

/** json data 이용 시 */
// cli : json-server --watch public/expenseData.json

// const fetchTransactionsJsonData = async () => {
//   const data = await get('http://localhost:3000/transactions');
//   return data.transaction;
// };

// export const useTransactions = () => {
//   return useQuery({ queryKey: ['transaction'], queryFn: fetchTransactionsJsonData });
// };
