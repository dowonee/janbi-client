import { JSX } from "react";
import type { ChangeLog, ChangedContent } from "../types/history";

export function sortLogsByScheduledTime(logs: ChangeLog[] = []): ChangeLog[] {
  return [...logs].sort(
    (a, b) =>
      new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime(),
  );
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function highlightDiff(
  before: string = "",
  after: string = "",
): { beforeJsx: JSX.Element; afterJsx: JSX.Element } {
  let diffIndex = 0;

  while (
    diffIndex < before.length &&
    diffIndex < after.length &&
    before[diffIndex] === after[diffIndex]
  ) {
    diffIndex++;
  }

  const beforeMatched = before.slice(0, diffIndex);
  const beforeChanged = before.slice(diffIndex);

  const afterMatched = after.slice(0, diffIndex);
  const afterChanged = after.slice(diffIndex);

  return {
    beforeJsx: (
      <>
        {beforeMatched}
        <strong>{beforeChanged}</strong>
      </>
    ),
    afterJsx: (
      <>
        {afterMatched}
        <strong>{afterChanged}</strong>
      </>
    ),
  };
}

export function mergeDuplicateLogs(rawLogs: ChangeLog[] = []): ChangeLog[] {
  if (rawLogs.length === 0) return [];

  const sortedLogs = [...rawLogs].sort(
    (a, b) =>
      new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime(),
  );

  const normalize = (log: ChangeLog) =>
    (log.changedContents || []).map((item) => ({
      selector: item.selector,
      afterHtml: (item.afterHtml || "").trim(),
    }));

  const merged: ChangeLog[] = [];

  for (const log of sortedLogs) {
    const prev = merged[merged.length - 1];

    const isSame =
      prev &&
      prev.isChanged === log.isChanged &&
      JSON.stringify(normalize(prev)) === JSON.stringify(normalize(log));

    if (!isSame) {
      merged.push(log);
    }
  }

  return merged;
}
