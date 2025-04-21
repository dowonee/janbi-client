import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import HistoryLog from "./HistoryLog";

export default function UrlHistoryItem({ urlInfo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded mb-4">
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <p className="font-semibold text-gray-800">{urlInfo.name}</p>
          <p className="text-sm text-gray-600">{urlInfo.url}</p>
        </div>
        {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      {expanded && (
        <div className="p-4 bg-white">
          <HistoryLog logs={urlInfo.logs} />
        </div>
      )}
    </div>
  );
}
