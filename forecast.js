window.onload = function() {
  const data = JSON.parse(localStorage.getItem("trialBalance")) || [];
  let revenue = 0;
  data.forEach(row => {
    if (row.account.toLowerCase().includes("revenue")) revenue += row.credit;
  });
  let forecast = [];
  for (let i = 1; i <= 5; i++) {
    forecast.push({ year: 2025 + i, revenue: (revenue * (1 + 0.05 * i)).toFixed(2) });
  }
  let html = "<h2>Forecast (5 years)</h2>";
  forecast.forEach(f => {
    html += `<p>${f.year}: ${f.revenue}</p>`;
  });
  document.getElementById("forecastResults").innerHTML = html;
};
