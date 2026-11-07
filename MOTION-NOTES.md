# Version 35 — keyboard, color, and modal follow-up

This builds on the original version 35 WebView app, not the separate native preview. The original folder is unchanged. The app bundle ID and storage behavior are unchanged. Do not uninstall the existing app; uninstalling can erase locally stored tasks.

## What changed and why

- **Keyboard:** `App.js` sets WebView `hideKeyboardAccessoryView` to hide the iOS previous/next/Done toolbar shown in the screenshot. The actual iOS keyboard and its appearance are controlled by the system. `web/index.html` provides a localized Done button in the task editor header when the name or multiline notes field is focused, so the user can still dismiss the keyboard. The title remains accessible and the header does not change height. This must be checked on a real iPhone, including VoiceOver, small screens and dark keyboard.
- **Wake prompt:** the positive action is green with high-contrast text, in both themes; informational wake labels and the intermediate timeline state are neutral instead of yellow. Red continues to denote overdue status. Some old CSS is superseded by the final rules; do not remove those final overrides without reviewing the cascade.
- **Opening:** the web backdrop is applied immediately; only the sheet travels in over 600ms. WebKit cannot draw over the native status-bar safe area, so a separate `modalState` message makes the matching native tint appear immediately in `App.js`. The bridge can introduce a frame of delay on a busy device.
- **Closing:** the sheet and its web and native tints fade/slide out over 450ms; scroll lock and the wake-sheet DOM remain for 470ms. Coalesced bridge updates avoid a flash when replacing one sheet with another. A rapid reopen cancels the pending unlock.
- **Accessibility setting:** at the user's explicit request the app's own sheets slide even if Reduce Motion is enabled; the overdue breathing animation still respects Reduce Motion. Overriding an accessibility preference may be uncomfortable for motion-sensitive users. iOS-owned transitions and the keyboard are outside the app's full control; cross-fade settings cannot be globally disabled or guaranteed to have no effect. An in-app reduced-motion option would be a safer future improvement.

Source of truth: edit `web/index.html`, then run `node scripts/make-web.js` to regenerate `src/web.js`. Sheet timing, CSS specificity and `lockSync()` cleanup depend on each other; update and test them together. Native status tint is in `App.js`.

## Verification and release

Browser tests are not iOS tests. No Xcode, device, keyboard, VoiceOver, real notification delivery, launch or TestFlight build was available here. Test opening/closing, rapid switching, keyboard Done, both motion settings, both themes, small screens and the wake prompt on an iPhone before relying on it. Notification delivery is not changed or proven by this update.

The inherited GitHub workflow can submit an App Store build. Verify the Expo project, bundle identifier, signing, App Store Connect app and intended build before using it. Preserve existing repository secrets and back up app data; do not uninstall the current app.

## Reminder copy and icon

`notifPlan()` keeps the same schedule and tap identifiers/data but uses the task name as the title, a short “Due now” or the user's note as the body, and “Due at …” for follow-ups. Evening reminders have a short title and task list without duplicate wording. English, French and Arabic strings are kept together in `web/index.html`. Changing text changes the computed notification request ID, so the existing sync logic replaces non-imminent pending reminders on the next plan refresh; near-due requests may retain the old wording. Reminder content, including notes, can be visible on a lock screen according to the user's iOS settings.

iOS uses the installed app icon (`assets/icon.png`) for notifications; apps cannot separately set a custom iOS notification icon. That asset already matches the dark Routines brand shown by the user. The Android-only transparent `assets/notification-icon.png` was rebuilt from the same mark, because Android requires a monochrome status icon. This requires a new native build to take effect. Notification authorization, actual delivery and OS icon rendering must be tested on device; the icon setting does not repair delivery.


# Version 36 — responsive and accessibility motion polish

- Added a native `AccessibilityInfo` bridge for iOS Reduce Motion changes; the WebView toggles a matching root class and updates live without reloading the app. WebKit's `prefers-reduced-motion` media query remains supported as a second path.
- Normal motion now uses one slower, restrained sheet curve with coordinated backdrop fades and no abrupt backdrop jump. Reduced Motion uses a short opacity cross-fade with no travel, scale or spring.
- Added compact-phone, narrow-phone, landscape/short-height, and tablet/desktop layout rules. Sheets cap to the visible viewport, scroll internally, keep safe-area/keyboard padding, and retain touch-sized controls.
- Added visible keyboard focus outlines and consistent 44pt minimum control sizing.
- Added a reduced-transparency fallback that avoids blur where the platform exposes that preference.

Verification: `scripts/check-project.js` passes and the generated `src/web.js` was rebuilt from `web/index.html`. The notification reconciliation mock test passes. Browser/device rendering, keyboard behavior, VoiceOver and iOS's separate “Prefer Cross-Fade Transitions” setting still require physical-device testing; no iPhone build or simulator was available.


## Notification branding follow-up

The app icon is now explicitly set to the black Routines mark for iOS and Android. iOS uses the app icon in notifications and does not support a separate per-notification icon. Android uses a dedicated white-on-transparent monochrome small icon because Android applies its own system tint to that asset; the notification accent color is configured black.
