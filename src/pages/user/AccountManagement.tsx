import Button from "@/components/common/Button";
import { supabase } from "@/supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AccountManagement() {
  const navigate = useNavigate();

  const handleDeleteAccount = async () =>{
    const {data: {user}} = await supabase.auth.getUser();

    if(user?.email == "test_user@gmail.com" ){
      alert("테스트용 계정은 회원탈퇴를 할 수 없습니다!");
      return;
    }

    if(!confirm("정말 탈퇴하시겠습니까?")) return;

    const {error} = await supabase.rpc('delete_user');

    if(error){
      console.error("탈퇴 실패" ,error.message);
    }else{
      await supabase.auth.signOut();
      alert("회원탈퇴가 완료되었습니다.");
      window.location.href = "/";
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="max-w-87 w-full flex flex-col justify-center items-center mx-auto my-30">
      <div className="felx items-center justify-center flex-col w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">계정 관리</h1>
        <Button variant="primary" onClick={handleDeleteAccount} className="w-full mb-5 py-3">회원 탈퇴</Button>
        <Button variant="primary" onClick={handleLogout}  className="w-full py-3">로그아웃</Button>
      </div>
    </div>
  );
}
