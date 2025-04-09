import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import AddUrlModal from "./AddUrlModal";

export default function UrlList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const urls = [
    {
      name: "A 홈페이지",
      url: "https://www.a.com",
      status: "변경감지",
      changeCount: 5,
      lastChecked: "2024-04-08T15:00:00Z",
    },
    {
      name: "A 기능 페이지",
      url: "https://www.a.com/feat",
      status: "정상",
      changeCount: 2,
      lastChecked: "2024-04-09T09:12:00Z",
    },
    {
      name: "B 상세 페이지",
      url: "https://www.b.com/details",
      status: "정상",
      changeCount: 8,
      lastChecked: "2024-04-08T23:12:00Z",
    },
    {
      name: "B 대시보드",
      url: "https://www.b.com/dashboard",
      status: "오류",
      changeCount: 0,
      lastChecked: null,
    },
  ];

  const formatTime = (time) => {
    if (!time) return "-";
    return new Date(time).toLocaleString("ko-KR");
  };

  const formatInterval = (seconds) => {
    switch (seconds) {
      case 21600:
        return "6시간";
      case 86400:
        return "1일";
      case 259200:
        return "3일";
      case 604800:
        return "7일";
      default:
        return "6시간";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-6xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">모니터링 URL</h2>
          <button
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            URL 추가
          </button>
        </div>
        <div className="grid grid-cols-[1.2fr_2fr_1fr_1fr_1.5fr_1fr] bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600 border-y">
          <div className="text-center">이름</div>
          <div className="text-center">URL</div>
          <div className="text-center">상태</div>
          <div className="text-center">변경 횟수</div>
          <div className="text-center">마지막 확인</div>
          <div className="text-center">체크 주기</div>
        </div>

        {urls.map((urlInfo) => (
          <div
            key={urlInfo._id}
            className="grid grid-cols-[1.2fr_2fr_1fr_1fr_1.5fr_1fr] px-4 py-3 text-sm text-gray-800 border-b urlInfos-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-center">{urlInfo.name}</div>
            <div className="text-center">{urlInfo.url}</div>
            <div className="text-center">
              <span
                className={`inline-flex urlInfos-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
            <div className="text-center">{urlInfo.changeCount}</div>
            <div className="text-center">
              {formatTime(urlInfo.lastChecked).slice(0, -3)}
            </div>
            <div className="text-center">
              {formatInterval(urlInfo.checkInterval)}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <AddUrlModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
