import Button from "@/components/common/Button";
import Login from "@/components/user/Login";
import { supabase } from "@/supabase/supabaseClient";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleTestLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "test_user@gmail.com",
      password: "movie1234!",
    });
    if (error) {
      alert("체험용 계정 로그인 실패: " + error.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="max-w-87 w-full flex flex-col justify-center items-center mx-auto my-14 px-6">
      <Login />
      <div className="flex justify-center gap-2 text-gray-400">
        아직 회원이 아니신가요?
        <NavLink to="/signup" className="text-gray-800">
          회원가입
        </NavLink>
      </div>
      <div className="flex items-center w-full my-4 mb-8">
        <div className="grow border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-400">또는</span>
        <div className="grow border-t border-gray-300"></div>
      </div>
      <Button
        type="button"
        onClick={handleTestLogin}
        className="bg-gray-800 w-full py-4"
      >
        🎬 포트폴리오 체험 계정으로 로그인
      </Button>
    </div>
  );
};
export default LoginPage;
