import { Link, NavLink } from "react-router-dom";
import Button from "./common/Button";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="flex h-15 justify-between items-center text-4xl">
      <Link to="/" className="font-bold text-[30px]">
        CINENOTE
      </Link>
      <nav>
        <ul className="flex">
          <li>
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
          <li>
            <Button variant="primary" className="ml-[16px]">로그인</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
