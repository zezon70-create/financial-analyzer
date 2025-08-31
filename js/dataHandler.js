let data = [];

document.getElementById('dataForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    let account = document.getElementById('accountName').value;
    let debit = parseFloat(document.getElementById('debit').value);
    let credit = parseFloat(document.getElementById('credit').value);
    data.push({account, debit, credit});
    renderTable();
});

document.getElementById('clearData')?.addEventListener('click', function(){
    data = [];
    renderTable();
});

function renderTable(){
    let tableDiv = document.getElementById('dataTable');
    if(!tableDiv) return;
    let html = "<table><tr><th>الحساب</th><th>مدين</th><th>دائن</th></tr>";
    data.forEach(d => {
        html += `<tr><td>${d.account}</td><td>${d.debit}</td><td>${d.credit}</td></tr>`;
    });
    html += "</table>";
    tableDiv.innerHTML = html;
}
