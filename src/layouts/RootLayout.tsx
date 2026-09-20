import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full min-h-full flex flex-col justify-center items-center bg-bg">
       <Header />

        <main className="flex-1 w-full py-4"> 
          <Outlet />
        </main>
        
      <Footer />
    </div>
  );
}
