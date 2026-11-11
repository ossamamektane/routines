# Build fix

This is the full Routines app source from the prior InputFix project, with the app assets included. It includes the prior UI and keyboard changes, plus the fullscreen and task-icon follow-up. All runtime dependencies, including React, React Native and expo-file-system, are now explicitly declared using Expo SDK 57's compatible versions. The Expo project and owner match the build log. `.easignore` excludes generated outputs and secrets without excluding `assets/`.

## Replace files, not the GitHub workflow

Extract the ZIP and copy the contents of `Routines-35-BuildFix` into the root of the existing Routines repository. Make sure the five PNG files are committed under the root `assets/` folder and the hidden `.easignore` is included. Commit the updated `package.json`, `app.json`, `App.js`, `src`, `web` and other project files. **Keep the repository's existing `.github/workflows` folder and secrets:** the actual workflow in the supplied log differs from the older workflow bundled in our previous ZIP, so no workflow file is included here. Do not replace your existing `eas.json` if you have customized it; this ZIP contains the same production version settings shown in the log.

The existing workflow in the log runs `npm install` before EAS build, which updates a stale lockfile for these dependencies. If your workflow is changed to use `npm ci` instead, first update and commit package-lock.json using npm install with Node 22. The supplied log showed no use of npm ci at the repository installation step; EAS itself runs npm ci using the resulting lockfile.

Then rerun the existing build. Expo's archive can still exclude files if the repository has other EAS settings or a workflow overwrites `.easignore`; check its archive if the images remain missing. Do not delete the existing app from the phone, since local task data may be lost. Back up first.

No iOS build, TestFlight submission, dependency install, or device test was run here. The project was checked for required asset paths, PNG validity, dependency declarations, source consistency and JS syntax. Test the keyboard, native status bar and app behavior on iPhone after building.
