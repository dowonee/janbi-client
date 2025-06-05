import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          서비스 이용약관
        </h1>

        <div className="text-sm text-gray-700 space-y-4 mb-6">
          <p>
            본 서비스(JANBI)는 사용자가 등록한 웹 페이지를 모니터링하고 지정한
            요소의 변경 사항을 탐지하여 알림을 제공하는 기능을 제공합니다.
          </p>
          <p>
            사용자는 타인의 권리를 침해하지 않는 범위 내에서 서비스를 이용해야
            하며 수집된 데이터의 활용에 대한 책임은 사용자 본인에게 있습니다.
          </p>
          <p>
            서비스 제공자는 시스템 유지보수, 보안 문제, 불가항력적 사유 등으로
            인해 서비스 제공을 일시적으로 중단할 수 있습니다.
          </p>
          <p>
            서비스에서 발생하는 데이터 수집, 저장, 분석은 서비스 제공 목적 외의
            용도로 활용되지 않으며, 개인정보는 별도로 수집하지 않습니다.
          </p>
          <p>
            본 약관은 필요한 경우 사전 공지 후 변경될 수 있으며 변경 사항은
            웹사이트 내에 게시됩니다.
          </p>
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
