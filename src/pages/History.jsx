import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUrlHistory } from "../api/urlApi";
import UrlHistoryItem from "../components/history/UrlHistoryItem";

export default function History() {
  const { id } = useParams();
  const [urlHistory, setUrlHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);

      return;
    }

    const loadUrlHistory = async () => {
      try {
        const responsedUrlHistory = await fetchUrlHistory(id);
        setUrlHistory(responsedUrlHistory);
      } catch {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadUrlHistory();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">변경 내역</h2>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
          데이터를 불러오는 중입니다
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-20 text-red-500 text-sm">
          {error}
        </div>
      ) : urlHistory ? (
        <UrlHistoryItem urlInfo={urlHistory} />
      ) : (
        <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
          변경 내역이 없습니다.
        </div>
      )}
    </div>
  );
}
