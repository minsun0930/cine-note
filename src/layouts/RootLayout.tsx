import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full min-h-full flex flex-col justify-center items-center bg-bg">
      <div className="max-w-325 w-full">
        <Header />
        {/* SEO 고려하여 main태그로 감싸기 */}
        <main> 
          <Outlet />
        </main>
        
      </div>
      <Footer />
    </div>
  );
}
