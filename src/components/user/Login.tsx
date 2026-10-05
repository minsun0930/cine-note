import Button from "../common/Button";
import { FormInput } from "../common/FormInput";
import { useForm } from "react-hook-form";
import { useLogIn } from "@/hooks/auth/useUserQuery";

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
  const {mutate: logIn} = useLogIn();

  const onSubmit = async (data : LoginForm) => {
    logIn(data);
  };

  return (
    <div className="felx items-center justify-center flex-col w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="pb-3.5 max-w-87" >
        <div className="flex flex-col gap-3.5 mb-6">
          <FormInput
            placeholder="아이디(이메일)"
            type="email"
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
    </div>
  );
};

export default Login;
