import { useForm } from 'react-hook-form';
import { IForm } from '../types/sign';

function Signup() {
  /** useForm */
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ mode: 'onChange' });
  // console.log('Input에 입력한 값 확인 :', watch());
  console.log('form validation : ', errors);

  /** password값 watch 통해 미리 저장 - passwordConfirm과 비교위해 */
  const password = watch('password');
  console.log('password 입력값: ', password);

  /** validation이 끝난 뒤 실행 함수 */
  const onValid = (data: IForm) => {
    console.log('제출한 데이터 묶음 확인:', data);

    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', { message: 'password are not the same' }, { shouldFocus: true });
    }
  };

  return (
    <>
      <p>Signup Page</p>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col ">
        <div className="flex justify-start mt-4 mb-4">
          <label htmlFor="email">email :</label>
          <input
            {...register('email', {
              required: 'Please Write Email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식에 맞춰 입력해주세요',
              },
            })}
            type="text"
            placeholder="email"
            name="email"
            id="email"
          />
        </div>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <div className="flex justify-start mb-4">
          <label htmlFor="username">username :</label>
          <input
            {...register('username', {
              required: 'Please Write username',
              pattern: {
                value: /^[a-zA-Z가-힣]{3,20}$/,
                message: '3 ~ 10 글자 이내로 입력해주세요',
              },
            })}
            type="text"
            placeholder="username"
            name="username"
            id="username"
          />
        </div>
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <div className="flex justify-start mb-4">
          <label htmlFor="password">password :</label>
          <input
            {...register('password', {
              required: 'Please Write password',
              pattern: {
                value: /^[a-zA-Z0-9가-힣]{3,20}$/,
                message: '3-10글자 이내로 입력해주세요',
              },
            })}
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />
        </div>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <div className="flex justify-start mb-4">
          <label htmlFor="passwordConfirm">passwordConfirm :</label>
          <input
            {...register('passwordConfirm', {
              required: 'Please Write passwordConfirm',
              validate: (value) => value === password || '불일치!',
            })}
            type="password"
            placeholder="passwordConfirm"
            name="passwordConfirm"
            id="passwordConfirm"
          />
        </div>
        {errors.passwordConfirm && <p className="text-red-500">{errors.passwordConfirm.message}</p>}

        <button>가입</button>
      </form>
    </>
  );
}

export default Signup;
