import { NavLink, useNavigate } from "react-router-dom";
import { History, Settings } from "lucide-react";
import LogoutButton from "../common/LogoutButton";
import useAuthStore from "../../stores/useAuthStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  const sidebarMenu = [
    { tabName: "변경내역", to: "/history", icon: <History size={18} /> },
    { tabName: "설정", to: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-60 h-screen bg-white border-r shadow-sm p-4 flex flex-col justify-between">
      <div>
        <h1
          className="text-xl font-bold text-primary mb-6 text-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          JANBI
        </h1>
        <nav className="flex flex-col gap-2">
          {sidebarMenu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium transition ${
                  isActive ? "bg-gray-100 text-primary" : "text-gray-700"
                }`
              }
            >
              {item.icon}
              {item.tabName}
            </NavLink>
          ))}
        </nav>
      </div>

      {isLoggedIn && (
        <LogoutButton fullWidth onLogout={() => setIsLoggedIn(false)} />
      )}
    </aside>
  );
}
