import React from "react";

export default function HistoryLog({ logs }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="p-4 border rounded text-sm text-gray-500 bg-gray-50">
        <p>저장된 변경 이력이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 text-sm">
      {logs.map((log) => (
        <div
          key={log._id}
          className="p-4 border rounded hover:bg-gray-50 w-full max-w-full overflow-x-hidden"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium">
              {new Date(log.scheduledTime).toLocaleString("ko-KR")}
            </p>
            <span
              className={`px-2 py-0.5 text-xs rounded ${
                log.isChanged
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {log.isChanged ? "변경 감지됨" : "초기 상태"}
            </span>
          </div>
          {log.changedContents?.length > 0 && (
            <ul className="mt-3 space-y-3">
              {log.changedContents.map((change, i) => {
                const [type, selector] = change.selector.split(":");

                return (
                  <li key={i} className="text-xs w-full max-w-full">
                    <p className="font-medium text-gray-700 mb-1 text-wrap break-words whitespace-pre-wrap overflow-hidden max-w-full w-full">
                      [{type.toUpperCase()}] {selector}
                    </p>
                    <div className="bg-gray-100 p-2 rounded space-y-1">
                      {log.isChanged && (
                        <>
                          <div className="text-red-600">
                            <strong>Before:</strong>{" "}
                            <span className="break-all">
                              {change.beforeHtml}
                            </span>
                          </div>
                          <div className="text-green-600">
                            <strong>After:</strong>{" "}
                            <span className="break-all">
                              {change.afterHtml}
                            </span>
                          </div>
                        </>
                      )}
                      {!log.isChanged && (
                        <div className="text-gray-700">
                          <strong>내용:</strong>{" "}
                          <span className="break-all">{change.afterHtml}</span>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
