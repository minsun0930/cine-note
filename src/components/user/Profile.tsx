import { useAuthStore } from "@/hooks/auth/useAuthStore";
import { useUpdateNickname } from "@/hooks/auth/useUserQuery";
import { Check, CircleUserIcon, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const { mutate: updateNickname, isPending } = useUpdateNickname();

  const [isEditing, setIsEditing] = useState(false);
  const currentNickname =
    user?.user_metadata?.display_name || user?.email?.split("@")[0];

  const [nicknameInput, setNicknameInput] = useState(currentNickname);
  if (!user) return null;

  const handleSave = async () => {
    if (!nicknameInput.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    updateNickname(nicknameInput, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  return (
    <div className=" p-7 rounded-[10px] bg-main/10 border-2 border-main  ">
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
              disabled={isPending}
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
      <div className="w-full border my-4 border-gray-600"></div>
      <div className="flex flex-col gap-2">
        <Link
          to="/my/changePassword"
          className="hover:font-bold transition cursor-pointer"
        >
          비밀번호 변경
        </Link>
        <Link
          to="/my/account"
          className="hover:font-bold transition cursor-pointer"
        >
          계정 관리
        </Link>
      </div>
    </div>
  );
}
