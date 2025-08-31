let forecastCtx = document.getElementById('forecastChart');
if(forecastCtx){
    new Chart(forecastCtx,{
        type:'line',
        data:{
            labels:['يناير','فبراير','مارس','أبريل','مايو'],
            datasets:[{label:'التنبؤ المالي', data:[10000,12000,15000,14000,16000], borderColor:'#32cd32'}]
        },
        options:{responsive:true}
    });
}
