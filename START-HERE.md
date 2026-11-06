# Routines — Update 31

This reconstructed project includes the supplied GitHub Actions workflow. It has **not** been compared with the current repository: download a backup before replacing files. Preserve GitHub secrets and Expo/App Store signing settings; they are not included here.

Extract the ZIP and upload its contents to the repository root, including `.github/workflows/main.yml`. Then run the existing **Send to App Store** workflow. Expo build/submission queues, account settings and App Store review still apply.

## What changed

- Settings now uses a React Native bottom sheet with a native-driver animation based on Bills. The editor and other screens still use the WebView; their sheet and backdrop timing is synchronized and more deliberate. This is not a full native or SwiftUI rewrite.
- Sheet surfaces are opaque, scroll within the available height, and support Reduce Motion. Editor keyboard handling advances from Name to Notes and avoids adding the home-indicator inset when the visible viewport is reduced by a keyboard.
- “All tasks” replaces “Manage tasks”; the same list separates active and paused tasks. Paused tasks remain editable. The wake-time control has a border; overdue text has a gentle Reduce Motion-aware pulse. Green marks completion and red marks late/destructive states.
- English keeps Scheduled/Flexible; Arabic uses clearer descriptions of a fixed time versus no fixed time. Contextual text explains each mode. Selected actions use haptics when supported.

**Before release, build and test on actual iPhones:** keyboard appearance and dismissal, small screens, rotation, safe areas, rapid modal open/close, scroll, nested sheets, haptics, VoiceOver, Reduce Motion, light/dark themes, languages, task persistence and locked-device notifications. Browser tests cannot prove native keyboard, animation performance or notification delivery. See `DESIGN-AND-MAINTENANCE.md` for implementation details.
