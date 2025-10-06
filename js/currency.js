const currencySelect = document.getElementById('currency-select');
let currentCurrency = 'USD';

currencySelect.addEventListener('change', (e) => {
  currentCurrency = e.target.value;
  updateCurrencyDisplay();
});

function updateCurrencyDisplay(){
  document.querySelectorAll('.currency').forEach(el => {
    el.textContent = currentCurrency;
  });
}
