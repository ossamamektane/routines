const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'web/index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'App.js'), 'utf8');
const bundle = fs.readFileSync(path.join(root, 'src/web.js'), 'utf8');
const checks = [
  ['compact phone breakpoint', /@media\s*\(max-width:\s*380px\)/.test(html)],
  ['landscape height handling', /max-height:\s*520px\)\s*and\s*\(orientation:\s*landscape/.test(html)],
  ['tablet/desktop breakpoint', /@media\s*\(min-width:\s*700px\)/.test(html)],
  ['web reduced-motion cross-fade', /@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(html) && /opacity 180ms ease/.test(html)],
  ['native Reduce Motion bridge', /AccessibilityInfo\.isReduceMotionEnabled/.test(app) && /reduceMotionChanged/.test(app) && /native-reduce-motion/.test(app)],
  ['reduced transparency fallback', /prefers-reduced-transparency:\s*reduce/.test(html)],
  ['generated bundle includes latest responsive rules', bundle.includes('native-reduce-motion') && bundle.includes('max-height:520px')],
];
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
if (checks.some(([, ok]) => !ok)) process.exit(1);
