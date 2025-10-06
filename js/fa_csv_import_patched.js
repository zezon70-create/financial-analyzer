
(function(global){
  function handleFileInput(file, cb){ const reader = new FileReader(); reader.onload = function(e){ const text = e.target.result; const rows = text.split(/\r?\n/).slice(1).map(l=>{ const cols = l.split(','); return { account: cols[0], debit: cols[1], credit: cols[2] }; }); cb(null, rows); }; reader.onerror=function(e){ cb(e); }; reader.readAsText(file); }
  global.FACSV = { handleFileInput };
})(window);
