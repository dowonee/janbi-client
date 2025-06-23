export function sortLogsByScheduledTime(logs = []) {
  return [...logs].sort(
    (a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime),
  );
}
