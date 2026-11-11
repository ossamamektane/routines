# Fullscreen follow-up

Read **FULLSCREEN-NOTES.md** and **BUILD-FIX-NOTES.md** first; keep your existing GitHub workflow and secrets.

# Build fix — start here

Read **BUILD-FIX-NOTES.md** first. Keep your existing GitHub workflow and secrets when replacing the project files.

# Routines 35 — input and appearance follow-up

See **INPUT-AND-APPEARANCE-NOTES.md** for the current changes and required real-iPhone checks. The earlier notes below describe the preceding build; where they conflict, the new notes take precedence.

# Routines 35 — comfort and reliability follow-up

This is the complete version 35 WebView project, with the keyboard, safe-area and modal timing fixes; countdown, ordering and completion-control changes; simplified notification text, a clearly timed late-task completion shortcut, urgency cues and keyboard improvements. Read **MOTION-NOTES.md** for the rationale, code locations, accessibility tradeoff and device-test checklist.

**Do not uninstall the current app:** doing so can erase locally stored tasks. Back up your tasks. Before building or submitting, verify the Expo project, iOS bundle ID, signing credentials and App Store Connect target; the included workflow is inherited and has not been run here. Install as an update only after confirming the identifiers.

No iOS build or iPhone test was available. The app's sheets deliberately animate even under Reduce Motion as requested, but iOS can still control its own keyboard and transitions. Test the keyboard, modal motion and wake prompt on a real device. Notification delivery and the earlier launch issue were not verified or fixed by this change.

See **REFINEMENT-NOTES.md** for scheduling semantics, known limitations and the focused tests. “Done as scheduled” is a separate option for late timed tasks; untimed tasks do not invent a completion time.
