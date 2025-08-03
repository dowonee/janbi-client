import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="flex items-center gap-3 text-indigo-600 mb-4">
        <AlertTriangle size={32} />
        <h1 className="text-3xl font-bold">404 - 페이지를 찾을 수 없습니다</h1>
      </div>
      <p className="text-gray-600 mb-6 text-center">
        요청하신 페이지가 존재하지 않거나 이동되었어요.
        <br />
        아래 버튼을 눌러 대시보드로 돌아가세요.
      </p>
      <button
        onClick={() => navigate("/history")}
        className="px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition"
      >
        대시보드로 이동
      </button>
    </div>
  );
}
