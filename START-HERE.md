# Routines 35 — modal follow-up

This is the complete version 35 WebView project, with the keyboard, safe-area and modal timing fixes; countdown, ordering and completion-control changes; simplified notification text, and a clearly timed late-task completion shortcut. Read **MOTION-NOTES.md** for the rationale, code locations, accessibility tradeoff and device-test checklist.

**Do not uninstall the current app:** doing so can erase locally stored tasks. Back up your tasks. Before building or submitting, verify the Expo project, iOS bundle ID, signing credentials and App Store Connect target; the included workflow is inherited and has not been run here. Install as an update only after confirming the identifiers.

No iOS build or iPhone test was available. The app's sheets deliberately animate even under Reduce Motion as requested, but iOS can still control its own keyboard and transitions. Test the keyboard, modal motion and wake prompt on a real device. Notification delivery and the earlier launch issue were not verified or fixed by this change.

See **REFINEMENT-NOTES.md** for scheduling semantics, known limitations and the focused tests. The reported “Done as scheduled” error needs its exact message or reproduction before it can be diagnosed; this update restores the missing scheduled-time shortcut but does not claim to fix an unspecified error.
