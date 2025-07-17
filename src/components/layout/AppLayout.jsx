import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import Header from "../common/Header";
import useAuthStore from "../../stores/useAuthStore";

export default function AppLayout({ children }) {
  const { checkLogin } = useAuthStore();
  const location = useLocation();
  const isIntro = location.pathname === "/";

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {isIntro && <Header />}
      {!isIntro ? (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      ) : (
        children
      )}
    </>
  );
}
