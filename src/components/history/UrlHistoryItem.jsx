import React from "react";
import HistoryLog from "./HistoryLog";

export default function UrlHistoryItem({ urlInfo }) {
  return (
    <div className="border rounded mb-4">
      <button className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left">
        <div>
          <p className="font-semibold text-gray-800">{urlInfo.name}</p>
          <p className="text-sm text-gray-600">{urlInfo.url}</p>
        </div>
      </button>
      <div className="p-4 bg-white">
        <HistoryLog logs={urlInfo.logs} />
      </div>
    </div>
  );
}
