import { useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';

const postToken = async () => {
  const data = await http.post('api주소', {});
  return;
};

export const useKakaotoken = () => {
  return useQuery({ queryKey: [], queryFn: postToken });
};
