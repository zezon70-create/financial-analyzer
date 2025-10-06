
(function(global){
  function parseTrialBalance(entries){ return { parsed: { balance_sheet: {}, income_statement: {}, totals: {} }, ratios: {} }; }
  global.FAParser = { parseTrialBalance: parseTrialBalance };
})(window);
