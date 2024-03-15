import { useQuery } from '@tanstack/react-query';
import { get } from '../../api';

const fetchTransactions = async () => {
  const data = await get('/expenseData.json');
  return data.transactions;
};

export const useTransactions = () => {
  return useQuery({ queryKey: ['transaction'], queryFn: fetchTransactions });
};
