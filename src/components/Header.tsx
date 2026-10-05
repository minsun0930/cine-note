import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Button from "./common/Button";
import SearchInput from "./common/SearchInput";
import { useAuthStore } from "@/hooks/auth/useAuthStore";

import UserProfileMenu from "./user/UserProfileMenu";

export default function Header() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

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
      <div className="flex max-w-325 w-full justify-between px-4 md:px-8 lg:px-4">
          <Link to="/" className="font-bold text-[20px] md:text-[30px] ">
            CINENOTE
          </Link>
        <div className="flex items-center gap-5">
          {!hideSearchPaths.includes(location.pathname) && (
            <SearchInput
              key={keyword}
              variant="header"
              defaultValue={keyword}
              onSearch={handleSearch}
            />
          )}
        {!isAuthPage && (
          <ul className="flex items-center gap-4 whitespace-nowrap">
            <li>
              {user ? (
                <UserProfileMenu user={user} />
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
        
      </div>
    </header>
  );
}
