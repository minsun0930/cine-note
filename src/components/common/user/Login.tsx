import { NavLink } from "react-router-dom";
import Button from "../Button";
import { FormInput } from "../FormInput";
import { useForm } from "react-hook-form";

interface LoginForm{
  userId : string;
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data : LoginForm) => {
    console.log("로그인 데이터:", data);
  };

  return (
    <div className="felx items-center justify-center flex-col w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="pb-3.5 max-w-87" >
        <div className="flex flex-col gap-3.5 mb-6">
          <FormInput
            placeholder="아이디"
            registration={register("userId", { required: "아이디는 필수 입니다" })}
            error={errors.userId?.message as string}
          />
          <FormInput
            placeholder="비밀번호"
            type="password"
            registration={register("password", {
              required: "비밀번호는 필수입니다.",
            })}
            error={errors.password?.message as string}
          />
        </div>

        <Button type="submit" className="w-full p-4 text-sm">로그인</Button>
      </form>
      <div className="text-sm flex items-center justify-center gap-2 mb-10 text-gray-500">
        <NavLink to="/">아이디 찾기</NavLink>
        <span>|</span>
        <NavLink to="/">비밀번호 찾기</NavLink>
        <span>|</span>
        <NavLink to="/">회원가입</NavLink>
      </div>
    </div>
  );
};

export default Login;
