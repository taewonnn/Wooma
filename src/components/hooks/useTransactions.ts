import { useQuery } from '@tanstack/react-query';

const fetchTransactions = async () => {
  const response = await fetch('/expenseData.json');
  if (!response.ok) {
    throw new Error('Network error');
  }

  return response.json();
};

export const useTransactions = () => {
  return useQuery({ queryKey: ['transaction'], queryFn: fetchTransactions });
};
