import { useEffect, useState } from "react";
import { fetchUrls, fetchUrlHistoryCursor } from "../api/urlApi.ts";

export function useChangeHistory(targetId = null) {
  const [urls, setUrls] = useState([]);
  const [urlHistories, setUrlHistories] = useState({});
  const [nextCursors, setNextCursors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitial = async () => {
    setLoading(true);

    try {
      const urlResponse = await fetchUrls();
      const urlList = urlResponse?.urlList || [];
      setUrls(urlList);

      const targetUrls = targetId
        ? urlList.filter((url) => url._id === targetId)
        : urlList;

      const fetchedHistory = await Promise.all(
        targetUrls.map(async (url) => {
          const res = await fetchUrlHistoryCursor(url._id);

          return {
            id: url._id,
            logs: res.urlHistoryLogs,
            nextCursor: res.nextCursor,
          };
        }),
      );

      const histories = {};
      const cursors = {};

      fetchedHistory.forEach(({ id, logs, nextCursor }) => {
        histories[id] = logs;
        cursors[id] = nextCursor;
      });

      setUrlHistories(histories);
      setNextCursors(cursors);
    } catch (err) {
      console.error("초기 히스토리 로딩 실패", err);

      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMore = async (id) => {
    const cursor = nextCursors[id];

    if (!cursor) return;

    try {
      const res = await fetchUrlHistoryCursor(id, cursor);

      setUrlHistories((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), ...res.urlHistoryLogs],
      }));

      setNextCursors((prev) => ({
        ...prev,
        [id]: res.nextCursor,
      }));
    } catch (err) {
      console.error("히스토리 추가 로딩 실패", err);
    }
  };

  useEffect(() => {
    fetchInitial();
  }, [targetId]);

  return {
    urls,
    urlHistories,
    nextCursors,
    loading,
    error,
    fetchMore,
  };
}
