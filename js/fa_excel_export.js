
// Export table data to Excel with embedded logo using ExcelJS (browser) and FileSaver
async function exportTableToExcelWithLogo(tableSelector, filename='report.xlsx'){
  try{
    // ensure ExcelJS exists
    if(typeof ExcelJS === 'undefined'){ showToast('ExcelJS not loaded.','error'); return; }
    // get table rows
    const table = document.querySelector(tableSelector);
    if(!table){ alert('Table not found: '+tableSelector); return; }
    // extract header and rows
    const rows = [];
    const headers = Array.from(table.querySelectorAll('thead th')).map(th=>th.innerText.trim());
    if(headers.length===0){
      // try first row as headers
      const firstRow = table.querySelector('tr');
      if(firstRow){
        headers.push(...Array.from(firstRow.querySelectorAll('th,td')).map(td=>td.innerText.trim()));
      }
    }
    rows.push(headers);
    table.querySelectorAll('tbody tr').forEach(tr=>{
      const cells = Array.from(tr.querySelectorAll('td')).map(td=>td.innerText.trim());
      if(cells.length) rows.push(cells);
    });

    // fetch logo as base64
    const logoUrl = 'assets/logo.png';
    const resp = await fetch(logoUrl);
    const blob = await resp.blob();
    const reader = new FileReader();
    const base64 = await new Promise((res, rej)=>{
      reader.onload = ()=> res(reader.result.split(',')[1]);
      reader.onerror = rej;
      reader.readAsDataURL(blob);
    });

    // create workbook
    const wb = new ExcelJS.Workbook();
    wb.creator = 'Financial Analyzer';
    const ws = wb.addWorksheet('Report');

    // insert logo image
    const imageId = wb.addImage({
      base64: base64,
      extension: 'png',
    });
    // place image top-right area
    ws.addImage(imageId, {
      tl: { col: headers.length - 2, row: 0 },
      br: { col: headers.length, row: 4 }
    });

    // add rows
    rows.forEach((r, idx)=>{
      ws.addRow(r);
    });

    // auto width
    ws.columns.forEach(col=>{
      let max = 10;
      col.eachCell({ includeEmpty: true }, cell=>{
        const l = cell.value ? cell.value.toString().length : 0;
        if(l>max) max = l;
      });
      col.width = Math.min(Math.max(10, max+2), 60);
    });

    // write buffer and save
    const buf = await wb.xlsx.writeBuffer();
    const blobOut = new Blob([buf], {type: "application/octet-stream"});
    saveAs(blobOut, filename);
  }catch(err){
    console.error(err);
    alert('Export failed: '+err.message);
  }
}
