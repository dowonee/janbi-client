import { useEffect, useState } from "react";
import { fetchUrls, fetchUrlHistory } from "../api/urlApi";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [urls, setUrls] = useState([]);
  const [urlHistory, setUrlHistory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadUrlHistory = async () => {
      const urlRes = await fetchUrls();

      setUrls(urlRes?.urlList ?? []);

      const historyMap = {};

      for (const url of urlRes.urlList) {
        const { urlHistoryLogs } = await fetchUrlHistory(url._id);

        const sortedLogs = (urlHistoryLogs || []).sort(
          (a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime),
        );

        historyMap[url._id] = sortedLogs[0] || null;
      }

      setUrlHistory(historyMap);
    };

    loadUrlHistory();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const summarizeChange = (changedItems = []) => {
    if (changedItems.length === 0) return "변경된 내용을 확인할 수 없습니다.";

    const summaries = changedItems.slice(0, 3).map((item) => {
      const rawContent = item.afterHtml || "";
      const trimmedContent = rawContent.trim().toLowerCase();

      if (trimmedContent === "") return "내용 제거됨";
      if (
        trimmedContent.includes("<img") ||
        trimmedContent.match(/\.(jpg|jpeg|png|gif|webp)/)
      ) {
        return "이미지 변경됨";
      }
      if (trimmedContent.length > 50) return "텍스트 내용 변경됨";

      return `내용 변경: "${trimmedContent.slice(0, 20)}"`;
    });

    return summaries.join(" / ");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800">최근 변경 요약</h2>

      {urls.length === 0 ? (
        <p className="text-sm text-gray-500">등록된 URL이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {urls.map((url) => {
            const log = urlHistory[url._id];
            const isChanged = log?.isChanged;
            const changedContents = log?.changedContents || [];

            const summaryText = isChanged
              ? summarizeChange(changedContents)
              : "변경된 내용이 없습니다.";

            return (
              <div
                key={url._id}
                onClick={() => navigate(`/history/${url._id}`)}
                className={`p-4 border rounded cursor-pointer hover:bg-gray-50 transition ${
                  isChanged
                    ? "border-blue-300 bg-blue-50/10"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {url.name}
                    </h3>
                    <p className="text-sm text-gray-600 break-all">{url.url}</p>
                  </div>
                  <div className="text-sm text-right space-y-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        isChanged
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isChanged ? "변경 감지됨" : "변경 없음"}
                    </span>
                    {log?.scheduledTime && (
                      <p className="text-gray-500">
                        최근 확인: <br />
                        {formatDate(log.scheduledTime)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <p className="font-medium mb-1">요약</p>
                  <p className="text-xs text-gray-600">{summaryText}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
