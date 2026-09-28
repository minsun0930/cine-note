import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/supabase/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { Check, CircleUserIcon, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface MyPageSidebarProps {
  user: User;
}

export default function MyPageSidebar({ user }: MyPageSidebarProps) {
  const { setUser } = useAuthStore();

  const currentNickname =
    user.user_metadata?.display_name || user.email?.split("@")[0];

  //수정 중인지
  const [isEditing, setIsEditing] = useState(false);
  //닉네임 수정 중 input
  const [nicknameInput, setNicknameInput] = useState(currentNickname);
  // 로딩 중인가(중복 클릭 방지- 저장 한번 클릭 후 비활성화 됨)
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!nicknameInput.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      // Supabase Auth 메타데이터 업데이트
      const { data, error } = await supabase.auth.updateUser({
        data: { display_name: nicknameInput },
      });

      if (error) throw error;

      // Zustand 스토어 갱신 (헤더 닉네임도 즉시 반영)
      if (data.user) {
        setUser(data.user);
      }

      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        alert("닉네임 변경 실패: " + error.message);
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-80 w-full ">
      {/* 회원정보 */}
      <div className=" p-7 rounded-[10px] bg-main/10 border border-main/50 ">
        <div className="flex items-center">
          {/* 변경하기 */}
          <CircleUserIcon className="w-8 h-8 mr-1 shrink-0" />

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nicknameInput}
                className="ml-2 w-full  px-2 py-1 text-sm bg-white border border-neutral-300 rounded-md outline-none focus:border-neutral-800 "
                onChange={(e) => setNicknameInput(e.target.value)}
                autoFocus
              />
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-1 text-[12px] shrink-0 cursor-pointer"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                className="flex items-center gap-1 text-[12px] shrink-0 cursor-pointer"
                onClick={() => {
                  setNicknameInput(currentNickname);
                  setIsEditing(false);
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <span className="ml-2 text-[20px] font-medium text-neutral-800 leading-none">
                {currentNickname}
              </span>
              <Pencil
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  setNicknameInput(currentNickname);
                  setIsEditing(true);
                }}
              />
            </div>
          )}
        </div>
        <div className="w-full border my-4 border-gray-200"></div>
        <div className="flex flex-col gap-2">
          <Link to="" className="hover:font-bold transition cursor-pointer">
            비밀번호 변경
          </Link>
          <Link to="" className="hover:font-bold transition cursor-pointer">
            계정 관리
          </Link>
        </div>
      </div>
      {/* 달력 */}
    </div>
  );
}
