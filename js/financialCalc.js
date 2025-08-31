function calculateTotals(){
    let totalDebit = data.reduce((sum,d)=>sum+d.debit,0);
    let totalCredit = data.reduce((sum,d)=>sum+d.credit,0);
    return {totalDebit, totalCredit};
}

// حساب مؤشرات الربحية والسيولة والديون
function calculateRatios(){
    let totals = calculateTotals();
    let liquidity = totals.totalDebit / totals.totalCredit;
    let profitability = totals.totalCredit / totals.totalDebit;
    let leverage = totals.totalDebit / (totals.totalDebit + totals.totalCredit);
    return {liquidity, profitability, leverage};
}

// EVA - قيمة اقتصادية مضافة
function calculateEVA(){
    let NOPAT = data.reduce((sum,d)=>sum + (d.debit-d.credit),0);
    let capital = 1000000; // مثال
    let WACC = 0.08;
    return NOPAT - (capital * WACC);
}

// حساب التنبؤ المالي البسيط
function forecastRevenue(growthRate){
    let totals = calculateTotals();
    return totals.totalDebit * (1 + growthRate/100);
}

// حساب المخاطرة (كمثال Std Dev)
function calculateRisk(values){
    let mean = values.reduce((a,b)=>a+b,0)/values.length;
    let variance = values.reduce((a,b)=>a+Math.pow(b-mean,2),0)/values.length;
    return Math.sqrt(variance);
}
