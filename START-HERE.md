# Routines — Update 14

This is an update for the existing Routines app, not a new app. It preserves the existing GitHub Actions workflow and signing settings.

1. Unzip the update and upload its contents to the existing Routines repository, keeping the same folder paths. Do not delete your existing assets or workflow files.
2. Run your existing **Send to App Store** workflow as usual. The cloud workflow requires available Expo iOS build credits.
3. Install the resulting TestFlight build and check that Settings says **Update 14**.

All-day task countdowns show the time remaining until midnight, not a newly assigned appointment. Your existing evening check-in reminders still follow your notification settings. The sleep question is a check-in based on app activity; the app cannot detect whether you actually slept.
