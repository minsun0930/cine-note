import Button from "@/components/common/Button";
import Login from "@/components/common/user/Login";

const LoginPage = () => {
  return (
    <div className="max-w-87 w-full flex flex-col justify-center items-center mx-auto my-14">
      <Login />
      <div className="flex items-center w-full my-4 mb-8">
        <div className="grow border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-400">또는</span>
        <div className="grow border-t border-gray-300"></div>
      </div>
      <Button className="bg-gray-800 w-full py-4">
        🎬 포트폴리오 체험 계정으로 로그인
      </Button>
    </div>
  );
};
export default LoginPage;
