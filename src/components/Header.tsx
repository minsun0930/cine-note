import { Link, NavLink} from "react-router-dom";
import Button from "./common/Button";
import { cn } from "@/lib/utils";

export default function Header() {

  return (
    <header className="flex justify-between items-center text-4xl py-4">
      <div>
        <Link to="/" className="font-bold text-[30px]">
          CINENOTE
        </Link>
   
      </div>
      <nav>
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
            <Button variant="primary">
              로그인
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
