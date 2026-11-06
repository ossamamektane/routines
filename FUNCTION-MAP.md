# Function map

This map is organized by responsibility rather than mechanically adding a comment to every trivial helper. Read `DESIGN-AND-MAINTENANCE.md` first. These descriptions identify side effects and coupling; they do not certify correctness. `web/index.html` contains all of the following unless another file is named.

## Setup, translation, storage and dates

- `field`, `unzoom`: identify editable controls and undo accidental WebView zoom/sideways displacement. Changing event prevention can affect selection, accessibility and keyboards.
- `ico`, `t`, `esc`: construct inline icons, look up localized strings and escape user text for HTML. Preserve escaping when adding generated markup.
- `get`, `set`, `save`, `snaps`, `pushSnap`: read/write localStorage, save state, and manage local safety snapshots. Within the native app the shim forwards changes; a web-only test does not exercise native disk.
- `getWake`, `setWake`, `wakeRec`, `lastWake`, `wakeList`, `learnWake`, `usualWake`, `wakeAuto`: read/update wake records and history. Changes affect after-waking tasks, automatic day behavior and reminder projections.
- `actList`, `actNote`, `actPts`, `quietGaps`, `nightish`, `sleepFrom`, `stillUp`, `upSince`, `autoWake`: track activity and calculate awake/quiet intervals. `autoWake` is conditional and interacts with user prompts; quiet time is not proof of sleep.
- `repairFuture`, `guardClock`: guard against changed clocks or impossible stored times. Do not remove recovery without migration tests.
- `nat`, `nfGet`, `ndUsed`: native bridge, notification preferences and New Day state. Bridge payloads must match `App.js`.
- `extCut`, `dayInfo`, `today`, `calDay`, `calEnd`, `CUT`, `DE`, `lm`, `ldate`, `dtC`, `ldC`, `recut`, `syncCut`: calendar-day and extended-day calculations. These reassign hourly date/time representations when the day boundary changes; changes can move actual occurrences.
- `iso`, `parse`, `addDays`, `addMonths`, `diff`, `step`, `nextFixed`, `firstOnOrAfter`: local-date arithmetic for recurrence. Monthly dates clamp at month end; fixed repeats are anchored. `nextFixed` estimates the recurrence index and then advances to the next date; test DST and month ends.
- `fmt`, `hm`, `h12`, `ap`, `ft`, `ftH`, `mins`, `nowMin`, `dur`: format and convert times, including device display settings. Stored times stay HH:MM. Do not turn display text into stored state.
- `weekStart`, `period`, `winToday`, `logKey`: flexible goal periods and completion-day lookup. Changes affect quota counts at period boundaries.
- `dt`, `setOcc`, `gridA`, `gridAfter`, `gridLE`: convert hourly task occurrences and calculate fixed hourly grids. A change affects scheduling and reminders.
- `uid`, `dlGet`, `dlSet`, `norm`, `roll`: IDs, the per-day completion ledger, migration/normalization and rolling occurrences forward. Preserve backward compatibility with existing backups.

## Derived model and screen

- `model` and its inner `slot`, `anyDone`, `one`, `ws` functions classify task occurrences, count progress and sort them. Badge and notification planning also consume this model. UI-only changes here can therefore affect reminders.
- `ord`, `every`, `qtxt`, `floats`, `inDays`, `everyN`, `freq`, `describe`, `rel`: produce localized frequency and relative-time text. Do not parse those strings back into the model.
- `descH`, `dsBtn`, `dsFit`, `row`, `sec`, `winRow`, `sec3`, `mini`, `nowCard`: generate task presentation and expandable description controls. Keep escaped task names and notes.
- `windowLeft`, `nextDueLabel`, `dayEnd`, `tabTop`, `tabNow`, `periodLeft`, `left`: time-left and due-date display calculations; distinguish an actual deadline from an illustrative period end.
- `flipKey`, `flipEls`, `flipFirst`, `flipPlay`: animate list changes. Reduced-motion rules should remain effective; animation must not change data.
- `zoneName`, `render`, `paintLeft`, `paintNd`: derive device time-zone note, update the task list and paint wake-state/header information. `render` also invokes model, persistence and notification-plan hooks, so it is not a pure view function. `wakeCheck` is decorative; it does not mark any task done.

## Wake-up, actions and sheets

- `askRec`, `askSet`, `awakeList`, `dayLen`, `learnDay`, `missedIn`, `sleptLikely`, `touch`, `joinNames`, `wakeCard`, `wakeLbl`, `showNd`, `wakeIs`, `noSleep`, `wakeAtAbs`, `editWake`: prompt, record, revise or describe wake state. They affect task timing; exercise yesterday/today and midnight cases.
- `lockSync`: lock background scrolling while sheets are open. It is coupled to touch handling, focus, keyboard dismissal and scroll restoration.
- `find`, `snap`, `buzz`, `stamp`: locate tasks, snapshot for undo, send haptics and obtain a current time.
- `advance`, `retime`, `restore`, `skipItem`, `apply`, `slotInfo`, `act`: mutate occurrences, handle completion/undo/skip/later and persist/render feedback. `apply` is a shared mutation point, not merely a visual checkmark.
- `toast`, swipe helpers `stop`/`end`, `canLater`, `openMenu`, `closeMenu`: transient feedback, gestures and task actions. A visible button must continue to offer actions accessible without a swipe.
- `lateQueue`, `openCatch`, `closeCatch`, `paintCatch`, `answer`, `answerAll`, `maybeCatch`: catch-up queue and answers. `maybeCatch` currently returns immediately, so it does not auto-open.
- `openSheet`, `closeSheet`, `N`, `canWake`, `canNoFix`, `startDay`, `startDate`, `validStart`, `formValid`, `paintSave`: edit draft setup, allowed choices, validation, disabled state and sheet lifecycle. Saving must revalidate, not trust appearance alone.
- `durationItem`, `drawDuration`, `updateDuration`: render and maintain the custom duration wheel. Values map to 40px rows; update CSS and JS together if row height changes. A draft is not committed until Set duration.
- `stepper`, `toggle`, `joinTimes`, `gridPreview`, `summary`, `paintSheet`, `growDesc`: construct editor controls, descriptions and summaries; event delegation survives repaint. `paintSheet` can alter draft values that are invalid for the selected mode.
- `wheelLabels`, `buildWheels`, `setWheels`, `readWheels`, `openPicker`, `tMoment`, `tPaint`, `openTime`, `closeTime`, `pickTime`, `didAt`: canonical time entry and the wake/completion time sheet. They feed the shared custom picker; test it in iPhone WebKit.
- `openLater`, `closeLater`, `pickLater`: move one occurrence while honoring date/time rules. Test both timed and untimed tasks.
- `allTag`, `allSort`, `paintAll`, `list`, `openPrefs`, `closePrefs`, `openAll`, `closeAll`, `fitMenu`, `closeMenus`: list, settings and menu navigation; menus need narrow-screen/RTL tests.
- `applyClock`, `applyTheme`, `applyLang`: update settings, rerender labels and/or notify native shell. Theme and language choice persist.
- `importText`: validates/normalizes user-selected backup data and replaces task/history state; its Undo restores both the task snapshot and previous history. Test malformed, old and valid backups; never add undocumented network upload.

## Notification projection

- `atDay`, `dueOn`, `nList`, `notifPlan` and its inner `add`, `key`, `slotN`, `wakeDay`, `nudge`: build a limited future local-reminder plan from task rules and user preferences. These do not themselves schedule with iOS.
- `badgePlan` and its inner `owed`, `endOf`: calculate future badge counts and badge-only changes. Exercise midnight, overdue items and notification limits before changing.
- `syncPlan`, `sendPlan`, `away`: debounce plans, send them to the native bridge and force a refresh on backgrounding. App suspension makes timing sensitive.
- `paintNf`, `askNf`: display notification permission state and request/route permission. OS authorization and delivery are outside browser control.

## Native files

- `App.js`: `timeZone` obtains a device zone; `Main` owns lifecycle and bridge dispatch. Its `call`, `sendPerm`, `reload`, `handleResponse`, `doExport`, `doImport`, `haptic`, `onMessage` callbacks connect page state to OS APIs. Notification taps are deduplicated via metadata.
- `src/store.js`: `loadStore`, `getStore`, `applyChange`, `flushStore`, `setAway`, `readMeta`, `writeMeta`, `file` implement revisioned storage, batching and recovery. They are not a cloud sync.
- `src/notify.js`: `setupChannel`, `granted`, `describe`, `permState`, `askOrOpenSettings`, `askPermission` handle permissions; `setBadge`/`applyBadge` track the desired badge; `ensureCategory`, `hash`, `idOf`, `atOf`, `applyPlan`, `run`, `schedule`, `sync`, `clearAll` reconcile pending reminders. OS restrictions still apply.
- `src/shim.js`: injected `send`, `queue`, `bump` synchronize localStorage; `safe`, `buildPage`, `jsArg` safely assemble the page and injected arguments. Test escaping and startup ordering before changes.

## Update 18: shared date and time dialog

- `syncPickerFields` creates idempotent visible triggers for hidden canonical inputs, including fields recreated during rendering. `cpOpen` copies a draft, `cpDraw` renders calendar or hour/minute controls, and `cpClose` restores focus. Only Set dispatches input/change events; Cancel makes no data change. Date limits are enforced in the calendar and at commit. Keep these IDs and canonical values stable when editing form logic.
- `lateDays` formats overdue days in context in English, French, and Arabic, including Arabic singular and dual.
- `advance` snapshots `laterDate`; `restore` reads it when available so unchecking preserves an earlier postponement. Old snapshots without this key remain supported. Hourly `prev.parent` holds earlier same-day snapshots (maximum 48 links) for successive unchecks; when the latest check is removed, previously unchecked older snapshots are unwound too. Do not use a full-state rollback for ordinary unchecking, because other tasks may have changed since.

## Update 19: task editor
- `validStart()` accepts any valid calendar date; the recurrence anchor remains the chosen date, while `roll()` decides the current occurrence for timed tasks.
- `openPicker()` opens the shared picker directly; `addPickedTime()` commits only after Set. Cancel must not mutate the task draft. `wInput` has no generated trigger because Add time is the trigger.
- `paintSheet()` hides the schedule-mode selector for hourly tasks, retaining scheduled mode. Other repeat units keep their existing flexible eligibility rules.
- `updateEditorCue()` only indicates more editor content; the header and save footer stay fixed and fields remain scrollable.

## Update 20: editor visibility and time entry
- `#hint` is inside `#sbody`; only validation and Save remain fixed. `#sbody` bottom padding and scroll padding keep the final controls reachable.
- `CP.twelve` is true for the task Add time dialog and otherwise follows `h12()`. `CP.minute` and stored task times remain 24-hour values; test noon, midnight, cancellation, and both display preferences.
- Repeat text has explicit ink colors to avoid iOS touch tint during scroll. The local-time zone label was removed; time calculations still use the phone’s local time zone.

## Time wheel and safe area (Update 21)
`cpOpen` creates a time draft; `cpDraw` builds repeated hour/minute wheels. `wheelRead` maps the centered row to canonical 24-hour minutes, and `wheelPaint` updates visual and accessibility values. Set commits to the hidden input; Cancel discards it. Repeat cycles are recentered after scrolling settles. Keep 44px row height, 220px viewport and 88px padding in sync. `App.js` reserves the iOS top safe area outside the WebView to keep content out of the status bar; Android retains injected insets.

`drawDuration` and `updateDuration` own the separate after-waking duration wheel. Its 120px viewport, 40px rows and 40px end spacers work together; preserve these proportions when changing the layout. The maximum is 18:00.
