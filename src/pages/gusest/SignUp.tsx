import { useForm } from 'react-hook-form';
import { ISignUpForm } from '../../types/sign';
import Button from '../../components/common/button/Button';

function SignUp() {
  /** useForm */
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpForm>({ mode: 'onChange' });
  // console.log('Input에 입력한 값 확인 :', watch());
  console.log('form validation : ', errors);

  /** password값 watch 통해 미리 저장 - passwordConfirm과 비교위해 */
  const password = watch('password');
  console.log('password 입력값: ', password);

  /** validation이 끝난 뒤 실행 함수 */
  const onValid = (data: ISignUpForm) => {
    console.log('제출한 데이터 묶음 확인:', data);

    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', { message: 'password are not the same' }, { shouldFocus: true });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="mt-10 w-full">
        <div className="mb-4">
          <label htmlFor="username" className="text-gray-700 block text-sm font-medium">
            아이디
          </label>
          <input
            {...register('username', {
              required: '필수: 이메일',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식에 맞춰 입력해주세요',
              },
            })}
            className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm"
            type="text"
            placeholder="username"
            name="username"
            id="username"
          />
        </div>
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <div className="mb-4">
          <label htmlFor="name">이름</label>
          <input
            {...register('name', {
              required: '필수: 이름',
              pattern: {
                value: /^[a-zA-Z가-힣]{3,20}$/,
                message: '3 ~ 10 글자 이내로 입력해주세요',
              },
            })}
            className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm"
            type="text"
            placeholder="name"
            name="name"
            id="name"
          />
        </div>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <div className="mb-4">
          <label htmlFor="password">비밀번호</label>
          <input
            {...register('password', {
              required: '필수: 비밀번호',
              pattern: {
                value: /^[a-zA-Z0-9가-힣]{3,20}$/,
                message: '3-10글자 이내로 입력해주세요',
              },
            })}
            className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm"
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />
        </div>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <div className="mb-4">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            {...register('passwordConfirm', {
              required: '필수: 비밀번호 확인',
              validate: value => value === password || '불일치!',
            })}
            className="border-gray-300 mt-1 w-full rounded-md border px-3 py-2 shadow-sm"
            type="password"
            placeholder="passwordConfirm"
            name="passwordConfirm"
            id="passwordConfirm"
          />
        </div>
        {errors.passwordConfirm && <p className="text-red-500">{errors.passwordConfirm.message}</p>}

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="rounded-md bg-main px-4 py-2 text-sm font-medium text-white shadow"
          >
            회원가입
          </Button>
        </div>
      </form>
    </>
  );
}

export default SignUp;

// data

// {
//   "success": true,
//   "message": "성공",
//   "data": {
//     "username": "도토리",
//     "token": ""
//   }
// }

// {
//   "success": false,
//   "message": "이미 존재하는 이메일입니다.",
//   "data": null
// }
