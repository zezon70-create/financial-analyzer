document.getElementById("financeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const revenue = parseFloat(document.getElementById("revenue").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const investments = parseFloat(document.getElementById("investments").value);

  const profit = revenue - expenses;
  const roi = investments > 0 ? ((profit / investments) * 100).toFixed(2) : 0;

  document.getElementById("profit").textContent = `Profit: $${profit}`;
  document.getElementById("roi").textContent = `ROI: ${roi}%`;

  document.getElementById("results").classList.remove("hidden");

  // Chart
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Revenue", "Expenses", "Profit"],
      datasets: [{
        label: "Financial Overview",
        data: [revenue, expenses, profit],
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
});