import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddUrlModal from "./AddUrlModal";
import { fetchUrls } from "../../api/urlApi.ts";
import useModalStore from "../../stores/useModalStore";

export default function UrlList() {
  const [urls, setUrls] = useState([]);
  const { isModalOpen } = useModalStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUrlList = async () => {
      const responsedUrlList = await fetchUrls();
      setUrls(responsedUrlList?.urlList ?? []);
    };

    loadUrlList();
  }, [location]);

  const formatTime = (time) => {
    if (!time) return "-";

    return new Date(time).toLocaleString("ko-KR").slice(0, -3);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-6xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">모니터링 URL</h2>
        </div>
        {urls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-sm">
            <p className="mb-3">모니터링할 URL이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1.2fr_2fr_1fr_2fr_1.5fr] bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600 border-y">
              <div className="text-center">이름</div>
              <div className="text-center">URL</div>
              <div className="text-center">상태</div>
              <div className="text-center">마지막 확인</div>
              <div className="text-center">알림 설정</div>
            </div>

            {urls.map((urlInfo) => (
              <div
                key={urlInfo._id}
                onClick={() => navigate(`/history/${urlInfo._id}`)}
                className="grid grid-cols-[1.2fr_2fr_1fr_2fr_1.5fr] px-4 py-3 text-sm text-gray-800 border-b justify-center hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="text-center">{urlInfo.name}</div>
                <div className="text-center">{urlInfo.url}</div>
                <div className="text-center">
                  <span
                    className={`inline-flex justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      urlInfo.status === "정상"
                        ? "bg-lime-100 text-slate-900"
                        : urlInfo.status === "변경감지"
                          ? "bg-blue-100 text-slate-900"
                          : "bg-red-100 text-slate-900"
                    }`}
                  >
                    {urlInfo.status}
                  </span>
                </div>
                <div className="text-center">
                  {formatTime(urlInfo.updatedAt)}
                </div>
                <div className="text-center">
                  {urlInfo.dayOfWeek}요일 {urlInfo.scheduleTime}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {isModalOpen && <AddUrlModal />}
    </div>
  );
}
