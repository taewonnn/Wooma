import { useMutation, useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';
import { Axios } from 'axios';
import { ITransaction } from '../components/member/calendar/Diary';

const fetchTransactions = async () => {
  const res = await http.get('/expenseData.json');

  return res?.data.transactions;
};

// export const useTransactions = () => {
//   return useQuery({ queryKey: ['transaction'], queryFn: fetchTransactions });
// };

/** json data 이용 시 */
// cli : npx json-server --watch public/expenseData.json --port 3000
const fetchTransactionsJsonData = async (): Promise<ITransaction[]> => {
  const res = await http.get('http://localhost:3000/transactions');

  return res?.data;
};

export const useTransactions = () => {
  return useQuery({ queryKey: ['transaction'], queryFn: fetchTransactionsJsonData });
};

/**
 * Post
 * @param formData
 */
const createTransactions = async (formData: ITransaction) => {
  const res = await http.post('http://localhost:3000/transactions', formData);

  return res?.data;
};

export const useCreateTransactions = () => {
  return useMutation({ mutationFn: createTransactions });
};
