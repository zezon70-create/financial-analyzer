// Financial Analysis Functions
function calculateTotals(accounts){
    let totalDebit=0, totalCredit=0;
    accounts.forEach(a=>{
        totalDebit += parseFloat(a.debit);
        totalCredit += parseFloat(a.credit);
    });
    return {totalDebit,totalCredit};
}

function generateFinancialStatements(accounts){
    let statements = {incomeStatement:{}, balanceSheet:{}};

    statements.incomeStatement.revenue = accounts.filter(a=>a.account.toLowerCase().includes('revenue'))
        .reduce((sum,a)=>sum+parseFloat(a.credit),0);
    statements.incomeStatement.expenses = accounts.filter(a=>a.account.toLowerCase().includes('expense'))
        .reduce((sum,a)=>sum+parseFloat(a.debit),0);
    statements.incomeStatement.netProfit = statements.incomeStatement.revenue - statements.incomeStatement.expenses;

    statements.balanceSheet.assets = accounts.filter(a=>a.account.toLowerCase().includes('asset'))
        .reduce((sum,a)=>sum+parseFloat(a.debit),0);
    statements.balanceSheet.liabilities = accounts.filter(a=>a.account.toLowerCase().includes('liability'))
        .reduce((sum,a)=>sum+parseFloat(a.credit),0);
    statements.balanceSheet.equity = statements.balanceSheet.assets - statements.balanceSheet.liabilities;

    return statements;
}

// DuPont Analysis
function duPontAnalysis(netProfit,revenue,assets,equity){
    const profitMargin = netProfit/revenue;
    const assetTurnover = revenue/assets;
    const equityMultiplier = assets/equity;
    return {profitMargin, assetTurnover, equityMultiplier, ROE: profitMargin*assetTurnover*equityMultiplier};
}

// Break-even
function breakEvenAnalysis(fixedCosts, pricePerUnit, variableCostPerUnit){
    return fixedCosts/(pricePerUnit-variableCostPerUnit);
}

// Forecast
function forecastRevenue(currentRevenue,growthRate){
    return currentRevenue*(1+growthRate/100);
}

// Budget Estimate
function estimateBudget(accounts,growthRate){
    return accounts.map(a=>{
        return {account:a.account,debit:parseFloat(a.debit)*(1+growthRate/100),credit:parseFloat(a.credit)*(1+growthRate/100)};
    });
}

// Ratios
function liquidityRatios(accounts){ /* Advanced */ }
function profitabilityRatios(accounts){ /* Advanced */ }
function efficiencyRatios(accounts){ /* Advanced */ }
function debtRatios(accounts){ /* Advanced */ }
