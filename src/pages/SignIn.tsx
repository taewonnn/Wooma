import { useForm } from 'react-hook-form';
import { ISignInForm } from '../types/sign';
import {
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  NAVER_CLIENT_ID,
  NAVER_REDIRECT_URI,
} from '../constants/envConfig';
import Button from '../components/common/button/Button';
import Img from '../components/common/img/Img';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/signin/GoogleLoginButton';

export default function SignIn() {
  const navigate = useNavigate();

  /** 카카오 로그인 */
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 이동
  };

  /** 네이버 로그인 */
  const handleNaverLogin = () => {
    const STATE = uuidv4();
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
    sessionStorage.setItem('naver_oauth_state', STATE);

    window.location.href = naverAuthUrl; // 네이버 인증 페이지로 이동
  };

  const { register, handleSubmit } = useForm<ISignInForm>();

  /** validation 끝난 이후 실행되는 함수 */
  const onValid = (data: ISignInForm) => {
    console.log('제출한 데이터 묶음 확인:', data);
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-8">
      <div className="mb-10 text-center">
        <Img src="logo.svg" className="mx-auto" alt="Logo" />
        <h1 className="mt-4 text-5xl font-semibold text-gray">Wooma</h1>
        <p className="text-gray-500 text-sm">우리사이 마이너스는 없어</p>
      </div>

      <form onSubmit={handleSubmit(onValid)} className="w-full">
        <div className="mb-4">
          <label htmlFor="username" className="text-gray-700 block text-sm font-medium">
            아이디
          </label>
          <input
            {...register('username', { required: '아이디를 입력해주세요' })}
            className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm"
            type="text"
            name="username"
            id="username"
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="text-gray-700 block text-sm font-medium">
            비밀번호
          </label>
          <input
            {...register('password', { required: '비밀번호를 입력해주세요' })}
            className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm"
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full rounded-md bg-main px-4 py-2 text-sm font-medium text-white shadow"
          >
            로그인
          </Button>
          <Button
            type="button"
            className="w-full rounded-md bg-gray px-4 py-2 text-sm font-medium text-white shadow"
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </Button>
        </div>
      </form>

      <hr className="my-6 border-gray" />

      <div className="flex flex-col items-center gap-2">
        <Button
          onClick={handleKakaoLogin}
          className="flex w-[192px] items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 shadow"
        >
          <Img src="guest/kakao_logo.svg" alt="Kakao" className="h-5 w-5" />
          <span className="text-sm font-medium text-black">카카오로 시작하기</span>
        </Button>

        <Button
          onClick={handleNaverLogin}
          className="flex w-[192px] items-center justify-center gap-2 rounded-md bg-green-500 px-4 py-2 shadow"
        >
          <Img src="guest/naver_logo.svg" alt="Naver" className="h-5 w-5" />
          <span className="text-sm font-medium text-white">네이버로 시작하기</span>
        </Button>

        <GoogleLoginButton />
      </div>
    </div>
  );
}
