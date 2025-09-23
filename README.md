# Financial Analyzer — Full UHD Version

This is a full single-page style project (multi-HTML) that:
- Accepts trial balance (CSV/XLSX) or manual entry
- Saves sessions to localStorage
- Calculates KPIs (Net Profit, ROA, ROE, EVA)
- Shows interactive charts (Chart.js)
- Exports to CSV / XLSX / PDF
- Supports Dark Mode, Arabic/English, Currency selection (EGP, USD, EUR)

**How to use**
1. Add your logo to `assets/logo.png`
2. Open `index.html` in a browser
3. Use `input.html` to upload trial balance or input manually
4. Visit `dashboard.html` to view KPIs and charts
5. Use `reports.html` to export

**Important**
- Test locally before deleting old project files.
- The project stores data in browser `localStorage` under keys `fa:data:v1` and `fa:sessions:v1`.
