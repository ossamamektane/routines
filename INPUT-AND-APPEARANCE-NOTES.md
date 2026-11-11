# Input and appearance follow-up

This builds on Routines 35 StatusToast. The scheduling model and stored data format were not intentionally changed.

- Removed the editor's extra Hide keyboard bar and its focus-time layout shift. Taps on editor buttons dismiss an active text field after the button action; taps on the fields or surrounding layout no longer trigger a broad delayed blur. Name and Notes retain their values. The return key still advances from Name to Notes. The iOS keyboard accessory remains hidden as before.
- Dark date/time triggers, including completion, postponement, wake-up and editor controls, use a shared visible surface and outline. The shared wheel and its commit/cancel logic are unchanged.
- The task menu now marks the ellipsis instead of covering the whole selected row with a large gray rectangle.
- Settings uses plain section headings, a moon for evening check-ins, and outward/up and inward/down arrows for export and import respectively.
- App-generated icons use the Lucide outline family on one 24-unit grid, with consistent stroke defaults. See LUCIDE-LICENSE.txt and REACT-ICONS-LICENSE.txt; the SVGs are bundled, so no network or runtime icon dependency is needed.
- The iOS status bar is hidden in the app: the clock, signal, Wi-Fi and battery symbols are not shown. There is no native white strip or status-bar tint. The page extends into the top area while controls keep safe-area clearance. Android retains its theme-aware status icons.

## Device checks required

These changes have not been tested in an iPhone or signed build. In TestFlight, tap Name and Notes repeatedly, type, switch fields, tap frequency and time controls, dismiss/reopen the editor, and try with the iOS keyboard in different sizes and orientations. Confirm the status bar stays hidden on light/dark/automatic themes, app launch/resume and nested sheets, including devices with a notch and Dynamic Island; check that controls stay clear of the hardware cutout. Test the time wheels and Cancel/Set in each flow. Browser focus tests do not prove iOS keyboard behavior.

Back up tasks and install as an update; do not uninstall the existing app. Verify the bundle ID, signing and App Store Connect target before building. Existing notifications and unrelated native behaviors remain unverified here.
