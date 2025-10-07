[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
# Financial Analyzer Premium

Landing Page  + Dashboard + Data Input + Reports + Compare + Multi-language + Charts + Excel/PDF Export.



Moataz Ahmed Madkour



## Automated Enhancements (applied)
The repository has received an enhancement pass to move towards production-readiness. Changes include:

- Added `js/worker_parser.js` — Web Worker for parsing large CSV inputs to avoid UI blocking.
- `js/fa_csv_import.js` now uses the worker for large files (fallback remains for small files).
- Added `sw.js` (Service Worker) and `manifest.json` to enable basic PWA caching/offline behavior.
- Improved PDF export flow to temporarily inject header for better printed reports.
- Added session save/load helpers in `js/input.js` (save to `localStorage`).
- Added GitHub Actions workflow `.github/workflows/ci.yml` for basic CI scaffolding.

### How to test locally
1. Extract and serve the folder (use a static server like `npx http-server` or GitHub Pages).
2. Open `tests/unit-tests.html` and run unit tests.
3. Open `upload.html`, try importing CSV/XLSX files. For large CSVs (>20KB) the parser uses a Web Worker.
4. Use "Save Session" and "Load Session" buttons in the input page (if present) to persist data locally.
5. Test PWA by loading the site and checking Application > Service Workers in DevTools.




## Production-Ready Enhancements Applied
- UI: Tailwind CDN included for rapid styling; ARIA roles added for accessibility.
- Parsing: Web Worker for large CSV parsing.
- PWA: Service Worker and manifest added for offline caching.
- Session: Save/Load session to localStorage.
- Export: Improved PDF header handling; Chart export helper added.
- Samples: sample trial balance files added under `/samples` for quick testing.

## Quickstart (recommended)
1. Serve the folder with a static server (e.g. `npx http-server .` from project root).
2. Open `index.html` in your browser.
3. Try `samples/sample_trial_balance_ar.csv` via Upload page.

## Next steps to reach absolute production readiness
- Replace Tailwind CDN with a build pipeline (PostCSS) and purge unused CSS.
- Implement automated E2E tests (Cypress) and unit tests (Jest).
- Add hosted CI/CD and release pipeline to publish to GitHub Pages automatically.


## Release Checklist — Global Edition (do before publishing)

1. Run local sanity checks:
   - `npm ci` then `npm start` (or `npx http-server . -p 8080`) and open `http://localhost:8080/ultimate/index.html`
   - Open `ultimate/tests.html` to run quick parsing/ratios smoke tests.
   - Try sample files in `/ultimate` and `/samples` (CSV & XLSX).

2. Run tests & lint:
   - `npm test`
   - `npm run cypress:run` (requires Cypress; CI runs headless)

3. Build & Optimize:
   - Consider adding a build step with Vite to minify and bundle CSS/JS.
   - Replace Tailwind CDN with a built CSS (purge unused classes).

4. Security & Accessibility:
   - Review CSP meta tag and adjust if you host on a custom domain.
   - Run Lighthouse and address accessibility/performance issues.

5. Publish to GitHub Pages:
   - Push to `main` branch. The provided GitHub Actions workflow will run tests and then publish the `ultimate` folder to Pages.

## How to publish (quick)
- Ensure the repo has branch `main` and push your files.
- Enable Pages to serve from `gh-pages` created by the action, or configure Pages to serve from `docs/` and adjust workflow accordingly.
- If you want automatic deploy keys, add DEPLOY_KEY secret or rely on GITHUB_TOKEN as configured in the workflow.
- After the first successful workflow run, your demo will be available at `https://<your-username>.github.io/<repo-name>/ultimate/`

