// Translate a horizontal gesture into a catch-up action. Ignore diagonal and
// short gestures so ordinary vertical sheet scrolling never changes a task.
export function catchSwipe(dx, dy, rtl=false) {
  if (Math.abs(dx) < 90 || Math.abs(dx) < Math.abs(dy) * 1.5) return null;
  return (rtl ? -dx : dx) > 0 ? 'done' : 'later';
}
