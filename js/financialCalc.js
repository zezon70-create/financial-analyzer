function calculateTotals(){
    let totalDebit = data.reduce((sum,d)=>sum+d.debit,0);
    let totalCredit = data.reduce((sum,d)=>sum+d.credit,0);
    return {totalDebit, totalCredit};
}
