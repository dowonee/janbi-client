import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function ActionButtons() {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded hover:bg-indigo-700"
      >
        대시보드 바로가기
      </Link>
      <a
        href="https://chromewebstore.google.com"
        className="px-6 py-3 border border-primary text-primary text-sm font-semibold rounded hover:bg-indigo-50"
      >
        익스텐션 설치
      </a>
    </div>
  );
}
