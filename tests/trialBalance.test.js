// tests/trialBalance.test.js
// يفترض وجود دالة computeStatements في js/financeEngine.js
const { computeStatements } = require('../js/financeEngine');

test('trial balance balances debits and credits', () => {
  const trial = [
    { account: 'Cash', debit: 1500, credit: 0 },
    { account: 'Inventory', debit: 500, credit: 0 },
    { account: 'Sales', debit: 0, credit: 2000 },
  ];
  const { totalDebits, totalCredits } = computeStatements(trial);
  expect(totalDebits).toBe(totalCredits);
});
