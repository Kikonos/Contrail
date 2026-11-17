# Contrail

Your crew logbook: a 3D globe or flat map of your flights, logbook, statistics, roster import and Apple Calendar export.

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

Add the key in Settings > Flight data. It stays on the phone and isn't included in backups. Lookups use credits from your Flightradar24 plan.

## AeroDataBox

A second source for Fill in, through RapidAPI. Its free Basic plan reaches back a year and allows about 200 flight lookups a month. Fill in tries Flightradar24 first, as far back as that plan allows, then AeroDataBox for the rest. When the monthly allowance runs out, run Fill in again the next month and it carries on. Add the RapidAPI key in Settings > Flight data.

## Crew tools

- **Trip brief:** Brief on the globe card, or Trip brief in a flight's details. Report time, duty, rest, time difference, layover, weather at the destination with icons (Open-Meteo), sunrise and sunset, and the local currency with a rough exchange rate.
- **Inbound aircraft:** with an AeroDataBox key, Contrail finds the aircraft for your next flight and the flight bringing it in, from 12 hours before departure, with live landing times and the airline's estimate for your departure. While the inbound aircraft flies, Flightradar24 follows it about once a minute.
- **Aircraft on the globe:** planes are drawn as top-down silhouettes of their type (32 types, A320 to A380), white with an outline in the flight's colour; an unknown type gets a generic plane. While a flight is in the air, its route's thin logbook line is hidden and comes back once it has landed.
- **Next flight period:** shows only the flight in the air now, or else the next one, of the categories switched on.
- **Live flight path:** the solid line behind your aircraft follows the path it actually flies (Flightradar24's track, fetched once per flight, then each live report), not the shortest route, so detours around closed airspace show as flown. The dashed line is the rest of the way.
- **Passenger and deadhead flights:** the next-flight card shows the terminal, check-in desk, gate, a typical boarding time and the flight's status (boarding, gate closed, cancelled). In the air it shows the arrival terminal, gate and baggage belt. The brief has all of it in an At the airport box.
- **Duty and rest:** Stats shows rolling block and duty hours against the limits in Settings, the peak your roster reaches, and your rest before the next report. Flight details show each duty and the rest before it.
- **Aircraft:** every registration you've flown, how often and when. With an AeroDataBox key, its age and details.
- **Milestones and year in review:** milestones as you reach them, and a summary of each year or of all time. Share it as a full-screen picture (1080 × 1920, the size of an iPhone screen and Instagram stories) on the globe or a flat map, with a preview first, or replay it on the globe.
- **Globe or flat map:** the button above the zoom buttons switches the Globe tab between the 3D globe and a flat map. The choice is remembered.
- **Share:** sends your flight with a live tracking link.
- **Add, edit and delete flights:** the + on the Logbook (or Add > Find a flight, or Add a flight on this day in the month view) looks a flight up by number and date: AeroDataBox for the schedule, days ahead included, and Flightradar24 for flights that have flown. Pick the leg, choose operating, deadhead or personal, and add it. Personal flights get the same next-flight card, live position and inbound aircraft as operating ones. In a flight's details, Edit changes the flight number, airports, times, report time and aircraft, and Delete removes any flight.
- **adsbdb (free, no key):** fills in the aircraft type on flights that have a registration but no type (up to 40 aircraft a day), shows a photo of the aircraft in flight details, on the aircraft page and for the inbound aircraft, and when a flight can't be found by schedule, offers the route it usually flies so only the times are left to add.
- **Add duties to any day:** tap a day without a duty and choose Add a duty. Every duty type is listed, the ones you use most first, with a search bar (code or name, e.g. SBY or standby). A code Contrail doesn't know can be added as a new type. Tap a duty to change it or remove it, including ones imported from rosters.
- **Logbook month view:** a roster-style calendar. Trips show as one band across their days, with the destination under each flight, a flight that lands the next day shown on both days (where it takes off, then where it lands, with take-off and landing icons in the style of airport departure and arrival signs), days off, standby, sick and leave as icons, and the month's block hours, sectors, layovers and days off on top. Tap a day for report time, flights in local time and layovers. Tap the month name to jump to any month and year, swipe or use the arrows to move a month, and switch to List for search and filters.
- **Backup reminder:** a gentle prompt when your last backup is more than two weeks old and the logbook has changed since.

## Other airlines' rosters

This version reads the formats it knows. To add a new one, send the roster to Claude so the format can be built in.
