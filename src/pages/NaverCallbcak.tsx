import { useSearchParams } from 'react-router-dom';
import Loading from '../components/common/loading/Loading';

export default function NaverCallback() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  /** 네이버 인가코드 가져오기 */
  const authorizeCode = new URL(window.location.href).searchParams.get('code');
  console.log(authorizeCode);

  return <Loading />;
}
