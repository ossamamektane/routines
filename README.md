# Routines Native — isolated preview source

This is a **React Native / Expo source project**, with native views and no WebView. Its bottom sheet uses the same shared native-driven spring and close timing as the supplied Bills project. It includes an early native task list, task editing, wake-time entry, settings, backup import/export, and an opt-in experimental notification scheduler.

## Important: not a finished app or an update

This is **not an IPA, a TestFlight release, or a verified replacement**. It uses a different bundle identifier (`com.ossamamektane.routines.nativepreview`) and its own separate local storage. It cannot directly read or overwrite the installed Routines app's data. **Do not uninstall the existing app**: uninstalling can delete its local data. If it opens, first export a backup; this preview can import a v3 Routines JSON backup. When v36 won't open and no backup exists, do not delete it; diagnosing the crash and preserving its data are separate work.

The preview does not yet have full feature parity. In particular, catch-up, yesterday/no-sleep wake handling, setting a different completion time, full reminder settings and actionable notification responses are not implemented. Dates and times currently use text entry, not iOS pickers. The reminder scheduler is experimental; notification delivery, sound, permissions and response behavior have not been checked on a device, and notification action buttons are intentionally disabled. The v36 launch crash and its notification failure are **not diagnosed or fixed**. Do not rely on this preview for reminders or important task data.

No iPhone, iOS simulator, Hermes runtime, Xcode build or TestFlight build was available in this environment. The full native UI, keyboard behavior, sheet animations, small-screen sizing, accessibility, localization/RTL, data import and notifications must be verified on real iPhones before a release. Even passing tests cannot guarantee no crashes or bugs.

## Checks run here

- Native source syntax and local import bundle checked using Babel and esbuild, with React Native/Expo modules marked external; this does not compile or run iOS.
- The scheduling model, reminder plans and selected actions were compared with the current app in the same browser JavaScript runtime across three dates and English, French and Arabic in America/New_York, Europe/Paris and Africa/Casablanca. Five editor mutations were also compared in the Casablanca browser runtime. These are limited parity checks, not exhaustive tests or native OS delivery tests.
- A Node smoke test exercised creation, editing, completion, pause/resume, wake, state restoration and validation. Timezone/DST behavior must still be checked on iOS/Hermes. A separate comparison showed Node and Chromium can disagree on Casablanca timezone data.

## Files and build

- `App.js`: native UI and preview integrations.
- `src/engine.js`: extracted legacy scheduling logic and a native editor adapter, with no DOM or WebView runtime.
- `src/NativeSheet.js`: Bills-style bottom sheet based on the reference's React Native animation.
- `src/store.js`: two revisioned local copies, in the preview's own container; unreadable copies do not trigger an automatic empty overwrite.
- `src/notify.js`: experimental Expo local notification scheduling.
- `test-engine.cjs`, `test-editor.cjs`, `test-parity.cjs`: limited test scripts. The latter two additionally require the original Routines-36 source/test fixture and Playwright/Chromium; set `ROUTINES_REFERENCE_DIR` and `CHROMIUM_PATH` as appropriate.

Install dependencies and build using an Expo/EAS environment with network access and valid Apple credentials. The package versions follow the supplied Bills project. A developer must configure a separate EAS project and signing for the preview identifier. Do not change the identifier to the installed production app's identifier until the migration, crash recovery and device tests have been independently reviewed. Example local commands:

```sh
npm install
npm run setup
npm start
```
