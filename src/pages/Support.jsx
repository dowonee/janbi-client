import { useNavigate } from "react-router-dom";

export default function Support() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          JANBI 고객지원
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          JANBI를 사용하시다가 문제가 발생했거나 궁금한 사항이 있으신가요?
          <br />
          아래의 방법으로 문의해주시면 빠르게 답변드리겠습니다.
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold text-gray-800 mb-1">이메일 문의</h3>
            <p className="text-sm text-gray-700">jjddwwyt@gmail.com</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold text-gray-800 mb-1">도움말 가이드</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>먼저, 브라우저에 JANBI 익스텐션을 설치해주세요.</li>
              <li>
                모니터링할 웹페이지에서 추적할 요소를 선택하여 등록합니다.
              </li>
              <li>요일과 시간을 설정하면 주기적으로 변경사항을 감지합니다.</li>
              <li>Slack 알림을 연동하면 주기마다 알림을 받을 수 있습니다.</li>
              <li>변경 이력은 대시보드에서 확인할 수 있습니다.</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold text-gray-800 mb-1">
              계정 없이 문의 가능합니다.
            </h3>
            <p className="text-sm text-gray-700">
              별도 회원가입 없이 바로 이메일로 문의하실 수 있습니다.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700 transition"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
