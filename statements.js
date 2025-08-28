window.onload = function() {
  const data = JSON.parse(localStorage.getItem("trialBalance")) || [];
  let html = "<h2>Income Statement</h2>";
  let revenue = 0, expenses = 0;
  data.forEach(row => {
    if (row.account.toLowerCase().includes("revenue")) revenue += row.credit;
    if (row.account.toLowerCase().includes("expense")) expenses += row.debit;
  });
  html += `<p>Revenue: ${revenue}</p>`;
  html += `<p>Expenses: ${expenses}</p>`;
  html += `<p>Net Income: ${revenue - expenses}</p>`;
  document.getElementById("statementsOutput").innerHTML = html;
};
