import { supabase } from "@/supabase/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { CircleUserIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserProfileMenuProps {
  user: User;
}

export default function UserProfileMenu({ user }: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const nickname =
    user.user_metadata?.display_name || user.email?.split("@")[0];
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div
      className="relative group py-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <CircleUserIcon className="w-5 h-5" />
        <div className="font-semibold text-sm">{nickname}</div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-full pt-2 whitespace-nowrap ">
          <div className="flex flex-col border pl-5 px-4 text-sm bg-white gap-2 py-4 rounded-[10px] shadow-md">
            <Link to="/my" className="hover:font-bold transition ">
              MY
            </Link>
            <div
              onClick={handleLogout}
              className="hover:font-bold transition cursor-pointer"
            >
              로그아웃
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
