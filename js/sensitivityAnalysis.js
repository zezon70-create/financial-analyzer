let sensitivityCtx = document.getElementById('sensitivityChart');
if(sensitivityCtx){
    new Chart(sensitivityCtx,{
        type:'bar',
        data:{
            labels:['+10% مبيعات','-10% مبيعات','+10% تكاليف','-10% تكاليف'],
            datasets:[{label:'تأثير على الأرباح', data:[130000,110000,95000,125000], backgroundColor:'#1e90ff'}]
        },
        options:{responsive:true}
    });
}
