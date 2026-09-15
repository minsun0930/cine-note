import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full min-h-full flex justify-center bg-bg">
      <div className="max-w-[1300px] w-full">
        <Header />
        {/* SEO 고려하여 main태그로 감싸기 */}
        <main> 
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
