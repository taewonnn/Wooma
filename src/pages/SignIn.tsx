import { useForm } from 'react-hook-form';
import { ISignInForm } from '../types/sign';
// @ts-ignore
import kakaoLogin from '../assets/kakao_login.png';
import { Link } from 'react-router-dom';
import { KAKAO_APP_KEY, KAKAO_REDIRECT_URI } from '../constants/envConfig';
import Button from '../components/common/button/Button';
import Img from '../components/common/img/Img';

export default function SignIn() {
  const { register, handleSubmit } = useForm<ISignInForm>();
  // console.log(watch());

  /** validation 끝난 이후 실행되는 함수 */
  const onValid = (data: ISignInForm) => {
    console.log('제출한 데이터 묶음 확인:', data);
  };

  return (
    <>
      <p>Signin Page</p>
      <Img src="/src/assets/logo.svg" />

      <form onSubmit={handleSubmit(onValid)} className="w-full">
        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="username">아이디: </label>
          <input
            {...register('username', { required: '아이디 입력해주세요' })}
            type="text"
            name="username"
            id="username"
          />
        </div>

        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="password">비밀번호: </label>
          <input
            {...register('password', { required: '비밀번호 입력해주세요' })}
            type="text"
            name="password"
            id="password"
          />
        </div>

        <button>로그인</button>
        <hr />
      </form>

      <Button className="flex items-center justify-center gap-2 rounded-[12px] bg-kakaoYellow px-5 py-3">
        <Img src="/src/assets/guest/kakao_logo.svg" alt="kakao" className="h-[20px] w-[20px]" />
        <span className="text-base text-black">카카오로 시작하기</span>
      </Button>

      <Link
        className="flex justify-center"
        to={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_APP_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`}
      ></Link>
    </>
  );
}
