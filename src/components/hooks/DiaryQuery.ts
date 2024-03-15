import { useQuery } from '@tanstack/react-query';
import { get } from '../../api';

const fetchDiary = async () => {
  const data = await get('/diaryData.json');
  return data;
};

export const useDiary = () => {
  return useQuery({ queryKey: ['diary'], queryFn: fetchDiary });
};
