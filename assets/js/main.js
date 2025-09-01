document.addEventListener('DOMContentLoaded',()=>{
    // Dark Mode
    const toggle = document.getElementById('darkModeToggle');
    toggle?.addEventListener('click',()=>{document.body.classList.toggle('dark-mode');});

    // Add/Delete Rows in Input
    const addRowBtn = document.getElementById('addRow');
    const accountRows = document.getElementById('accountRows');
    addRowBtn?.addEventListener('click',()=>{
        const row = document.createElement('tr');
        row.innerHTML=`<td><input type="text" name="account[]" required></td>
        <td><input type="number" name="debit[]" value="0" required></td>
        <td><input type="number" name="credit[]" value="0" required></td>
        <td><button type="button" class="deleteRow">Delete</button></td>`;
        accountRows.appendChild(row);
        row.querySelector('.deleteRow').addEventListener('click',()=>row.remove());
    });

    document.querySelectorAll('.deleteRow').forEach(btn=>btn.addEventListener('click',()=>btn.closest('tr').remove()));

    // Submit Trial Balance
    document.getElementById('trialBalanceForm')?.addEventListener('submit',(e)=>{
        e.preventDefault();
        const rows = Array.from(accountRows.querySelectorAll('tr'));
        const accounts = rows.map(r=>{
            return {
                account: r.querySelector('input[name="account[]"]').value,
                debit: parseFloat(r.querySelector('input[name="debit[]"]').value),
                credit: parseFloat(r.querySelector('input[name="credit[]"]').value)
            };
        });
        localStorage.setItem('accounts',JSON.stringify(accounts));
        alert('Accounts saved successfully!');
    });

    // Language select (simplified)
    const langSelect = document.getElementById('langSelect');
    langSelect?.addEventListener('change',e=>{localStorage.setItem('lang',e.target.value); location.reload();});
});
