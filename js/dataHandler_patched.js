
(function(global){ function processUploadedRows(rows){ if(window.FAParser && window.FAParser.parseTrialBalance){ try{ const out = window.FAParser.parseTrialBalance(rows); return { ok:true, out }; }catch(e){ return { ok:false, error: e.message }; } } return { ok:false, error:'Parser not available' }; } global.FADataHandler = { processUploadedRows }; })(window);
