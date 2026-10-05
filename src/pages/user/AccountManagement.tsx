import Button from "@/components/common/Button";
import { useDeleteAccount } from "@/hooks/auth/useUserQuery";
import { supabase } from "@/supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AccountManagement() {
  const navigate = useNavigate();
  const {mutate: deleteAccount} = useDeleteAccount();

  const handleDeleteAccount = async () =>{
    deleteAccount()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="max-w-87 w-full flex flex-col justify-center items-center mx-auto my-30 px-8">
      <div className="felx items-center justify-center flex-col w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">계정 관리</h1>
        <Button variant="primary" onClick={handleDeleteAccount} className="w-full mb-5 py-3">회원 탈퇴</Button>
        <Button variant="primary" onClick={handleLogout}  className="w-full py-3">로그아웃</Button>
      </div>
    </div>
  );
}
