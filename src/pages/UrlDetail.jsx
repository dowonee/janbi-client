import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUrlHistory, fetchUrls } from "../api/urlApi";
import UrlHistoryItem from "../components/history/UrlHistoryItem";

export default function UrlDetail() {
  const { id } = useParams();
  const [urlInfo, setUrlInfo] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadUrlHistory = async () => {
      const allUrls = await fetchUrls();
      const targetUrl = allUrls.urlList.find((url) => url._id === id);
      const targetHistory = await fetchUrlHistory(id);

      setUrlInfo(targetUrl);
      setLogs(targetHistory.urlHistoryLogs);
    };

    loadUrlHistory();
  }, [id]);

  if (!urlInfo) {
    return <p className="p-6">URL 정보를 불러오고 있습니다.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <UrlHistoryItem urlInfo={{ ...urlInfo, logs }} />
    </div>
  );
}
