# VialTrack navigation study and v14.4.0

The main site establishes a compact header, text-first destinations, generous menu rows, quiet surfaces and restrained Paper One accents. VialTrack now uses those conventions with lavender as its product accent. Its calculation and record controllers are retained.

| Task / screen | Placement | Reason |
| --- | --- | --- |
| Home | Primary row and menu | Today, quick log and active-vial summaries |
| Track | Primary row and menu | Frequent logs and user-created protocols |
| Inventory | Vials primary destination and Vials submenu | Stock and active vials belong together |
| Reconstitute | Vials context row and submenu; Home quick action | Calculation feeds a saved setup or vial |
| Reconstitution history | Vials context row and submenu | Saved setups belong with their source workflow |
| Weight | Primary row and menu | Independent recurring task |
| Status board | Tools submenu and Home Board shortcut | A display-oriented summary, not another main destination |
| Intranasal calculator | Tools submenu | A distinct calculation workflow |
| Settings | Primary row and menu | Appearance, backup and device information |
| Export / import | Settings, Data & Backup | Restore is now keyboard-accessible through a real button |
| Erase | Settings, Data & Backup | Existing two confirmations remain in place |
| Support | Settings, About | Disabled with accurate availability text while payments are unavailable |
| Company | Menu footer | Clear exit to DesignWelldone without implying a shared Vial account |

## Redundancy decisions

Remove the icon-heavy bottom bar and move frequent destinations to a text strip below the wordmark. Keep stock/add-active actions in Inventory, while moving the repeated Reconstitute and History toolbar actions into one Vials context row. The main menu holds the complete hierarchy; task shortcuts on Home remain useful entry points. Tools has its own menu group and is no longer repeated in Settings. Calculator help appears with calculators.

## Interaction and style

The navigation uses a native modal dialog with focus containment and restoration, a separate submenu Back button and Close button, Escape behavior, retained root scroll and full-screen phone presentation. Existing app view history and header Back/swipe handling remain. Primary and Vials context selections expose aria-current. Small screens scroll the text strip instead of shrinking touch targets. Theme buttons have a four-pixel inset and consistent inner radii. Destructive actions remain visibly distinct from the lavender accent.

Records stay in the existing browser-local stores. No accounts, database migrations, medical calculations or payment services are added. The service-worker cache is bumped to v14.4.0; new navigation resources are precached. Existing installations keep their update prompt and never activate an update automatically.

## Validation

JavaScript syntax and offline asset/version checks pass. Browser checks cover 320px, 390px and desktop layouts, light/dark appearance, nested menu, separate Back/Close, Vials context selection and the unchanged default calculation result. Existing math and record functions are compared with the base revision. Only navigation/theme behavior and release metadata change.
