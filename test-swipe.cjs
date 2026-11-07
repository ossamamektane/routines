// Gesture decisions are pure; actual native touch handling still needs a device.
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const code = fs.readFileSync('src/swipe.js', 'utf8');
  const {catchSwipe} = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
  assert.equal(catchSwipe(120, 10), 'done');
  assert.equal(catchSwipe(-120, 10), 'later');
  assert.equal(catchSwipe(120, 10, true), 'later');
  assert.equal(catchSwipe(-120, 10, true), 'done');
  assert.equal(catchSwipe(89, 0), null);
  assert.equal(catchSwipe(120, 100), null);
  console.log('PASS catch-up swipe thresholds, diagonals and RTL');
})().catch(err => { console.error(err); process.exitCode = 1; });
