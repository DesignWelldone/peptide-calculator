# Paper One product identity review — 2026-10-23

## Decision and review
Use one neutral paper palette and one UI font family across DesignWelldone, VialTrack and Blob: Arial, Helvetica, system-ui, sans-serif. Body text uses regular weight; labels/actions use 600–700; headings use the same family. Keep existing product silhouettes and the company's four-color mark. No external font request is added.

| Product | Default accent | Icon |
|---|---|---|
| Company / Homeboard | Sage #91A18D | Four tiles / house |
| Gym Board | Dust blue #8BA1B4 | Barbell |
| Blob | Clay #B18F81 | Blob silhouette |
| VialTrack | Lavender #A294B1 | Vial |
| Sports | Field gold #B6A06F | Field |
| Studio | Mauve #B6A1B5 | Cube |

The Blob silhouette was green and the VialTrack vial liquid was blue despite their assigned clay/lavender button roles. Corrected these SVG fills while retaining their silhouettes. Sports' field now uses its assigned gold. VialTrack and Blob install/favicons follow their corrected mark as well.

Use a 64px mark on company catalog cards, 72px on product Explore pages, 24px inside product Explore/Open buttons and 24–28px in app headers. Plain category rows stay text-first. Button marks are decorative with visible labels and explicit accessible names. Primary product actions use their accent fill with a derived readable foreground; secondary launch actions use a quiet outline and readable accent text. Search/appearance controls keep their single frame and inset geometry. Three-dot options stay far right.

Blob spaces retain their current assignments: Memories/Live clay, Player/Files/Server/TV/Radio/Books dust blue, Displays sea glass, Cameras olive. Space tiles reuse existing outlined glyphs within the same rounded paper frame. Player controllers, statuses, chart meanings, artwork and memory/world content themes remain separate from this navigation identity pass. No new team preference backend is introduced.

## Validation
- Shared role generator: 2,992 light/dark/default/team-color combinations pass text >=4.5:1 and focus >=3:1 numerical checks. These are token checks, not accessibility certification of every existing screen.
- Company: TypeScript, production build and existing application tests pass; browser inspected actual catalog component fixtures in both themes and the real public owner header at 320px. Protected catalog authorization was not bypassed.
- VialTrack: inline/external JavaScript parses; all 168 existing named functions are unchanged after normalizing the release label. Offline files exist, including both new SVG references. Browser inspected Home/Track and header/options at 320/390px, both color modes. Neutral panels replace historical blue gradients. Existing records/calculations and update prompt remain.
- Blob: existing 119 tests, TypeScript and production build pass. Authenticated media/playback and device acceptance remain a user-device check; no access bypass, service permission, database or controller changes.

Scope is presentation and identity only. Product stages, account/access policies, local records, paid access, navigation destinations and media behavior do not change.

## Surface/button refinement after user review

Jeremy removed the product-mark requirement from buttons. Keep product marks in headings and discovery; action buttons retain visible labels, useful directional/utility glyphs and assigned accent colors. Dark canvas/card/inset: #080808 / #101010 / #171717. Light canvas/card/inset: #FFFFFF / #FCFCFC / #F6F6F6. Text, border and supporting accent roles derive against these backgrounds. This supersedes the button-icon and warm-neutral details above while retaining the product palette, fonts, large discovery marks and right-hand options rule. No auth/data/controller changes.

VialTrack accent refinement: use syringe blue-green #75AEB8, inspired by the existing cyan liquid, in its icon and product-action roles. This supersedes VialTrack lavender only; other lavender products retain their assignments. Calculator/sidebar/result/reference panels use the same neutral surface, with no tinted reference rows; inputs and selected controls remain identifiable. The syringe drawing and arithmetic are unchanged.
