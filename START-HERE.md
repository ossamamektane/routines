# Routines — Update 29

This ZIP is a reconstructed Routines project, including the supplied GitHub Actions workflow. It has **not** been compared with the current repository: download a backup before replacing files. Preserve GitHub secrets and Expo/App Store signing settings; they are not included here.

Extract the ZIP and upload its contents to the repository root, including `.github/workflows/main.yml`. Then run the existing **Send to App Store** workflow. Expo build and submission queues, account settings and App Store review still apply.

## What changed

- Compact rounded pop-ups for task editing, management, wake-up and catch-up; clear, non-dimming backgrounds and internally scrolling content.
- Repeat, starting date and time open child pop-ups. Repeat changes are temporary until Set; Cancel or Back restores the original draft. The editor’s top checkmark saves the task.
- Task menus and small pickers appear near the control that opened them, with edge-aware placement. Large pop-ups remain centered and animate from the control’s direction.
- Grouped repeat/date fields, centered floating add button, rounded editor edges and charcoal dark mode. Supporting comments and regression tests are included.

The interface is still a WebView with custom CSS and controls—not a SwiftUI rewrite or Apple’s native Liquid Glass or SF Symbols. It is inspired by the supplied reference, not an exact pixel copy. Reminder sounds and call-like alerts are unchanged.

Before release, build and test on actual iPhones, including a small screen, rotation, keyboard, scrolling, nested pop-ups, VoiceOver, Reduce Motion, light/dark mode, languages, task persistence and notifications while locked. Browser tests cannot guarantee iOS behavior or delivery. See `DESIGN-AND-MAINTENANCE.md` for source, schedule and testing details.
