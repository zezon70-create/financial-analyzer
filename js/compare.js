let compareCtx = document.getElementById('compareChart');
if(compareCtx){
    new Chart(compareCtx,{
        type:'line',
        data:{
            labels:['2022','2023','2024'],
            datasets:[
                {label:'الأرباح', data:[100000,120000,150000], borderColor:'#1e90ff'},
                {label:'النفقات', data:[80000,90000,100000], borderColor:'#ff4500'}
            ]
        },
        options:{responsive:true}
    });
}
