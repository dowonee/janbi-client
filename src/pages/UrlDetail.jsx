import { useParams } from "react-router-dom";
import { useChangeHistory } from "../hooks/useChangeHistory";
import UrlHistoryItem from "../components/history/UrlHistoryItem";
import { mergeDuplicateLogs } from "../utils/historyUtils.jsx";

export default function UrlDetail() {
  const { id } = useParams();
  const { urls, urlHistories, nextCursors, loading, fetchMore } =
    useChangeHistory(id);

  const urlInfo = urls.find((url) => url._id === id);
  const rawLogs = urlHistories[id] || [];
  const mergedLogs = mergeDuplicateLogs(rawLogs);
  const hasMore = !!nextCursors[id];

  if (loading || !urlInfo) {
    return <p className="p-6">URL 정보를 불러오고 있습니다.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <UrlHistoryItem urlInfo={{ ...urlInfo, logs: mergedLogs }} />

      <div className="flex justify-center mt-6">
        {hasMore ? (
          <button
            onClick={() => fetchMore(id)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            더 보기
          </button>
        ) : (
          <p className="text-sm text-gray-500">모든 이력을 불러왔습니다.</p>
        )}
      </div>
    </div>
  );
}
