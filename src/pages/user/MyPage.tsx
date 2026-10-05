import MypageMain from "@/components/user/page/MypageMain";
import MyPageSidebar from "@/components/user/page/MypageSidebar";


export default function MyPage(){

  return (
    <div className="max-w-325 w-full mx-auto px-4 relative flex gap-4 justify-between">
      <MyPageSidebar/>
      <MypageMain/>
    </div>
  )
}