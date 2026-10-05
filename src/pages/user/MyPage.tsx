import MypageMain from "@/components/user/page/MypageMain";
import MyPageSidebar from "@/components/user/page/MypageSidebar";


export default function MyPage(){

  return (
    <div className="max-w-325 w-full mx-auto px-8 lg:px-4 relative flex flex-col md:flex-row gap-8 justify-between">
      <MyPageSidebar/>
      <MypageMain/>
    </div>
  )
}