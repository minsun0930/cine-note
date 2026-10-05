import { useAuthStore } from "@/hooks/auth/useAuthStore";
import { supabase } from "@/supabase/supabaseClient";
import { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//회원가입 훅
export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: {
      userId: string;
      password: string;
      nickname: string;
    }) => {
      const { error } = await supabase.auth.signUp({
        email: data.userId,
        password: data.password,
        options: {
          data: {
            display_name: data.nickname,
          },
        },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AuthError) {
        console.error("인증 에러:", error.message);
      } else {
        console.error("알 수 없는 에러:", error);
      }
    },
  });
};



//닉네임 변경
export const useUpdateNickname = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (newNickname : string) => {
      const {data,error} = await supabase.auth.updateUser({
        data: {display_name : newNickname}
      });
      if(error) throw error;
      return data;
    },
    onSuccess : (data) =>{
      if(data.user){
        setUser(data.user)
      }
      alert("닉네임이 성공적으로 변경되었습니다.");
    },
    onError: (error) => {
      alert("닉네임 변경 실패: " + error.message)
    }
  });
};


//비밀 번호 변경
interface updatePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export const useUpdatePassword = () =>{
  const navigate = useNavigate();

  return useMutation({
    mutationFn : async ({currentPassword,newPassword }: updatePasswordParams) => {
      const {data: userData} = await supabase.auth.getUser(); 
      const email = userData.user?.email;

      if(!email) throw new Error("로그인 정보를 찾을 수 없습니다.");

      const {error: signInError} = await supabase.auth.signInWithPassword({
        email,
        password : currentPassword,
      });
      if(signInError) throw new Error("현재 비밀번호가 일치하지 않습니다.");

      const {error: updateError} = await supabase.auth.updateUser({
        password:newPassword,
      });
      if(updateError) throw updateError;

      const {error: signOutError} = await supabase.auth.signOut();
      if(signOutError) throw new Error("로그아웃 중 오류가 발생했습니다.");
    },
    onSuccess : () => {
      alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.");
      navigate("/login");
    },
    onError : (error) =>{
      if(error instanceof Error){
        alert(error.message);
      }else{
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  })
}


//회원 탈퇴 훅

export const useDeleteAccount = () =>{
  return useMutation({
    mutationFn : async () =>{
      const {data: {user}, error : userError}  = await supabase.auth.getUser();
      if(userError) throw userError;

      if(user?.email === "test_user@gmail.com"){
        throw new Error("테스트용 계정은 회원탈퇴를 할 수 없습니다.");
      }

      const {error: rpcError} = await supabase.rpc('delete_user');
      if(rpcError) throw rpcError;

      const {error: signOutError} = await supabase.auth.signOut();
      if(signOutError) throw signOutError;
    },
    onSuccess : () =>{
      alert("회원탈퇴가 완료되었습니다.");
      window.location.href = "/"
    },
    onError : (error) => {
      if(error instanceof Error){
        alert(error.message);
      }else{
        alert("회원탈퇴 중 오류가 발생했습니다.");
      }
    }
  })
}
