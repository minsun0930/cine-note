import MypageMain from "@/components/common/user/MypageMain";
import MyPageSidebar from "@/components/common/user/MypageSidebar";
import { useAuthStore } from "@/store/useAuthStore";

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