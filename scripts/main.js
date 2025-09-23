<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>إدخال البيانات — المحلل المالي</title>
  <link href="https://fonts.googleapis.com/css?family=Cairo:300,400,600&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
  <script src="https://kit.fontawesome.com/a2d9b6f5a8.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
  <style>
    body { font-family: 'Cairo', sans-serif; }
    .card:hover { transform: translateY(-5px); transition: all 0.3s ease; }
    .global-watermark { opacity:0.05; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:200px; }
    #trialTable input { width:100%; }
    .btn { min-width:120px; }
  </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="index.html">
      <img src="assets/img/logo.png" alt="logo" class="site-logo">
      <div class="ms-2">المحلل المالي</div>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="nav" class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">إدخال البيانات</a></li>
        <li class="nav-item"><a class="nav-link" href="dashboard.html">لوحة التحكم</a></li>
      </ul>
    </div>
  </div>
</nav>

<img src="assets/img/logo.png" alt="watermark" class="global-watermark">

<main class="container py-4" style="position:relative; z-index:1;">
  <h2 class="mb-3">إدخال ميزان المراجعة</h2>
  <p>اختر الطريقة: ارفع CSV/XLSX أو أدخل الحسابات يدوياً.</p>

  <div class="row g-3 mb-4">
    <div class="col-md-4">
      <div class="card p-3 shadow-sm border-0">
        <h5>تحميل قالب CSV</h5>
        <p>قالب جاهز لتسهيل إدخال البيانات.</p>
        <button id="downloadTemplate" class="btn btn-outline-primary w-100"><i class="fa fa-file-csv me-2"></i>تحميل القالب</button>
      </div>
    </div>

    <div class="col-md-8">
      <div class="card p-3 shadow-sm border-0">
        <h5>رفع ملف الميزان</h5>
        <input id="fileInput" type="file" accept=".csv, .xlsx, .xls" class="form-control mb-3"/>
        <div class="mb-3 d-flex gap-2 flex-wrap">
          <button id="parseFile" class="btn btn-primary"><i class="fa fa-upload me-1"></i>استيراد الملف</button>
          <button id="clearAll" class="btn btn-danger"><i class="fa fa-trash me-1"></i>مسح كل البيانات</button>
        </div>
        <div id="fileMsg" class="small text-muted"></div>
      </div>
    </div>
  </div>

  <div class="card shadow-sm border-0">
    <div class="card-body">
      <h6>ميزان المراجعة (قابل للتعديل)</h6>
      <div class="table-responsive">
        <table id="trialTable" class="table table-sm table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>الحساب</th>
              <th>رقم الحساب</th>
              <th>مدين</th>
              <th>دائن</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody id="tbBody"></tbody>
        </table>
      </div>

      <div class="d-flex justify-content-between mt-3 flex-wrap gap-2">
        <div>
          <button id="addRow" class="btn btn-outline-secondary"><i class="fa fa-plus me-1"></i>إضافة سطر</button>
          <button id="validate" class="btn btn-outline-success"><i class="fa fa-check me-1"></i>تحقق من الميزان</button>
        </div>
        <div>
          <button id="saveSession" class="btn btn-primary"><i class="fa fa-save me-1"></i>حفظ الجلسة</button>
          <button id="loadSessionBtn" class="btn btn-secondary"><i class="fa fa-folder-open me-1"></i>استرجاع الجلسة</button>
          <a class="btn btn-success" href="dashboard.html"><i class="fa fa-arrow-left me-1"></i>اذهب للوحة التحكم</a>
        </div>
      </div>

      <div id="validationResult" class="mt-3"></div>
    </div>
  </div>
</main>

<footer class="bg-light py-3 text-center small">
  &copy; 2025 المحلل المالي — Moataz Madkour
</footer>

<script>
  // --------------------- main.js + file-handlers.js مدمجين ---------------------

  // تحميل الجلسة من localStorage
  function loadSessionData(){
    try{
      const raw = localStorage.getItem('fa:data:v1');
      if(!raw) return null;
      return JSON.parse(raw);
    } catch(e){ return null; }
  }

  // حفظ الجلسة
  function saveSessionData(){
    const rows = Array.from(document.querySelectorAll('#tbBody tr')).map(tr=>{
      return {
        account: tr.querySelector('.acc').value,
        accountNumber: tr.querySelector('.accNum').value,
        debit: Number(tr.querySelector('.debit').value || 0),
        credit: Number(tr.querySelector('.credit').value || 0)
      };
    });
    localStorage.setItem('fa:data:v1', JSON.stringify({trial:rows}));
    alert('✅ تم حفظ الجلسة');
  }

  // تنسيق الصفوف
  function mapRow(row){
    return {
      account: row.account || row.Account || row['الحساب'] || '',
      accountNumber: row.accountNumber || row['رقم الحساب'] || '',
      debit: Number(row.debit || row.Debit || row['مدين'] || 0),
      credit: Number(row.credit || row.Credit || row['دائن'] || 0)
    };
  }

  // إضافة صف للجدول
  function addRow(data={}){
    const tbody = document.getElementById('tbBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-control acc" value="${data.account||''}"></td>
      <td><input type="text" class="form-control accNum" value="${data.accountNumber||''}"></td>
      <td><input type="number" class="form-control debit" value="${data.debit||0}"></td>
      <td><input type="number" class="form-control credit" value="${data.credit||0}"></td>
      <td><button class="btn btn-sm btn-danger deleteRow"><i class="fa fa-trash"></i></button></td>
    `;
    tbody.appendChild(tr);
    tr.querySelector('.deleteRow').addEventListener('click',()=>tr.remove());
  }

  // مسح كل البيانات
  function clearAll(){ document.getElementById('tbBody').innerHTML=''; }

  // التحقق من الميزان
  function validateTrial(){
    const rows = Array.from(document.querySelectorAll('#tbBody tr'));
    let totalDebit=0, totalCredit=0;
    rows.forEach(tr=>{
      totalDebit += Number(tr.querySelector('.debit').value || 0);
      totalCredit += Number(tr.querySelector('.credit').value || 0);
    });
    const resultDiv = document.getElementById('validationResult');
    if(totalDebit === totalCredit) resultDiv.innerHTML='<div class="alert alert-success">✅ الميزان متوازن</div>';
    else resultDiv.innerHTML=`<div class="alert alert-danger">⚠️ الميزان غير متوازن: المدين=${totalDebit} الدائن=${totalCredit}</div>`;
  }

  // تحميل جلسة محفوظة
  function loadSessionToTable(){
    const data = loadSessionData();
    if(!data || !data.trial || !data.trial.length){ alert('لا توجد جلسة محفوظة'); return; }
    clearAll();
    data.trial.forEach(r=>addRow(mapRow(r)));
  }

  // --------------------- CSV / Excel ---------------------
  function handleFile(file){
    if(!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if(ext==='csv') parseCSV(file);
    else if(['xlsx','xls'].includes(ext)) parseExcel(file);
    else alert('⚠️ صيغة الملف غير مدعومة');
  }

  function parseCSV(file){
    Papa.parse(file,{
      header:true, skipEmptyLines:true,
      complete: function(results){
        const mapped = results.data.map(mapRow);
        populateTable(mapped);
      }
    });
  }

  function parseExcel(file){
    const reader = new FileReader();
    reader.onload = function(e){
      try{
        const wb = XLSX.read(e.target.result,{type:'binary'});
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws,{defval:0});
        const mapped = data.map(mapRow);
        populateTable(mapped);
      } catch(err){ alert('⚠️ خطأ عند قراءة Excel: '+err.message); }
    };
    reader.readAsBinaryString(file);
  }

  function populateTable(rows){
    if(!rows||!rows.length) return;
    clearAll();
    rows.forEach(r=>addRow(r));
    alert('✅ تم استيراد البيانات بنجاح');
  }

  // --------------------- أحداث ---------------------
  document.getElementById('addRow').addEventListener('click',()=>addRow());
  document.getElementById('clearAll').addEventListener('click',clearAll);
  document.getElementById('validate').addEventListener('click',validateTrial);
  document.getElementById('saveSession').addEventListener('click',saveSessionData);
  document.getElementById('loadSessionBtn').addEventListener('click',loadSessionToTable);
  document.getElementById('parseFile').addEventListener('click',()=>handleFile(document.getElementById('fileInput').files[0]));
  document.getElementById('downloadTemplate').addEventListener('click',()=>{
    const csvContent="الحساب,رقم الحساب,مدين,دائن\n";
    const blob = new Blob([csvContent], {type:'text/csv;charset=utf-8;'});
    const link=document.createElement('a');
    link.href=URL.createObjectURL(blob);
    link.download='trial_balance_template.csv';
    link.click();
  });
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
