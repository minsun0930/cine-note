import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAuthStore } from "@/hooks/auth/useAuthStore";
import { useEffect } from "react";


export default function RootLayout() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // 앱이 처음 켜질 때 딱 한 번 실행되면서 Supabase 인증 상태를 세팅
    initialize();
  }, [initialize]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-bg dark:bg-black">
      <ScrollRestoration />
      <Header />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
