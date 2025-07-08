import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function ActionButtons() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      navigate("/history");
    } else {
      navigate("/login");
    }
  };

  const handleSlackAddButtonClick = () => {
    const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${import.meta.env.VITE_SLACK_CLIENT_ID}&scope=chat:write,incoming-webhook&redirect_uri=${import.meta.env.VITE_SLACK_REDIRECT_URI}`;

    window.location.href = slackAuthUrl;
  };

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <button
        onClick={handleDashboardClick}
        className="px-6 py-3 bg-indigo-600 text-white text-base font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
      >
        대시보드 바로가기
      </button>
      <a
        id="install-extension-btn"
        href="https://chromewebstore.google.com/detail/janbi/eeloaclecjkofgdjlnnbnjhcafikdfof"
        className="px-6 py-3 border border-indigo-300 text-indigo-600 text-base font-semibold rounded-lg shadow hover:bg-indigo-50 transition"
      >
        익스텐션 설치
      </a>
      <button
        onClick={handleSlackAddButtonClick}
        className="px-6 py-3 border border-indigo-300 text-indigo-600 text-base font-semibold rounded-lg shadow hover:bg-indigo-50 transition"
      >
        Slack 앱 설치
      </button>
    </div>
  );
}
