// main.js — وظائف مشتركة للمشروع (Dark Mode, Session, utilities)
(function(){
  // theme
  const themeKey = 'fa_theme_v1';
  function applyTheme(t) {
    if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    // change moon/sun icons across toggles
    document.querySelectorAll('#darkToggle, #darkToggleHeader, #darkToggleDash').forEach(b => {
      if (!b) return;
      b.innerHTML = t === 'dark' ? '<i class="fa fa-sun"></i>' : '<i class="fa fa-moon"></i>';
    });
  }
  function loadTheme() {
    const t = localStorage.getItem(themeKey) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(t);
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem(themeKey, next);
    applyTheme(next);
  }
  document.addEventListener('DOMContentLoaded', () => {
    // attach toggles
    ['darkToggle','darkToggleHeader','darkToggleDash'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', toggleTheme);
    });
    loadTheme();
  });

  // SESSION storage helpers
  window.saveSessionToLocal = function(sessionName = 'fa_session_v1') {
    try {
      const trial = window.__trialData || [];
      const session = { trial, savedAt: new Date().toISOString() };
      localStorage.setItem(sessionName, JSON.stringify(session));
      return true;
    } catch (e) { console.error(e); return false; }
  };

  window.loadSession = function(sessionName = 'fa_session_v1') {
    try {
      const raw = localStorage.getItem(sessionName);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      window.__trialData = obj.trial || [];
      return obj;
    } catch (e) { console.error(e); return null; }
  };

  window.clearSession = function(sessionName = 'fa_session_v1') {
    localStorage.removeItem(sessionName);
    window.__trialData = [];
  };

  // CSV template download
  window.downloadCSVTemplate = function() {
    const headers = ['account,code,debit,credit'];
    const example = [
      'صندوق,1001,10000,0',
      'مبيعات,4001,0,15000',
      'مصاريف إيجار,5001,2000,0'
    ];
    const rows = headers.concat(example).join('\n');
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trial-balance-template.csv';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  // parseCsvToTrial
  window.parseCsvToTrial = function(csvRows) {
    const res = [];
    for (const r of csvRows) {
      if (typeof r === 'object' && !Array.isArray(r)) {
        const account = r['account'] || r['الحساب'] || r['Account'] || r['حساب'] || r['name'] || r['اسم'] || '';
        const code = r['code'] || r['رقم الحساب'] || r['Code'] || '';
        const debit = parseFloat((r['debit'] || r['مدين'] || r['Debit'] || 0) || 0) || 0;
        const credit = parseFloat((r['credit'] || r['دائن'] || r['Credit'] || 0) || 0) || 0;
        if (account) res.push({ account: account.toString(), code: code.toString(), debit, credit });
      } else if (Array.isArray(r)) {
        const account = r[0] || '';
        const code = r[1] || '';
        const debit = parseFloat(r[2] || 0) || 0;
        const credit = parseFloat(r[3] || 0) || 0;
        if (account) res.push({ account: account.toString(), code: code.toString(), debit, credit });
      }
    }
    return res;
  };

  // format
  window.fmt = function(n) {
    if (n === null || n === undefined) return '-';
    return new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 2 }).format(n);
  };

  // accounting helpers
  window.netFromTrial = function(trial) {
    let totalDebit = 0, totalCredit = 0;
    for (const r of trial) {
      totalDebit += Number(r.debit || 0);
      totalCredit += Number(r.credit || 0);
    }
    return totalCredit - totalDebit;
  };

  window.generateIncomeStatement = function(trial) {
    let revenue = 0, expenses = 0;
    for (const r of trial) {
      const name = r.account.toString().toLowerCase();
      if (/(مبيعات|إيراد|revenue|sales)/i.test(name)) revenue += Number(r.credit || 0) - Number(r.debit || 0);
      else if (/(مصاريف|مكافآت|أجور|مصروف|expense|expenses|rent)/i.test(name)) expenses += Number(r.debit || 0) - Number(r.credit || 0);
      else {
        if ((Number(r.credit || 0)) > (Number(r.debit || 0))) revenue += Number(r.credit || 0) - Number(r.debit || 0);
        else expenses += Number(r.debit || 0) - Number(r.credit || 0);
      }
    }
    const net = revenue - expenses;
    return [
      { بند: 'إجمالي الإيرادات', قيمة: revenue },
      { بند: 'إجمالي المصروفات', قيمة: expenses },
      { بند: 'صافي الربح', قيمة: net }
    ];
  };

  window.generateBalanceSheet = function(trial) {
    let assets = 0, liabilitiesEquity = 0;
    for (const r of trial) {
      const d = Number(r.debit || 0), c = Number(r.credit || 0);
      if (d > c) assets += (d - c);
      else liabilitiesEquity += (c - d);
    }
    return [
      { بند: 'إجمالي الأصول', قيمة: assets },
      { بند: 'إجمالي المطلوبات وحقوق الملكية', قيمة: liabilitiesEquity }
    ];
  };

  window.computeRatios = function(trial) {
    const net = netFromTrial(trial);
    const bs = generateBalanceSheet(trial);
    const assets = (bs[0] && bs[0].قيمة) || 0;
    const equity = Math.max(0, (bs[1] && bs[1].قيمة) || 0);
    const roe = equity ? (net / equity) * 100 : null;
    const roa = assets ? (net / assets) * 100 : null;
    const capital = equity;
    const wacc = 0.10;
    const nopat = net;
    const eva = nopat - (wacc * capital);
    return { net, assets, equity, roe, roa, eva };
  };

  // NPV / IRR (simple)
  window.npv = function(rate, cashflows) {
    let sum = 0;
    for (let t = 0; t < cashflows.length; t++) sum += cashflows[t] / Math.pow(1 + rate, t);
    return sum;
  };
  window.irr = function(cashflows, guess = 0.1) {
    let x0 = guess, x1 = guess;
    for (let i = 0; i < 100; i++) {
      const f = npv(x0, cashflows);
      let df = 0;
      for (let t = 1; t < cashflows.length; t++) df += -t * cashflows[t] / Math.pow(1 + x0, t + 1);
      if (Math.abs(df) < 1e-8) break;
      x1 = x0 - f / df;
      if (Math.abs(x1 - x0) < 1e-7) return x1;
      x0 = x1;
    }
    return null;
  };

  window.renderPrintableReport = function(session) {
    const inc = generateIncomeStatement(session.trial);
    const bs = generateBalanceSheet(session.trial);
    return `
      <div style="direction:rtl;font-family:Arial;color:${getComputedStyle(document.body).color}">
        <h2>تقرير مالي مبسط</h2>
        <p>تاريخ التصدير: ${new Date().toLocaleString('ar-EG')}</p>
        <h3>قائمة الدخل</h3>
        <table border="1" cellpadding="6" cellspacing="0">
          ${inc.map(r => `<tr><td>${r.بند}</td><td>${fmt(r.قيمة)}</td></tr>`).join('')}
        </table>
        <h3 style="margin-top:18px">الميزانية</h3>
        <table border="1" cellpadding="6" cellspacing="0">
          ${bs.map(r => `<tr><td>${r.بند}</td><td>${fmt(r.قيمة)}</td></tr>`).join('')}
        </table>
      </div>
    `;
  };

  // expose some helpers to global
  window.downloadCSVTemplate = window.downloadCSVTemplate;
})();
