import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUrlHistory, fetchUrls } from "../api/urlApi";
import UrlHistoryItem from "../components/history/UrlHistoryItem";

const LOGS_PER_PAGE = 10;

export default function UrlDetail() {
  const { id } = useParams();
  const [urlInfo, setUrlInfo] = useState(null);
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!id) return;

    const loadUrlHistory = async () => {
      const allUrls = await fetchUrls();
      const targetUrl = allUrls.urlList.find((url) => url._id === id);
      const targetHistory = await fetchUrlHistory(id);

      setUrlInfo(targetUrl);
      const mergedList = mergeLogList(targetHistory.urlHistoryLogs || []);
      setLogs(mergedList);
    };

    loadUrlHistory();
  }, [id]);

  const normalize = (log) => {
    return (log.changedContents || []).map((item) => ({
      selector: item.selector,
      afterHtml: (item.afterHtml || "").trim(),
    }));
  };

  const mergeLogList = (rawLogs) => {
    if (!rawLogs || rawLogs.length === 0) return [];

    const result = [];

    for (let i = 0; i < rawLogs.length; i++) {
      const curr = rawLogs[i];
      const prev = result[result.length - 1];

      const currNormalized = JSON.stringify(normalize(curr));

      if (!prev) {
        result.push(curr);
        continue;
      }

      const prevNormalized = JSON.stringify(normalize(prev));
      const isSameChange =
        prevNormalized === currNormalized && prev.isChanged === curr.isChanged;

      if (!isSameChange) {
        result.push(curr);
      }
    }

    return result;
  };

  if (!urlInfo || !logs) {
    return <p className="p-6">URL 정보를 불러오고 있습니다.</p>;
  }

  const totalPages = Math.ceil(logs.length / LOGS_PER_PAGE);
  const paginatedLogs = logs.slice(
    (currentPage - 1) * LOGS_PER_PAGE,
    currentPage * LOGS_PER_PAGE,
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <UrlHistoryItem urlInfo={{ ...urlInfo, logs: paginatedLogs }} />

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              currentPage < totalPages ? prev + 1 : prev,
            )
          }
          disabled={currentPage >= totalPages}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
