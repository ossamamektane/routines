# Version 35 — status area and task refinement

## Status and tint

The previous app divided the screen at the native top safe area and animated a second React Native tint above the WebView. Bridge timing could make one half appear before the other, or leave the status area looking wrong. `App.js` now renders the existing WebView through the safe area, passes the actual top/bottom/side insets into CSS at startup and when they change, and keeps status icon style tied to the app theme. `#statusBacking` is an opaque, fixed surface under the system icons and above scrolling content; the WebView scrims are above that backing, so one layer dims the whole app. Sheet height is constrained below the top inset. The old native tint and animation were removed. This is still the version 35 WebView app, not a native rewrite.

The status-bar style, physical iOS safe areas, Dynamic Island, keyboard resizing, nested sheets, and interruption/close/reopen must be checked on an actual iPhone. Browser simulations cannot prove the native bar color or timing. iOS owns its status icons; other OS-level behavior is not guaranteed to be overridden.

## Task list and deadlines

- Untimed tasks due today show the remaining time to the local end of their day instead of only “Due today.” An extended previous day that has passed its midnight still shows its existing late state.
- Week/month goal rows show their period-end day/date in the leading column; wake-dependent tasks without a known time show a dash with an accessible label. Row rendering also has a fallback dash.
- Weekly/monthly countdowns and their sort keys now use the same real local calendar deadline; future untimed dates sort at the end of their due date, not the beginning. Wake-waiting rows are grouped with today's untimed tasks instead of being forced above every dated task. Completed rows remain in Done.
- Weekly/monthly goals use the actual calendar date even when the prior daily routine stays open after midnight. This prevents a new week's goal from showing “0 min left this week” and counts only the current period's logs. Daily routines keep the prior-day extension. Test week/month rollover, daylight-saving transitions and any custom wake behavior on device with backed-up data.

## Color and completion controls

The wake indicator dot and wake confirmation use the same theme-specific green. The light-theme green is deliberately dark enough for white button text; the dark-theme green uses black text for contrast. Completion toast actions have matching 44pt minimum targets and simpler visual treatment. The existing completion-time picker now renders the previously calculated “As scheduled” shortcut when the planned time has passed, using the existing picker handler and completion data. The scheduled and goal/fortnight completion paths were exercised in browser tests, but without the exact reported error we cannot claim the underlying report is resolved.

## Checks and limitations

Run `node scripts/make-web.js` after editing `web/index.html`, then `node scripts/check-project.js`. `scripts/test-refined35.cjs` covers ordering, leading columns, weekly calendar rollover during an extended day, a two-week task, a weekly goal, the scheduled-time shortcut and a simulated web status area in English, French and Arabic. Existing recurrence, motion and reminder-plan tests provide further simulated checks. Old historical tests for the removed `#intervalTrigger` and instant reduced-motion layout no longer match the current interface; their failure is not evidence of a current-device pass. No iOS build, live notification delivery, status-bar behavior or TestFlight run was available here. Back up tasks and do not uninstall the existing app.

## Late-task shortcut

A late timed task’s action sheet offers “Done as scheduled” with its actual scheduled time displayed. Choosing it records that time rather than the current time, and the existing Undo restores the prior task. This action is shown only once the app displays the occurrence as late, and is rechecked when tapped so a stale menu cannot backdate a future or completed task. Postponed tasks use their currently postponed time; their on-time count now uses that same effective time. Untimed tasks and period goals do not have a definite scheduled time, so no time is invented for them. The regular Mark as done option still records completion now.

`node scripts/test-scheduled35.cjs` checks the menu, timestamps, fortnightly/flexible recurrences, postponed time, Undo, localized text, and absence of the option on future and untimed tasks. This is simulated browser testing, not a guarantee of bug-free iOS behavior.
