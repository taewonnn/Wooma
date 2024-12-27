import { useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';

const fetchDiary = async () => {
  const res = await http.get('/diaryData.json');
  return res?.data;
};

export const useDiary = () => {
  return useQuery({ queryKey: ['diary'], queryFn: fetchDiary });
};
