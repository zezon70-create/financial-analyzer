CHANGELOG - Financial Analyzer (improved)
Date: 2025-10-07 06:35 UTC

- Fixed: Missing asset references in several HTML files (comparisons, settings, report).
- Fixed: i18n path in js/fa_enhancements.js to correctly load lang/*.json files.
- Improved UX: Replaced JS alert() with showToast(...) to use consistent toast notifications.
- Added: TEST_REPORT.md and CHANGELOG.md (this file).
- Note: No code-heavy refactor performed yet; focused on polish and critical bugfixes.

Planned next steps (not applied yet, available on request):
- Implement Web Workers for heavy computation; refactor large JS modules.
- Add integration endpoints and authentication for saved projects.
- Create CI/CD pipeline with automated tests and build steps.


## Global Edition Final - 2025-10-07
- Added advanced ratios and summary generator.
- Improved CSV/XLSX parsing and header mapping.
- Enhanced PDF export to include summary.
- Added test placeholders for Cypress/Jest.
