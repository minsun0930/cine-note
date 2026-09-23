import { FormInput } from "../FormInput";

const Login = () => {
  return (
    <div className="felx justify-center max-w-87 w-full">
      <h1 className="text-3xl flex justify-center items-center font-bold mb-8">로그인</h1>
      <form>
        <div className="flex flex-col gap-3.5 mb-6">
          <FormInput placeholder="아이디" />
          <FormInput placeholder="비밀번호" type="password" />
        </div>
      </form>
    </div>
  );
};
export default Login;
