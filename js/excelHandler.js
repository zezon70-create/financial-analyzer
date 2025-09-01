document.getElementById("fileInput")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const data = evt.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    
    if (jsonData.length > 0) {
      const row = jsonData[0];
      document.getElementById("revenue").value = row.Revenue || 0;
      document.getElementById("expenses").value = row.Expenses || 0;
      document.getElementById("assets").value = row.Assets || 0;
      document.getElementById("liabilities").value = row.Liabilities || 0;
    }
  };
  reader.readAsBinaryString(file);
});
