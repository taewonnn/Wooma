import { useQuery } from '@tanstack/react-query';
import { http } from '../utils/http';

const postToken = async (url: string) => {
  const urlObj = new URL(url);
  const tempToken = urlObj.searchParams.get('token');
  const data = await http.post('api주소', {
    token: tempToken,
  });
  return data;
};

export const useKakaotoken = () => {
  return useQuery({ queryKey: [], queryFn: (url) => postToken });
};
