import HistoryLog from "./HistoryLog";
import type { ChangeLog } from "../../types/history";
import type { DayOfWeek } from "../../types/url";

interface UrlInfo {
  name: string;
  url: string;
  dayOfWeek: DayOfWeek;
  scheduleTime: string;
  logs: ChangeLog[];
}

interface UrlHistoryItemProps {
  urlInfo: UrlInfo;
}

export default function UrlHistoryItem({ urlInfo }: UrlHistoryItemProps) {
  return (
    <div className="border rounded mb-4">
      <div className="w-full flex justify-between items-start px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left">
        <div>
          <p className="font-semibold text-gray-800">{urlInfo.name}</p>
          <p className="text-sm text-gray-600">{urlInfo.url}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">알림 주기</p>
          <p className="text-sm text-gray-500 whitespace-nowrap">
            {urlInfo.dayOfWeek}요일 {urlInfo.scheduleTime}
          </p>
        </div>
      </div>
      <div className="p-4 bg-white">
        <HistoryLog logs={urlInfo.logs} />
      </div>
    </div>
  );
}
