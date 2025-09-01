let myChart;

function updateDashboard(data) {
  const ctx = document.getElementById('dashboardChart')?.getContext('2d');
  if (!ctx) return;
  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["الإيرادات","المصروفات","الأصول","الخصوم","صافي الربح"],
      datasets: [{
        label: 'القيم',
        data: [data.revenue, data.expenses, data.assets, data.liabilities, data.profit],
        backgroundColor: ['#004080','#0066cc','#00cc66','#cc0000','#ffaa00']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

window.updateDashboard = updateDashboard;
