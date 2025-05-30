import { useLocation } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import Header from "../common/Header";

export default function AppLayout({ children }) {
  const location = useLocation();
  const isIntro = location.pathname === "/";

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
