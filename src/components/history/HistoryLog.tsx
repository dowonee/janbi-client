import { highlightDiff, formatDate } from "../../utils/historyUtils";
import type { ChangeLog } from "../../types/history";

interface HistoryLogProps {
  logs: ChangeLog[];
}

export default function HistoryLog({ logs }: HistoryLogProps) {
  if (logs.length === 0) {
    return (
      <div className="p-4 border rounded text-sm text-gray-500 bg-gray-50">
        <p>저장된 변경 이력이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 text-sm">
      {logs.map((log, index) => {
        const isChanged = log.isChanged;

        let statusLabel = "";
        let statusStyle = "";

        if (index === logs.length - 1) {
          statusLabel = "초기 상태";
          statusStyle = "bg-gray-100 text-gray-500";
        } else if (log.isChanged) {
          statusLabel = "변경 감지됨";
          statusStyle = "bg-blue-100 text-blue-700";
        } else {
          statusLabel = "변경 없음";
          statusStyle = "bg-gray-100 text-gray-500";
        }

        return (
          <div
            key={log._id}
            className="p-4 border rounded hover:bg-gray-50 w-full max-w-full overflow-x-hidden"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{formatDate(log.scheduledTime)}</p>
              <span className={`px-2 py-0.5 text-xs rounded ${statusStyle}`}>
                {statusLabel}
              </span>
            </div>
            {log.changedContents?.length > 0 && (
              <ul className="mt-3 space-y-3">
                {log.changedContents.map((change, i) => {
                  const { beforeJsx, afterJsx } = highlightDiff(
                    change.beforeHtml || "",
                    change.afterHtml || "",
                  );
                  return (
                    <li key={i} className="text-xs w-full max-w-full">
                      <div className="bg-gray-100 p-2 rounded space-y-1">
                        {isChanged ? (
                          <>
                            <div className="text-red-600">
                              <strong>Before:</strong>{" "}
                              <span className="break-all">{beforeJsx}</span>
                            </div>
                            <div className="text-green-600">
                              <strong>After:</strong>{" "}
                              <span className="break-all">{afterJsx}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-gray-700">
                            <strong>내용:</strong>{" "}
                            <span className="break-all">
                              {change.afterHtml}
                            </span>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
