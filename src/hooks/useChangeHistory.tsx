import { useEffect, useState } from "react";
import { fetchUrls, fetchUrlHistoryCursor } from "../api/urlApi";
import type { Url } from "../types/url";
import type { ChangeLog, HistoryCursorResponse } from "../types/history";

interface UrlHistories {
  [key: string]: ChangeLog[];
}

interface NextCursors {
  [key: string]: string | null;
}

export function useChangeHistory(targetId: string | null = null) {
  const [urls, setUrls] = useState<Url[]>([]);
  const [urlHistories, setUrlHistories] = useState<UrlHistories>({});
  const [nextCursors, setNextCursors] = useState<NextCursors>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInitial = async () => {
    setLoading(true);

    try {
      const urlResponse = await fetchUrls();
      const urlList = Array.isArray(urlResponse) ? urlResponse : [];
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

      const histories: UrlHistories = {};
      const cursors: NextCursors = {};

      fetchedHistory.forEach(({ id, logs, nextCursor }) => {
        histories[id] = logs;
        cursors[id] = nextCursor;
      });

      setUrlHistories(histories);
      setNextCursors(cursors);
    } catch (err) {
      console.error("초기 히스토리 로딩 실패", err);

      setError(err instanceof Error ? err : new Error("Fetch Error"));
    } finally {
      setLoading(false);
    }
  };

  const fetchMore = async (id: string) => {
    const cursor = nextCursors[id];

    if (!cursor) return;

    try {
      const historyResponse: HistoryCursorResponse =
        await fetchUrlHistoryCursor(id, cursor);

      setUrlHistories((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), ...historyResponse.urlHistoryLogs],
      }));

      setNextCursors((prev) => ({
        ...prev,
        [id]: historyResponse.nextCursor,
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
