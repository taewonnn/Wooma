import { useQuery } from '@tanstack/react-query';
import { get } from '../utils/api';

const fetchTransactions = async () => {
  const data = await get('/expenseData.json');
  return data.transactions;
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
