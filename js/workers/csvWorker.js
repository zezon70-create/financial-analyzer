// js/workers/csvWorker.js
self.importScripts('https://cdn.jsdelivr.net/npm/papaparse@5.3.2/papaparse.min.js');

function sanitizeCellSimple(cell) {
  if (cell == null) return '';
  let s = String(cell).replace(/\u0000/g, '');
  s = s.replace(/<[^>]*>/g, '').replace(/javascript:/gi, '').trim();
  return s;
}

self.onmessage = function(e) {
  const { file } = e.data;
  try {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      chunkSize: 1024 * 1024, // 1MB chunks
      chunk: function(results, parser) {
        const safe = results.data.map(row => {
          for (const k in row) {
            row[k] = sanitizeCellSimple(row[k]);
          }
          return row;
        });
        self.postMessage({ type: 'chunk', payload: { rows: safe.length }});
        // هنا يمكنك تجميع chunks أو إرسالها مباشرة
        self.postMessage({ type: 'data', payload: safe });
      },
      complete: function() {
        self.postMessage({ type: 'done' });
      },
      error: function(err) {
        self.postMessage({ type: 'error', payload: err.message });
      }
    });
  } catch (err) {
    self.postMessage({ type: 'error', payload: err.message });
  }
};
