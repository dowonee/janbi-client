import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUrlHistory } from "../api/urlApi";
import UrlHistoryItem from "../components/history/UrlHistoryItem";

export default function History() {
  const { id } = useParams();
  const [urlHistory, setUrlHistory] = useState(null);

  useEffect(() => {
    const loadUrlHistory = async () => {
      const responsedUrlHistory = await fetchUrlHistory(id);

      setUrlHistory(responsedUrlHistory);
    };

    loadUrlHistory();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">변경 내역</h2>
      <UrlHistoryItem urlInfo={urlHistory} />
    </div>
  );
}
