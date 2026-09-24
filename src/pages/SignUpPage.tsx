import SignUp from "@/components/common/user/SignUp";
import { NavLink } from "react-router-dom";

const SignUpPage = () => {
  return (
        <div className="max-w-87 w-full felx flex-col items-center justify-center mx-auto my-14">
      <SignUp />
      <div className="flex justify-center gap-2 text-gray-400">
        이미 계정을 가지고 계신가요?
        <NavLink to="/login" className="text-gray-800" >Login</NavLink>
      </div>
    </div>
  );
};
export default SignUpPage;
