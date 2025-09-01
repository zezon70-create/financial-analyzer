// قراءة ملفات Excel وCSV
const fileInput = document.getElementById('fileInput');
fileInput?.addEventListener('change', handleFile);

function handleFile(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type:'array'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, {defval:0});
        console.log(json);
        alert("تم تحميل البيانات بنجاح!");
    }
    reader.readAsArrayBuffer(file);
}
