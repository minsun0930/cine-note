import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Button from "./common/Button";
import SearchInput from "./common/SearchInput";
import { useAuthStore } from "@/store/useAuthStore";
import { CircleUserIcon } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      return;
    } else {
      navigate(`/search?keyword=${encodeURIComponent(query)}`);
    }
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const hideSearchPaths = ["/", "/login", "/signup"];

  return (
    <header className="sticky top-0 z-50 bg-white w-full flex justify-center border-b mb-4 border-gray-200 py-1">
      <div className="flex max-w-325 w-full justify-between  px-4">
        <div className="flex items-center gap-5">
          <Link to="/" className="font-bold text-[30px] ">
            CINENOTE
          </Link>
          {!hideSearchPaths.includes(location.pathname) && (
            <SearchInput
              key={keyword}
              variant="header"
              defaultValue={keyword}
              onSearch={handleSearch}
            />
          )}
        </div>
        {!isAuthPage && (
          <ul className="flex items-center gap-4">
            <li>
              {user ? (
                <div className="flex items-center gap-2 cursor-pointer">
                  <CircleUserIcon className="w-[20px] h-[20px]"/>
                  <div className="font-semibold text-sm">{user.user_metadata?.display_name || user.email?.split("@")[0]}</div>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="primary" className="cursor-pointer ">
                    로그인
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
