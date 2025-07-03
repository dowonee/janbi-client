import { useEffect, useState } from "react";
import { fetchUrls, fetchUrlHistory } from "../api/urlApi";
import { sortLogsByScheduledTime } from "../utils/historyUtils.jsx";

export function useChangeHistory(targetId = null) {
  const [urls, setUrls] = useState([]);
  const [urlHistories, setUrlHistories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistories = async () => {
      setLoading(true);
      setError(null);

      const urlResponse = await fetchUrls();
      const urlList = urlResponse?.urlList || [];
      setUrls(urlList);

      if (!targetId && urlList.length === 0) {
        setUrlHistories({});
        setLoading(false);

        return;
      }

      try {
        const urlsToFetch = targetId
          ? urlList.filter((url) => url._id === targetId)
          : urlList;

        const fetchedHistory = urlsToFetch.map(async (url) => {
          const historyResponse = await fetchUrlHistory(url._id);
          const sortedLogs = sortLogsByScheduledTime(
            historyResponse.urlHistoryLogs,
          );

          return {
            urlId: url._id,
            sortedLogs,
          };
        });

        const urlHistoryResults = await Promise.all(fetchedHistory);

        const urlHistoryMap = Object.fromEntries(
          urlHistoryResults.map(({ urlId, sortedLogs }) => [urlId, sortedLogs]),
        );

        setUrlHistories(urlHistoryMap);
      } catch (err) {
        console.error("히스토리 불러오기 실패", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadHistories();
  }, [targetId]);

  return { urls, urlHistories, loading, error };
}
