function calculateTotals(){
    let totalDebit = data.reduce((sum,d)=>sum+d.debit,0);
    let totalCredit = data.reduce((sum,d)=>sum+d.credit,0);
    return {totalDebit, totalCredit};
}

function calculateRatios(){
    let totals = calculateTotals();
    let liquidity = totals.totalDebit / (totals.totalCredit || 1);
    return {liquidity};
}
