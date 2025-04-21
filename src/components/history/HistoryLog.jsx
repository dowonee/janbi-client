import React from "react";

export default function HistoryLog({ logs }) {
  return (
    <div className="space-y-3 text-sm">
      {logs.map((log) => (
        <div key={log._id} className="p-4 border rounded hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="font-medium">
              {new Date(log.scheduledTime).toLocaleString("ko-KR")}
            </p>
            {log.isChanged ? (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                변경 감지됨
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                변경 없음
              </span>
            )}
          </div>
          {log.isChanged && log.changedContents?.length > 0 && (
            <ul className="mt-3 space-y-3">
              {log.changedContents.map((change, i) => {
                const [type, selector] = change.selector.split(":");

                return (
                  <li key={i} className="text-xs">
                    <p className="font-medium text-gray-700 mb-1">
                      [{type.toUpperCase()}] {selector}
                    </p>
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="text-red-600 mb-1">
                        <strong>Before:</strong>{" "}
                        <span className="break-all">{change.before}</span>
                      </div>
                      <div className="text-green-600">
                        <strong>After:</strong>{" "}
                        <span className="break-all">{change.after}</span>
                      </div>
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
