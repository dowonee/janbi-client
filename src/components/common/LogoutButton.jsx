import { useNavigate } from "react-router-dom";
import { logout } from "../../api/urlApi";

export default function LogoutButton({ fullWidth = false, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      if (onLogout) {
        onLogout();
      }

      navigate("/");
    } catch (err) {
      alert("로그아웃에 실패했습니다.", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`${
        fullWidth ? "w-full" : ""
      } px-4 py-2 border border-slate-200 text-sm rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150`}
    >
      로그아웃
    </button>
  );
}
