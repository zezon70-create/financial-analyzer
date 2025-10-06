let scenarioCtx = document.getElementById('scenarioChart');
if(scenarioCtx){
    new Chart(scenarioCtx,{
        type:'line',
        data:{
            labels:['Base','Optimistic','Pessimistic'],
            datasets:[{label:'الأرباح المتوقعة', data:[120000,150000,90000], borderColor:'#ff4500'}]
        },
        options:{responsive:true}
    });
}
