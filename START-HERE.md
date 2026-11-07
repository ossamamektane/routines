# Routines 36 — responsive and motion polish

This build adds responsive layouts for compact phones, landscape, tablets and desktop widths, plus a native Reduce Motion bridge. Normal sheet motion is slower and coordinated; reduced motion switches to an opacity cross-fade without sliding or scaling.

Read `MOTION-NOTES.md` for changes, verification and device-test requirements. Do not uninstall the current app: doing so can erase locally stored tasks. Back up tasks and install as an update only after verifying the Expo project, iOS bundle ID, signing credentials and App Store Connect target.

The project/source consistency check passed and `src/web.js` was regenerated. A notification mock test passed. No iOS build, simulator, real iPhone, keyboard or VoiceOver test was available; test these on device before release.

## Notification icon and delivery

The iOS notification banner uses the installed app icon, so the black app icon is configured explicitly for iOS and at the Expo root. Android uses a separate white, transparent monochrome small-icon glyph (the Android OS applies its own icon tint); its notification accent color and adaptive-icon background are black. Local reminders remain scheduled through expo-notifications and require notification permission on the device.
