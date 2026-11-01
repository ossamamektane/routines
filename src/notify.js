// Local notifications only — nothing leaves the phone. The page works out what should ring
// (it knows every task's rules); this file keeps the phone's schedule in sync with that list.
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export const CHANNEL = "reminders";
const MAX = 60; // iOS keeps at most 64 waiting notifications per app

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function setupChannel() {
  if (Platform.OS !== "android") return;
  try {
    await Notifications.setNotificationChannelAsync(CHANNEL, {
      name: "Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      vibrationPattern: [0, 200, 120, 200],
    });
  } catch (e) {}
}

function granted(p) {
  if (!p) return false;
  if (p.granted === true || p.status === "granted") return true;
  const s = p.ios && p.ios.status, E = Notifications.IosAuthorizationStatus || {};
  if (s == null) return false;
  // 2 = allowed, 3 = quiet (provisional), 4 = app clip
  return s === E.AUTHORIZED || s === E.PROVISIONAL || s === E.EPHEMERAL || s === 2 || s === 3 || s === 4;
}

function describe(p) {
  return { granted: granted(p), canAsk: p.canAskAgain !== false && !granted(p), undetermined: p.status === "undetermined" || (p.ios && p.ios.status === 0) };
}

export async function permState() {
  try {
    return describe(await Notifications.getPermissionsAsync());
  } catch (e) {
    return { granted: false, canAsk: false, undetermined: false, err: String((e && e.message) || e) };
  }
}

// You tapped "Turn on notifications": always do something you can see.
// Ask with the iPhone prompt; if iPhone won't ask any more, open Settings for Routines.
export async function askOrOpenSettings(openSettings) {
  const r = {};
  try {
    const before = await Notifications.getPermissionsAsync();
    r.before = String(before.status);
    if (granted(before)) { r.granted = true; return r; }
    await setupChannel();
    const after = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    r.after = String(after.status);
    if (granted(after)) { r.granted = true; return r; }
  } catch (e) {
    r.err = String((e && e.message) || e).slice(0, 160);
  }
  try { await openSettings(); r.settings = true; } catch (e) { r.err = r.err || "settings"; }
  return r;
}

export async function askPermission() {
  try {
    await setupChannel();
    const p = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    return granted(p);
  } catch (e) {
    return false;
  }
}

export async function setBadge(n) {
  try {
    await Notifications.setBadgeCountAsync(Math.max(0, n | 0));
  } catch (e) {}
}

let catLabel = null;
async function ensureCategory(label) {
  if (!label || label === catLabel) return;
  try {
    await Notifications.setNotificationCategoryAsync("task", [
      { identifier: "done", buttonTitle: label, options: { opensAppToForeground: true } },
    ]);
    catLabel = label;
  } catch (e) {}
}

function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

// Plans arrive often (every change in the list). Only the newest one is applied, one at a time,
// and only the differences are touched — so a reminder that is about to ring is never cancelled
// and re-added at the wrong moment.
let latest = null;
let running = false;

export function applyPlan(msg) {
  latest = msg;
  if (!running) run();
}

async function run() {
  running = true;
  try {
    while (latest) {
      const msg = latest;
      latest = null;
      await sync(msg);
    }
  } finally {
    running = false;
  }
}

async function sync(msg) {
  try {
    const p = await Notifications.getPermissionsAsync();
    if (!granted(p)) return;
    await setupChannel();
    await ensureCategory(msg.action);
    const now = Date.now();
    const want = new Map();
    for (const n of Array.isArray(msg.list) ? msg.list : []) {
      if (!n || typeof n.at !== "number" || n.at < now + 5000 || !n.title) continue;
      const id = "r" + hash([n.at, n.kind, n.title, n.body, JSON.stringify(n.data || {})].join("|"));
      if (!want.has(id)) want.set(id, n);
      if (want.size >= MAX) break;
    }
    const have = await Notifications.getAllScheduledNotificationsAsync();
    const haveIds = new Set();
    for (const h of have) {
      haveIds.add(h.identifier);
      if (!want.has(h.identifier)) {
        try { await Notifications.cancelScheduledNotificationAsync(h.identifier); } catch (e) {}
      }
    }
    for (const [id, n] of want) {
      if (haveIds.has(id)) continue;
      const task = n.kind === "slot" || n.kind === "late";
      try {
        await Notifications.scheduleNotificationAsync({
          identifier: id,
          content: {
            title: String(n.title).slice(0, 120),
            body: String(n.body || "").slice(0, 240),
            sound: "default",
            data: Object.assign({}, n.data || {}, { kind: n.kind }),
            ...(task ? { categoryIdentifier: "task" } : {}),
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: new Date(n.at),
            channelId: CHANNEL,
          },
        });
      } catch (e) {
        console.warn("Could not schedule", e);
      }
    }
  } catch (e) {
    // Reminders are a help, never a reason to crash.
    console.warn("Reminder sync failed", e);
  }
}

export async function clearAll() {
  try { await Notifications.cancelAllScheduledNotificationsAsync(); } catch (e) {}
}
