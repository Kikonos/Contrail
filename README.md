# Contrail

Your crew logbook: a 3D globe of your flights, logbook, statistics, roster import and Apple Calendar export.

## Put it online (once)

1. On github.com, create a new repository called **Contrail** (public).
2. Choose **Add file > Upload files** and upload everything in this folder: `index.html`, `sw.js`, `manifest.webmanifest`, the `icon-*.png` files, `favicon-32.png` and `icon.svg`. Commit.
3. In the repository, open **Settings > Pages**. Under Source choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute or two the app is live at `https://kikonos.github.io/Contrail/`.

## Install on your iPhone

1. Open the link in Safari, tap **Share**, then **Add to Home Screen**.
2. Open Contrail from the home screen, go to **Settings > Restore backup** and choose `contrail-backup.json` from Files. Do this before importing anything else, because restoring replaces what's on the phone.

Keep `contrail-backup.json` on your phone, not in the repository: GitHub Pages sites are public.

## Day to day

While a file is being read, the grey line under it shows what Contrail is reading. You can switch tabs while it works. If you lock the phone, iPhone pauses the app and the reading carries on from the same place when you come back; a finished import waits in the Add tab until you confirm it, even if the app was closed.

- **RosterBuster or Flighty export:** Add > Import a file. Anything already in your logbook is recognised and only fills in report times or missing details, so importing the same file twice changes nothing.
- **New roster:** Add > Import a roster > choose the roster PDF. Emirates rosters are read on the phone, even offline. Re-importing a revised roster updates times and offers to remove flights that were dropped, so nothing is doubled.
- **Backup:** Settings > Save backup every so often. Your data lives on the phone.
- **Calendar subscription:** Add > Save calendar file, upload `contrail-flights.ics` to this repository, then add a subscribed calendar in iPhone Calendar settings with `https://kikonos.github.io/Contrail/contrail-flights.ics`. Re-upload it when your roster changes. Anyone with that link can see it.
- **Updates:** replace `index.html` in the repository. The app picks up the new version the next time it opens online.

## Flightradar24

With a Flightradar24 API key (from fr24api.flightradar24.com), Contrail can:

- **Follow your flight live:** from 3 hours before departure, the globe card shows where the aircraft is, its height, speed and landing time, about once a minute while the Globe tab is open. If the connection drops after take-off, Contrail keeps going from the last report and shows an estimated position until it's back online.
- **Save the details after landing:** registration, aircraft type, airline, and take-off and landing times.
- **Fill in past flights:** Settings > Flightradar24 > Fill in looks up flights back to May 2016 that are missing the aircraft, registration or airline. Flights from April 2024 are looked up a few days at a time; older ones come from Flightradar24's position archive, one lookup per flight, so they use more credits and take longer. You can stop at any time, and you see what was found before anything is saved. Only empty fields are filled.

Add the key in Settings > Flightradar24. It stays on the phone and isn't included in backups. Lookups use credits from your Flightradar24 plan.

## Other airlines' rosters

This version reads the formats it knows. To add a new one, send the roster to Claude so the format can be built in.
