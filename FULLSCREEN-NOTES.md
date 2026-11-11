# Fullscreen and task-action follow-up

- iOS status symbols are hidden while the app is open, so there is no white strip, separate tint or clock/signal/Wi-Fi/battery display. The page background continues to the top. Controls still respect iOS safe-area insets, including the notch and Dynamic Island. Android keeps its status bar.
- The task editor uses a calendar with an X for skipping the next occurrence, a circled pause/resume pair, and a trash can for delete. The actions' logic, two-tap delete confirmation and Undo are unchanged.
- The build-fix assets and explicit Expo-compatible dependencies remain included. Keep your existing GitHub Actions workflow; see BUILD-FIX-NOTES.md.

No signed iOS build or physical-device test was available. Verify the hidden status bar after launch/resume and when opening and closing nested sheets, and check safe areas on a notched iPhone. System-owned launch, permission and other screens can still display status symbols.
