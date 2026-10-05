import { supabase } from "@/supabase/supabaseClient";
import {create} from "zustand";
import type {User} from "@supabase/supabase-js";

interface AuthState{
  user: User | null;
  setUser : (user:User | null ) => void;
  initialize : ()=>Promise<void>; 
}


export const useAuthStore = create<AuthState>((set) =>({
  user: null,
  setUser : (user) => set({user}),

  //앱이 처음 켜질 때 세션을 확인하고 상태 채워주는 함수
  initialize : async () =>{
    const {data:{session}} = await supabase.auth.getSession();
    set({user: session?.user??null});

    //실시간 상태 변경 감지
    supabase.auth.onAuthStateChange((_event, session)=>{
      set({user:session?.user??null});
    })
  }
}))

// 곧바로 세션 확인 및 실시간 감지 실행
supabase.auth.getSession().then(({ data: { session } }) => {
  useAuthStore.setState({ user: session?.user ?? null });
});

supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({ user: session?.user ?? null });
});