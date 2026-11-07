# Routines Native — isolated preview source

This is a **React Native / Expo source project**, with native views and no WebView. Its bottom sheet uses the same shared native-driven spring and close timing as the supplied Bills project. It includes a native task list and editor, scheduling and wake-time entry, catch-up actions, pause/resume, deleted-task recovery, settings, backup import/export, and an opt-in notification scheduler.

## Important: not a finished app or an update

This is **not an IPA, a TestFlight release, or a verified replacement**. It uses a different bundle identifier (`com.ossamamektane.routines.nativepreview`) and its own separate local storage. It cannot directly read or overwrite the installed Routines app's data. **Do not uninstall the existing app**: uninstalling can delete its local data. If it opens, first export a backup; this preview can import a v3 Routines JSON backup. If the existing app cannot export a backup, keep it installed so its local data is not lost.

The preview does not yet have full feature parity. It includes a basic catch-up flow, yesterday/no-sleep wake handling, a completion-time control, React Native calendar and time wheels, and a notification action handler; catch-up swipe gestures are implemented, but some original reminder controls are not yet implemented. Reminder settings are opt-in for this separate preview. Reminder scheduling uses the system default sound, but delivery, sound, permissions, notification actions and scheduling behavior have not been checked on a device. Do not rely on this preview for reminders or important task data.

No iPhone, iOS simulator, Hermes runtime, Xcode build or TestFlight build was available in this environment. The full native UI, keyboard behavior, sheet animations, small-screen sizing, accessibility, localization/RTL, data import and notifications must be verified on real iPhones before a release. Even passing tests cannot guarantee no crashes or bugs.

## Checks run here

- Native source syntax and local import bundle checked using Babel and esbuild, with React Native/Expo modules marked external; this does not compile or run iOS.
- The scheduling model, reminder plans and selected actions were compared with the current app in the same browser JavaScript runtime across three dates and English, French and Arabic in America/New_York, Europe/Paris and Africa/Casablanca. Five editor mutations were also compared in the Casablanca browser runtime. These are limited parity checks, not exhaustive tests or native OS delivery tests.
- A Node smoke test exercised creation, editing, completion, pause/resume, wake, state restoration and validation. Browser-based React Native mocks exercised task editing, pause/resume, deletion and recovery, 12-hour time selection, catch-up actions and swipe wiring, Arabic layout wiring, notification actions and backup round trips; separate mocked checks exercised reminder reconciliation and two-copy storage recovery; these do not test native UI, motion or OS delivery. Timezone/DST behavior must still be checked on iOS/Hermes. A separate comparison showed Node and Chromium can disagree on Casablanca timezone data.

## Files and build

- `App.js`: native UI and preview integrations.
- `src/engine.js`: extracted legacy scheduling logic and a native editor adapter, with no DOM or WebView runtime.
- `src/NativeSheet.js`: Bills-style bottom sheet based on the reference's React Native animation.
- `src/swipe.js`: guarded and RTL-aware catch-up gesture direction.
- `src/trash.js`: recover deleted tasks; preview exports include an optional `nativeDeleted` field that the original app can ignore.
- `src/store.js`: two revisioned local copies, in the preview's own container; unreadable copies do not trigger an automatic empty overwrite.
- `src/notify.js`: experimental Expo local notification scheduling.
- `test-engine.cjs`, `test-editor.cjs`, `test-wake.cjs`, `test-parity.cjs` and `tests/harness/`: limited test scripts. The parity, editor and wake comparison scripts additionally require the original Routines-36 source/test fixture and Playwright/Chromium; set `ROUTINES_REFERENCE_DIR` and `CHROMIUM_PATH` as appropriate.

Install dependencies and build using an Expo/EAS environment with network access and valid Apple credentials. The package versions follow the supplied Bills project. A developer must configure a separate EAS project and signing for the preview identifier. Do not change the identifier to the installed production app's identifier until the migration, crash recovery and device tests have been independently reviewed. Example local commands:

```sh
npm install
npm run setup
npm start
```

## GitHub Actions / TestFlight (separate preview app only)

`.github/workflows/native-preview-testflight.yml` is a **manual** preview workflow. It has not been run in GitHub or validated against Expo/App Store Connect. It does not use the old `scripts/make-web.js` or WebView dependencies. This source must be at the repository root when the workflow runs. Do not run the old “Send to App Store” workflow on this native project: it expects the old WebView app and targets the original App Store Connect app.

Before running this workflow, create a separate Expo project and a separate App Store Connect app using `com.ossamamektane.routines.nativepreview` (a new App Store Connect app must have a unique name). In GitHub repository Actions secrets, set `EAS_PREVIEW_PROJECT_ID` to the new Expo project ID, and `ASC_PREVIEW_APP_ID` to the new App Store Connect app's numeric Apple ID. The workflow uses the existing `EXPO_TOKEN`, `ASC_KEY_P8`, `ASC_KEY_ID`, `ASC_ISSUER_ID`, `APPLE_TEAM_ID`, and optional `APPLE_TEAM_TYPE` secrets. The Apple API key must have permission for the preview app and signing resources. If the old `ASC_APP_ID` secret is present, the workflow rejects a matching preview ID. Check all project, app and signing details before dispatching.

On GitHub, use Actions → “Send Native Preview to TestFlight” → Run workflow. It builds the production distribution profile for the preview bundle and submits that exact build ID, not the latest build. You may still need to configure EAS iOS credentials/provisioning and App Store Connect before a non-interactive build can succeed. A TestFlight preview does not prove correctness or notification delivery.
