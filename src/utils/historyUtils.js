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
