# Routines — Update 21

This is a reconstructed copy of the Routines project: app source, web page, icons, privacy page, and the previously supplied cloud build workflow are included. It is not verified against the current contents of your GitHub repository.

Before replacing repository files, download a backup of your current repository (GitHub: Code → Download ZIP). Keep repository secrets and Expo/App Store signing settings; they are not included in this ZIP.

Extract the ZIP, then upload its contents to the root of the existing repository, preserving the folder paths. The ZIP includes the hidden `.github/workflows/main.yml` file; make sure it is uploaded too. Do not upload the ZIP itself as the project. On GitHub, replacing a file at the same path does not create a duplicate.

Run Actions → Send to App Store. This is the previously supplied Expo cloud workflow. It needs your existing GitHub secrets and available Expo iOS build credits. The workflow builds and submits; it cannot guarantee TestFlight approval. Install the build on an iPhone and confirm Settings says Update 21 before release. Test a reminder while the phone is locked, then close and reopen the app to check saved data.

The original iPhone crash has not been diagnosed because a crash report was not available. Browser tests do not prove that the native iOS app will run without a crash.

Update 18 includes editor layout fixes, start dates for scheduled tasks, daily time validation, and an Apple-style duration wheel. Date and time fields use a shared custom picker. Test these on a real iPhone, including light and dark mode, before submitting; the wheel is a custom web control, not Apple’s native timer picker.

Update 18 adapts typography, colors and spacing from the supplied Apple Developer Support page. Scheduling retains the existing stored date/time format; check/uncheck now also restores a postponed date, and future tasks are shown in the main list. See DESIGN-AND-MAINTENANCE.md for the design mapping, file guide and testing limits.

On iPhone the screen uses the built-in San Francisco system font offline, as Apple recommends for WebKit. The reference stylesheet URL is recorded in the source for comparison, but not loaded. See the maintenance guide, and check the font and custom pickers on an iPhone before release.

Update 19: Add time opens the shared picker directly; Set adds the time and Cancel leaves it unchanged. Scheduled starting dates can be in the past. Hourly tasks no longer show the Flexible option. The editor uses a subtle scroll fade when content remains below. French and Arabic form wording was refined in several places, not fully reviewed.

Update 20 removes the dashboard time-zone footer, moves the recurrence summary into the scrollable form, tightens footer spacing, stabilizes the repeat-control text color, and shows AM/PM in the Add time picker. The app’s 12/24-hour display preference is unchanged. Real iPhone testing remains essential.

Update 21 uses a compact, custom Apple-inspired scrolling time wheel and reserves iOS status-bar space outside the WebView. Test these on an iPhone before submission; browser tests cannot verify iOS rendering or gestures.
