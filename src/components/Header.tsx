import { Link, NavLink } from "react-router-dom";
import Button from "./common/Button";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white w-full flex justify-center border-b mb-4 border-gray-200 py-1">
      <div className="flex max-w-325 w-full justify-between  px-4">
        <div>
          <Link to="/" className="font-bold text-[30px] ">
            CINENOTE
          </Link>
        </div>
          <ul className="flex items-center gap-4">
            <li className="flex">
              <NavLink
                to="/comunity"
                className={({ isActive }) =>
                  cn(
                    "text-xs text-gray-500 hover:text-gray-900",
                    isActive && "font-semibold text-gray-900",
                  )
                }
              >
                커뮤니티
              </NavLink>
            </li>
            <li className="flex">
              <Button variant="primary">로그인</Button>
            </li>
          </ul>
      </div>
    </header>
  );
}
