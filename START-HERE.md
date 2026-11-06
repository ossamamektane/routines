# Routines — Update 17

This is a reconstructed copy of the Routines project: app source, web page, icons, privacy page, and the previously supplied cloud build workflow are included. It is not verified against the current contents of your GitHub repository.

Before replacing repository files, download a backup of your current repository (GitHub: Code → Download ZIP). Keep repository secrets and Expo/App Store signing settings; they are not included in this ZIP.

Extract the ZIP, then upload its contents to the root of the existing repository, preserving the folder paths. The ZIP includes the hidden `.github/workflows/main.yml` file; make sure it is uploaded too. Do not upload the ZIP itself as the project. On GitHub, replacing a file at the same path does not create a duplicate.

Run Actions → Send to App Store. This is the previously supplied Expo cloud workflow. It needs your existing GitHub secrets and available Expo iOS build credits. The workflow builds and submits; it cannot guarantee TestFlight approval. Install the build on an iPhone and confirm Settings says Update 17 before release. Test a reminder while the phone is locked, then close and reopen the app to check saved data.

The original iPhone crash has not been diagnosed because a crash report was not available. Browser tests do not prove that the native iOS app will run without a crash.

Update 17 includes editor layout fixes, start dates for scheduled tasks, daily time validation, and an Apple-style duration wheel. The time fields use the device’s picker. Test these on a real iPhone, including light and dark mode, before submitting; the wheel is a custom web control, not Apple’s native timer picker.

Update 17 adapts typography, colors and spacing from the supplied Apple Developer Support page. The Routines interactions and data format are unchanged. See DESIGN-AND-MAINTENANCE.md for the design mapping, file guide and testing limits.

On iPhone the screen uses the built-in San Francisco system font offline, as Apple recommends for WebKit. The reference stylesheet URL is recorded in the source for comparison, but not loaded. See the maintenance guide, and check the font and native time picker on an iPhone before release.
