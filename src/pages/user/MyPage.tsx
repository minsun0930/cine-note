import MypageMain from "@/components/user/page/MypageMain";
import MyPageSidebar from "@/components/user/page/MypageSidebar";
import { useAuthStore } from "@/hooks/auth/useAuthStore";

export default function MyPage(){

  const {user} = useAuthStore();

  if (!user) return null;
  return (
    <div className="max-w-325 w-full mx-auto px-4 relative flex gap-4 justify-between">
      <MyPageSidebar user={user}/>
      <MypageMain/>
    </div>
  )
}