let financialData = [];

document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    if(dataForm){
        dataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addEntry();
        });
    }

    const clearBtn = document.getElementById('clearData');
    if(clearBtn){
        clearBtn.addEventListener('click', () => {
            financialData = [];
            alert('All data cleared!');
        });
    }

    const fileUpload = document.getElementById('fileUpload');
    if(fileUpload){
        fileUpload.addEventListener('change', handleFileUpload);
    }
});

function addEntry(){
    const account = document.getElementById('account').value;
    const debit = parseFloat(document.getElementById('debit').value);
    const credit = parseFloat(document.getElementById('credit').value);

    financialData.push({account, debit, credit});
    alert('Entry added!');
    document.getElementById('dataForm').reset();
}

function handleFileUpload(e){
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(event){
        const text = event.target.result;
        parseCSV(text);
    };
    reader.readAsText(file);
}

function parseCSV(text){
    const lines = text.split('\n');
    lines.forEach(line => {
        const [account, debit, credit] = line.split(',');
        if(account && debit && credit){
            financialData.push({account, debit: parseFloat(debit), credit: parseFloat(credit)});
        }
    });
    alert('File data added!');
}
