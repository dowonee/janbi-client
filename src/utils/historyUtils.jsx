export function sortLogsByScheduledTime(logs = []) {
  return [...logs].sort(
    (a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime),
  );
}

export function formatDate(date) {
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function highlightDiff(before = "", after = "") {
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

export function mergeDuplicateLogs(rawLogs = []) {
  if (!rawLogs || rawLogs.length === 0) return [];

  const sortedLogs = [...rawLogs].sort(
    (a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime),
  );

  const normalize = (log) =>
    (log.changedContents || []).map((item) => ({
      selector: item.selector,
      afterHtml: (item.afterHtml || "").trim(),
    }));

  const merged = [];

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
