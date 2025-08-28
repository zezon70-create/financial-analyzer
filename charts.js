window.onload = function() {
  const ctx1 = document.getElementById("chart1").getContext("2d");
  const ctx2 = document.getElementById("chart2").getContext("2d");

  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Revenue", "Expenses", "Net Income"],
      datasets: [{
        label: "Financials",
        data: [1000, 600, 400]
      }]
    }
  });

  new Chart(ctx2, {
    type: "pie",
    data: {
      labels: ["Assets", "Liabilities", "Equity"],
      datasets: [{
        label: "Structure",
        data: [5000, 2000, 3000]
      }]
    }
  });
};
