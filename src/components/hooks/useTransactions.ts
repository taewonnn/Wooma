import { useQuery } from '@tanstack/react-query';
import { get } from '../../api';

// const fetchTransactions = async () => {
//   const response = await fetch('/expenseData.json');
//   if (!response.ok) {
//     throw new Error('Network error');
//   }

//   return response.json().then((data) => data.transactions);
// };

const fetchTransactions = async () => {
  const data = await get('/expenseData.json');
  return data.transactions;
};

export const useTransactions = () => {
  return useQuery({ queryKey: ['transaction'], queryFn: fetchTransactions });
};
