# VialTrack

Offline-capable installable web app (PWA) for vial calculations, inventory, history, weight tracking,
protocol planning and a local status board. Personal records stay on the device unless the user
exports a backup. Vercel project name: `vial`.

## Working with the owner

- The owner is not a developer. Explain changes in plain language before and after making them.
- Work on a branch named `claude/<topic>` and open a pull request. Never push to `main` and never
  merge; the owner reviews and approves every PR.
- Privacy is a product promise: never add network calls that send records, doses or notes off the
  device. `usage.js` stores only screen names and timings, locally.

## Layout

No build step and no package.json: plain `index.html`, `navigation.js`/`.css`, `usage.js`, `sw.js`
(service worker), `manifest.json`, icons. `version.json` holds the app version (currently 14.5.0).

## Making a release

- Bump `version.json` when user-facing behavior changes, and bump `CACHE_NAME` in `sw.js`
  (e.g. `vialtrack-v14-5-0`) to match, so installed copies offer the update.
- `README.md` describes changes up to 14.3; keep it current. `README.txt` and `Start Local App.bat`
  are older Windows helpers.
- There are no automated tests or CI. Check changes by opening `index.html` through a local web
  server in a browser, in light and dark mode.

## How changes go live

Git auto-deploy is off (`vercel.json`), so merging does not deploy; a deploy is started deliberately.
Don't deploy to production without the owner's OK. See `docs/development-cost-controls.md`.
