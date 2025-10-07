// worker_parser.js - Web Worker for parsing CSV text to JSON rows
self.addEventListener('message', function(e){
  const {cmd, payload} = e.data || {};
  if(cmd === 'parseCSV'){
    const text = payload || '';
    try{
      const rows = text.split(/\r?\n/).map(r=>r.trim()).filter(r=>r.length>0);
      const parsed = rows.map(r=>{
        // handle quoted commas naive
        const cols = r.match(/(?:\"([^\"]*)\")|([^,]+)/g) || [];
        const clean = cols.map(c=> (c||'').replace(/^"/,'').replace(/"$/,'').trim());
        return clean;
      });
      self.postMessage({status:'ok', rows: parsed, count: parsed.length});
    }catch(err){
      self.postMessage({status:'error', error: err.message || String(err)});
    }
  }
});