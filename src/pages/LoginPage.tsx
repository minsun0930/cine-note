
import Button from "@/components/common/Button"
import Login from "@/components/common/user/Login"


const LoginPage = () => {
  return (
    <div className="max-w-325 w-full flex flex-col justify-center items-center m-auto">
      <Login/>
      <Button className="bg-gray-800">🎬 포트폴리오 체험 계정으로 로그인</Button>
    </div>
  )
}
export default LoginPage