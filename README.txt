VialTrack PWA v9

NEW IN v9
- Calculator mobile layout rebuilt to remove the old oversized/zoomed syringe behavior
- Full-width responsive syringe visualization, no transform scaling hack
- New Weight tab
- Recent / Week / Month / Year weight views
- Large current-weight card
- Interactive local trend charts without external libraries
- Weight trend comparisons
- Weight history with add, edit, and delete
- Historical weight data from the supplied screenshots is preloaded on first run
- Latest weight appears on the Home dashboard
- Weight history is included in VialTrack backup/export
- Visual system redesigned toward a restrained dark health-app look:
  charcoal cards, near-black background, white selected pills, green/teal trend accent

PRELOADED WEIGHT HISTORY
Jun 10 through Aug 23, 2026, including the supplied 331.2 lb Aug 23 entry.

PRESERVED
- Stock inventory
- Active vials
- Reconstitution calculator and history
- Day / Week / All peptide tracker
- Offline PWA operation


V10
- App icon replaced with the new VialTrack feature icon
- 192px and 512px PWA icons regenerated from the new design
- Brand chip now uses the new icon
- Bottom navigation now includes compact glyph icons
- Small UI polish so the icon language matches the in-app visual style more closely


V11
- Replaced temporary navigation glyphs with custom outline SVG icons
- Added matching icons to Home quick actions
- Unified icon stroke style and teal active state
- Simplified mobile header into a compact native-app brand bar
- Fixed view switching so each tab starts at a predictable scroll position
- Removed smooth-scroll chaining that could make scrolling feel jumpy
- Added correct scroll padding for the fixed bottom navigation
- Added safe-area spacing for Android/iPhone installed-app mode
- Prevented the bottom navigation from covering the final rows/cards


V12 UPDATE SYSTEM
- App version: 12.0.0
- Checks GitHub Pages for a newer service worker whenever VialTrack opens
- Also checks when returning to the app after it has been in the background
- Re-checks hourly while left open
- Shows an in-app "Update available" prompt
- "Later" keeps the current version running
- "Update VialTrack" activates the waiting version and reloads automatically
- Update prompt works while online; the current app continues working normally offline
- New service workers wait for user approval instead of silently taking over

IMPORTANT
V11 and earlier do not contain this updater logic. After V12 is published and installed once,
future versions (V13+) can use this in-app update prompt.
