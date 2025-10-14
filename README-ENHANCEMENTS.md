Enhancements added:
- Unified header with logo, currency selector, language selector, dark mode toggle, export PDF button.
- Watermark on pages and print (logo).
- i18n files added: i18n/en.json, i18n/ar.json.
- Enhancements CSS: css/fa_enhancements.css
- Enhancements JS: js/fa_enhancements.js
- Unit test page: tests/unit-tests.html

Notes:
- Embedding images into XLSX from client-side JS may require server-side or specialized libraries. The project includes SheetJS CDN to help export tabular data; embedding images in Excel may still need additional work.
- PDF export uses html2pdf via CDN.

How to run:
- serve the folder via a local static server (python -m http.server) and open index.html

Additional enhancements: client-side Excel export with embedded logo using ExcelJS; validation bound to input page; improved unit tests.


Final Enhancements applied:
- Export Excel button added to header; auto-detects report table and exports with embedded logo via ExcelJS.
- CSV import UI added to input page to quickly load trial balance CSV files.
- Simple forecasting utilities added (linear regression forecast, MAPE, RMSE) for quick testing and baseline forecasts.
- Unit tests expanded to test forecasting, CSV import, ExcelJS availability, and logo fetch.
- Validation hooked to input page to block processing of unbalanced trial balances.

Next recommended steps (if you want more):
- Replace linear-regression forecast with ARIMA/Prophet (requires server-side or WASM libs).
- Add CI and automated unit tests in GitHub Actions.
- Polish UI/UX, better table editing (inline editors), and accessibility improvements.
