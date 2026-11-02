# Routines — the phone app (no terminal needed)

Same flow as Bills: everything is clicks in a browser, then one button builds and sends the app to App Store Connect.

What's inside:
- `web/index.html` — the Routines screen (the exact same file as the website). To change the app's screen later, replace this one file and run the workflow again.
- `App.js`, `src/` — the phone side: notifications, haptics, badge, safe saving, backups, Android back button.
- `.github/workflows/app-store.yml` — the "Send to App Store" button.
- `privacy.html` — upload it to the website repo (next to index.html) for the App Store privacy link.

Bundle ID: `com.ossamamektane.routines`
