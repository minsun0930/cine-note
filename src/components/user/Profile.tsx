import { useAuthStore } from "@/hooks/auth/useAuthStore";
import { useUpdateNickname } from "@/hooks/auth/useUserQuery";
import {
  Check,
  LockKeyhole,
  Moon,
  Pencil,
  Sun,
  UserRoundCog,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import User from "@/assets/User.svg?react";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const { mutate: updateNickname, isPending } = useUpdateNickname();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
    <div className="p-7 rounded-[10px] bg-main/10 border-2 border-main dark:border-dark-bg ">
      <div className="flex items-center">
        {/* 변경하기 */}
        <User className="w-8 h-8 md:w-8 mr-1 shrink-0" />

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
            <span className=" whitespace-nowrap ml-2 text-sm md:text-[18px] lg:text-[20px] font-medium text-neutral-800 dark:text-white leading-none">
              {currentNickname}
            </span>
            <Pencil
              className="w-4 h-4 cursor-pointer dark:text-bg"
              onClick={() => {
                setNicknameInput(currentNickname);
                setIsEditing(true);
              }}
            />
          </div>
        )}
      </div>
      <div className="w-full border-b-[0.2px] my-4 border-main dark:border-gray-500"></div>
      <div className="flex flex-col gap-2 text-sm lg:text-[16px]">
        <Link
          to="/my/changePassword"
          className="hover:font-bold transition cursor-pointer flex gap-2 dark:text-bg"
        >
          <LockKeyhole className="w-4 h-4 hover:font-bold dark:text-bg" />
          비밀번호 변경
        </Link>
        <Link
          to="/my/account"
          className="hover:font-bold transition cursor-pointer flex gap-2 dark:text-bg"
        >
          <UserRoundCog className="w-4 h-4 dark:text-bg" />
          계정 관리
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 dark:text-bg">
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-indigo-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            다크모드
          </div>

          <button
            type="button"
            onClick={toggleDarkMode}
            className={`flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
              isDarkMode ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label="다크모드 전환"
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                isDarkMode ? "translate-x-4.5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
