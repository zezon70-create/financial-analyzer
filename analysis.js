window.onload = function() {
  const data = JSON.parse(localStorage.getItem("trialBalance")) || [];
  let totalAssets = 0, totalLiabilities = 0, equity = 0;
  let revenue = 0, expenses = 0;
  data.forEach(row => {
    if (row.account.toLowerCase().includes("asset")) totalAssets += row.debit - row.credit;
    if (row.account.toLowerCase().includes("liability")) totalLiabilities += row.credit - row.debit;
    if (row.account.toLowerCase().includes("equity")) equity += row.credit - row.debit;
    if (row.account.toLowerCase().includes("revenue")) revenue += row.credit;
    if (row.account.toLowerCase().includes("expense")) expenses += row.debit;
  });

  const netIncome = revenue - expenses;
  const ratios = {
    currentRatio: (totalAssets / (totalLiabilities || 1)).toFixed(2),
    debtToEquity: (totalLiabilities / (equity || 1)).toFixed(2),
    netProfitMargin: ((netIncome / (revenue || 1)) * 100).toFixed(2) + "%"
  };

  const EVA = netIncome - (equity * 0.1); // تكلفة رأس المال 10% كمثال
  const risk = (Math.random() * 0.2).toFixed(2); // تبسيط: مخاطرة عشوائية
  const returnRate = ((netIncome / (equity || 1)) * 100).toFixed(2);

  let html = "<h2>Analysis Results</h2>";
  html += `<p>Current Ratio: ${ratios.currentRatio}</p>`;
  html += `<p>Debt to Equity: ${ratios.debtToEquity}</p>`;
  html += `<p>Net Profit Margin: ${ratios.netProfitMargin}</p>`;
  html += `<p>Economic Value Added (EVA): ${EVA}</p>`;
  html += `<p>Expected Return: ${returnRate}%</p>`;
  html += `<p>Risk Estimate: ${risk}</p>`;

  document.getElementById("analysisResults").innerHTML = html;
};
