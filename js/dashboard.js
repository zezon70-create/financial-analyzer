// dashboard.js — يعرض النتائج على لوحة التحكم
document.addEventListener('DOMContentLoaded', () => {
  const noData = document.getElementById('noData');
  const content = document.getElementById('dashboardContent');
  const refreshBtn = document.getElementById('refreshBtn');
  const netProfitEl = document.getElementById('netProfit');
  const roaEl = document.getElementById('roa');
  const roeEl = document.getElementById('roe');
  const evaEl = document.getElementById('eva');
  const revExpCtx = document.getElementById('revExpChart');
  const ratiosCtx = document.getElementById('ratiosChart');
  let revExpChart = null, ratiosChart = null;

  function render() {
    const session = loadSession();
    if (!session || !session.trial || !session.trial.length) {
      noData.style.display = 'block'; content.style.display = 'none'; return;
    }
    noData.style.display = 'none'; content.style.display = 'block';
    const trial = session.trial;

    const inc = generateIncomeStatement(trial);
    const bs = generateBalanceSheet(trial);
    const ratios = computeRatios(trial);

    netProfitEl.innerText = fmt(ratios.net);
    roaEl.innerText = ratios.roa !== null ? fmt(ratios.roa) + ' %' : '-';
    roeEl.innerText = ratios.roe !== null ? fmt(ratios.roe) + ' %' : '-';
    evaEl.innerText = fmt(ratios.eva);

    document.getElementById('incomeStatement').innerHTML =
      `<table class="table table-sm"><tbody>${inc.map(r => `<tr><td>${r.بند}</td><td>${fmt(r.قيمة)}</td></tr>`).join('')}</tbody></table>`;

    document.getElementById('balanceSheet').innerHTML =
      `<table class="table table-sm"><tbody>${bs.map(r => `<tr><td>${r.بند}</td><td>${fmt(r.قيمة)}</td></tr>`).join('')}</tbody></table>`;

    const labels = ['إيرادات', 'مصروفات'];
    const revenue = inc.find(x => x.بند === 'إجمالي الإيرادات')?.قيمة || 0;
    const expenses = inc.find(x => x.بند === 'إجمالي المصروفات')?.قيمة || 0;
    const ratiosData = [
      { label: 'ROA', value: ratios.roa || 0 },
      { label: 'ROE', value: ratios.roe || 0 },
      { label: 'EVA', value: ratios.eva || 0 }
    ];

    if (revExpChart) revExpChart.destroy();
    revExpChart = new Chart(revExpCtx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{ data: [Math.abs(revenue), Math.abs(expenses)] }]
      },
      options: { responsive: true }
    });

    if (ratiosChart) ratiosChart.destroy();
    ratiosChart = new Chart(ratiosCtx, {
      type: 'bar',
      data: {
        labels: ratiosData.map(r => r.label),
        datasets: [{ label: 'النسب', data: ratiosData.map(r => r.value) }]
      },
      options: { responsive: true }
    });
  }

  refreshBtn.addEventListener('click', render);

  document.getElementById('exportExcel').addEventListener('click', () => {
    const session = loadSession();
    if (!session) return alert('لا توجد بيانات للتصدير');
    const wb = XLSX.utils.book_new();
    const tb = session.trial.map(r => ({ حساب: r.account, 'رقم الحساب': r.code || '', مدين: r.debit, دائن: r.credit }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tb), 'ميزان المراجعة');
    const inc = generateIncomeStatement(session.trial);
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(inc), 'قائمة الدخل');
    const bs = generateBalanceSheet(session.trial);
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(bs), 'الميزانية');
    XLSX.writeFile(wb, 'financial-export.xlsx');
  });

  render();
});
