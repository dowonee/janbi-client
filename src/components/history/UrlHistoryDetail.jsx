import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUrlHistoryById } from "../api/urlApi";
import HistoryLog from "../components/history/HistoryLog";

export default function UrlHistoryDetail() {
  const { id } = useParams();
  const [urlInfo, setUrlInfo] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const responsedUrlHistory = await getUrlHistoryById(id);

      if (responsedUrlHistory) {
        setLogs(responsedUrlHistory.urlHistoryLogs || []);

        if (responsedUrlHistory.url) {
          setUrlInfo(responsedUrlHistory.url);
        }
      }
    };

    loadHistory();
  }, [id]);

  if (!logs.length) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-bold">변경 이력</h2>
        <p className="mt-4 text-gray-500">변경 이력이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold">{urlInfo?.name}</h2>
        <p className="text-sm text-gray-600 break-all">{urlInfo?.url}</p>
      </div>
      <HistoryLog logs={logs} />
    </div>
  );
}
