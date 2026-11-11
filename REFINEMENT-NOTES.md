# Version 35 — status area and task refinement

## Status and tint

The WebView covers the screen beneath the iOS status icons. `App.js` passes real top/bottom/side insets into CSS and explicitly uses dark status symbols for the light theme, light symbols for the dark theme, with no modal-driven style change. The separate status-area backing has been removed: the native status area is transparent, the page may scroll beneath the system icons, and one WebView scrim dims the page. iOS owns the status icons and draws them above the web tint; the app cannot tint those icons with its WebView. This is still the version 35 WebView app, not a native rewrite.

The status-bar style, physical iOS safe areas, Dynamic Island, keyboard resizing, nested sheets, and interruption/close/reopen must be checked on an actual iPhone. Browser simulations cannot prove the native bar color or timing. iOS owns its status icons; other OS-level behavior is not guaranteed to be overridden.

## Task list and deadlines

- Untimed tasks due today show the remaining time to the local end of their day instead of only “Due today.” An extended previous day that has passed its midnight still shows its existing late state.
- Week/month goal rows show their period-end day/date in the leading column; wake-dependent tasks without a known time show a dash with an accessible label. Row rendering also has a fallback dash.
- Weekly/monthly countdowns and their sort keys now use the same real local calendar deadline; future untimed dates sort at the end of their due date, not the beginning. Wake-waiting rows are grouped with today's untimed tasks instead of being forced above every dated task. Completed rows remain in Done.
- Weekly/monthly goals use the actual calendar date even when the prior daily routine stays open after midnight. This prevents a new week's goal from showing “0 min left this week” and counts only the current period's logs. Daily routines keep the prior-day extension. Test week/month rollover, daylight-saving transitions and any custom wake behavior on device with backed-up data.

## Color and completion controls

The wake indicator dot and wake confirmation use the same theme-specific `--ok` green as the enabled switches. The confirmation uses black text for contrast in both themes. Completion toast actions have matching 44pt minimum targets and simpler visual treatment. The existing completion-time picker now renders the previously calculated “As scheduled” shortcut when the planned time has passed, using the existing picker handler and completion data. The scheduled and goal/fortnight completion paths were exercised in browser tests, but without the exact reported error we cannot claim the underlying report is resolved.

## Checks and limitations

Run `node scripts/make-web.js` after editing `web/index.html`, then `node scripts/check-project.js`. `scripts/test-refined35.cjs` covers ordering, leading columns, weekly calendar rollover during an extended day, a two-week task, a weekly goal, the scheduled-time shortcut and a simulated web status area in English, French and Arabic. Existing recurrence, motion and reminder-plan tests provide further simulated checks. Old historical tests for the removed `#intervalTrigger` and instant reduced-motion layout no longer match the current interface; their failure is not evidence of a current-device pass. No iOS build, live notification delivery, status-bar behavior or TestFlight run was available here. Back up tasks and do not uninstall the existing app.

## Late-task shortcut

A late timed task’s action sheet offers “Done as scheduled” with its actual scheduled time displayed. Choosing it records that time rather than the current time, and the existing Undo restores the prior task. This action is shown only once the app displays the occurrence as late, and is rechecked when tapped so a stale menu cannot backdate a future or completed task. Postponed tasks use their currently postponed time; their on-time count now uses that same effective time. Untimed tasks and period goals do not have a definite scheduled time, so no time is invented for them. The regular Mark as done option still records completion now.

`node scripts/test-scheduled35.cjs` checks the menu, timestamps, fortnightly/flexible recurrences, postponed time, Undo, localized text, and absence of the option on future and untimed tasks. This is simulated browser testing, not a guarantee of bug-free iOS behavior.

## UX refinements and simulations

Flexible goals display their remaining time in red during the final 25% of their actual local day, week or month. The calculation uses calendar boundaries and elapsed milliseconds, including daylight-saving changes. The goal is not red after its quota is complete, and a partially completed quota retains its urgency. Legacy untimed flexible daily tasks get the same day threshold. Tapping a non-text editor control dismisses the keyboard after handling the tap; the header Done control remains.

`test-behaviors35.cjs` simulates late, missed, postponement, completion, catch-up and Undo across New York, Paris and Casablanca time zones. `test-comfort35.cjs` exercises threshold boundaries, partial and completed quotas, keyboard control taps and green matching. These browser checks do not establish iOS status-bar color, physical keyboard behavior, notification delivery or real device performance.

The main task and wake-up copy was tightened in English, French and Arabic: examples include “Repeat after completion,” “Change time,” and “Choose a future time.” These are clarity edits, not a claim of an independent professional translation review.

## Status/Toast pass (v35)

- **Message bar**: compact, themed like the page. Text is centred in the space left of the action; Undo (with icon) sits on the physical right in every language, including Arabic. No action → text centred across the bar.
- **Wake line**: "Up for 18h 30m" + a "Since 07:00" control (tap to change). The extra "Your Tuesday continues" line and the "Okay — your day continues" toast were removed as redundant.
- **Task editor title** ("New task"/"Edit task") never changes while typing. A separate "Hide keyboard" bar appears below it. Hiding the bar is deferred ~240ms so a tap on another option (e.g. frequency) lands before the layout changes.
- **Tint** appears in the same frame the sheet starts moving; only the sheet slides slowly (tint transitions are disabled on `.on`).
- **Status bar**: the web page reports its theme on `ready` and on every change; `App.js` re-applies status-bar style on ready and when the app returns to foreground. Dark icons on light, light icons on dark. Needs confirming on a real iPhone.
- **Dark mode**: time/duration wheels and editor fields get a subtle boundary and clearer selected row.
- **Icons**: the app uses Ionicons (open-source). They are not Apple SF Symbols; real SF Symbols would require native rendering.
- **Typography**: one final CSS layer sets the iOS system font (SF Pro / SF Arabic) everywhere, removes all manual letter-spacing (CoreText already applies Apple's tracking; extra tracking cramped text and broke Arabic joining), caps weights at Semibold except the large date title, and disables synthetic bold. The unused embedded Inter font (~50 KB) was removed. `scripts/test-type35.cjs` audits every visible text element.
