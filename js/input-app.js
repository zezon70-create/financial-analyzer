window.pageTranslations={ar:{pageTitle:"إدخال ميزان المراجعة — المحلل المالي",pageHeader:"إدخال بيانات ميزان المراجعة",pageSubheader:"هذه الصفحة مخصصة للمحاسبين لإدخال البيانات الدقيقة وتصنيفها طبقًا للمعايير الدولية.",actionsTitle:"أدوات التحكم",add:"إضافة صف",save:"تأكيد الحفظ",clear:"مسح الكل",saveForComparison:"حفظ نسخة للمقارنات",saveAsPlaceholder:"مثال: بيانات 2024",saveAs:"حفظ باسم",currencyTitle:"إعدادات العملة",currencyLabel:"العملة الأساسية",fxRateLabel:"سعر الصرف",tableTitle:"جدول البيانات",thAccount:"الحساب",thMainType:"التصنيف الرئيسي",thSubType:"التصنيف الفرعي",thDebit:"مدين",thCredit:"دائن",thAction:"إجراء",balanced:"متوازن",unbalanced:"غير متوازن",total:"الإجمالي",debit:"المدين",credit:"الدائن",confirmClear:"هل أنت متأكد من أنك تريد مسح جميع البيانات في الجدول؟",savedSuccess:"تم تأكيد الحفظ! (ملاحظة: يتم حفظ بياناتك تلقائياً عند كل تغيير)",saveAsSuccess:"تم حفظ البيانات بنجاح باسم",saveAsError:"الرجاء إدخال اسم لحفظ مجموعة البيانات.",savePrevious:"حفظ كفترة سابقة",savedPreviousSuccess:"تم حفظ بيانات الفترة السابقة بنجاح!",manualEntryTab:"إدخال يدوي",uploadFileTab:"رفع ملف",uploadFileTitle:"رفع ملف ميزان المراجعة (Excel أو CSV)",uploadDragDrop:"اسحب وأفلت ملفك هنا، أو اضغط للاختيار",uploadSupportedFiles:"الملفات المدعومة: .xlsx, .xls, .csv",uploadBrowseButton:"تصفح الملفات",uploadFileReady:"الملف جاهز للمعالجة",loadingPreview:"جاري تحميل المعاينة...",dataPreview:"معاينة أول 5 صفوف:",columnMappingTitle:"مطابقة الأعمدة",columnMappingSubtitle:"الرجاء مطابقة الأعمدة من ملفك مع الحقول المطلوبة في النظام.",processFileButton:"معالجة الملف وملء الجدول",confirmClearUpload:"سيقوم هذا بمسح أي بيانات موجودة في الجدول. هل تريد المتابعة؟",fileReadError:"حدث خطأ أثناء قراءة الملف. الرجاء التأكد من أنه ملف Excel أو CSV صالح.",fileProcessingSuccess:"تمت معالجة الملف بنجاح! تم ملء جدول الإدخال اليدوي بالبيانات."},en:{pageTitle:"Trial Balance Input — Financial Analyzer",pageHeader:"Trial Balance Data Entry",pageSubheader:"This page is for accountants to enter precise data classified according to international standards.",actionsTitle:"Controls",add:"Add Row",save:"Confirm Save",clear:"Clear All",saveForComparison:"Save a copy for comparisons",saveAsPlaceholder:"e.g., Data 2024",saveAs:"Save As",currencyTitle:"Currency Settings",currencyLabel:"Base Currency",fxRateLabel:"Exchange Rate",tableTitle:"Data Table",thAccount:"Account",thMainType:"Main Classification",thSubType:"Sub Classification",thDebit:"Debit",thCredit:"Credit",thAction:"Action",balanced:"Balanced",unbalanced:"Unbalanced",total:"Total",debit:"Debit",credit:"Credit",confirmClear:"Are you sure you want to clear all data in the table?",savedSuccess:"Save Confirmed! (Note: Your data auto-saves on every change)",saveAsSuccess:"Data saved successfully as",saveAsError:"Please enter a name to save the dataset.",savePrevious:"Save as Previous Period",savedPreviousSuccess:"Previous period data saved successfully!",manualEntryTab:"Manual Entry",uploadFileTab:"Upload File",uploadFileTitle:"Upload Trial Balance (Excel or CSV)",uploadDragDrop:"Drag & drop your file here, or click to browse",uploadSupportedFiles:"Supported files: .xlsx, .xls, .csv",uploadBrowseButton:"Browse Files",uploadFileReady:"File is ready to be processed",loadingPreview:"Loading preview...",dataPreview:"Preview of first 5 rows:",columnMappingTitle:"Column Mapping",columnMappingSubtitle:"Please match the columns from your file to the required fields in the system.",processFileButton:"Process File and Populate Table",confirmClearUpload:"This will clear any existing data in the table. Do you want to continue?",fileReadError:"An error occurred reading the file. Please ensure it's a valid Excel or CSV file.",fileProcessingSuccess:"File processed successfully! The manual entry table has been populated."}},
document.addEventListener("DOMContentLoaded",(()=>{
    const e={
        currencies:{EGP:{name:"Egyptian Pound",rate:1},USD:{name:"US Dollar",rate:48.5},EUR:{name:"Euro",rate:52},SAR:{name:"Saudi Riyal",rate:12.9},AED:{name:"UAE Dirham",rate:13.2}},
        accountTypes:{
            ar:{"الأصول":{"أصل متداول":["النقد وما في حكمه","العملاء والمدينون","المخزون"],"أصل غير متداول":["أصول ثابتة (صافي)","استثمارات طويلة الأجل"]},"الخصوم":{"خصم متداول":["الموردون والدائنون","قروض قصيرة الأجل"],"خصم غير متداول":["قروض طويلة الأجل"]},"حقوق الملكية":{"رأس المال":["رأس المال المدفوع"],"الأرباح المحتجزة والاحتياطيات":["الأرباح المحتجزة"]},"قائمة الدخل":{"الإيرادات":["إيرادات النشاط الرئيسي"],"تكلفة المبيعات":["تكلفة البضاعة المباعة"],"المصروفات":["مصروفات تشغيلية","مصروفات فائدة","مصروفات ضريبية"]}},
            en:{Assets:{"Current Asset":["Cash and Equivalents","Accounts Receivable","Inventory"],"Non-current Asset":["Property, Plant, and Equipment (Net)","Long-term Investments"]},Liabilities:{"Current Liability":["Accounts Payable","Short-term Loans"],"Non-current Liability":["Long-term Loans"]},Equity:{Capital:["Paid-in Capital"],"Retained Earnings & Reserves":["Retained Earnings"]},"Income Statement":{Revenue:["Main Revenue"],"Cost of Goods Sold (COGS)":["Cost of Goods Sold"],Expenses:["Operating Expenses","Interest Expense","Tax Expense"]}}
        },
        requiredFields:["Account","MainType","SubType","Debit","Credit"]
    };
    
    // --- (جديد) قاموس الكلمات المفتاحية للتصنيف التلقائي ---
    const classificationKeywordMap = {
        // MainType: الأصول, SubType: أصل متداول
        assets_current: ['نقد', 'cash', 'bank', 'بنك', 'صندوق', 'عملاء', 'receivable', 'مدينون', 'ذمم مدينة', 'مخزون', 'inventory', 'بضاعة', 'استثمارات قصيرة', 'short term investment'],
        // MainType: الأصول, SubType: أصل غير متداول
        assets_noncurrent: ['أصول ثابتة', 'fixed assets', 'property', 'plant', 'equipment', 'آلات', 'معدات', 'سيارات', 'عقارات', 'أراضي', 'استثمارات طويلة', 'long term investment', 'شهرة', 'goodwill', 'مشروعات تحت التنفيذ'],
        // MainType: الخصوم, SubType: خصم متداول
        liabilities_current: ['موردون', 'payable', 'دائنون', 'ذمم دائنة', 'قرض قصير', 'short term loan', 'بنك سحب', 'overdraft', 'مخصص', 'provision', 'م. مستحق', 'accrued expense', 'تأمينات', 'ضرائب مستحقة'],
        // MainType: الخصوم, SubType: خصم غير متداول
        liabilities_noncurrent: ['قرض طويل', 'long term loan', 'التزامات طويلة'],
        // MainType: حقوق الملكية, SubType: رأس المال
        equity_capital: ['رأس المال', 'capital', 'جاري المالك', 'owner equity', 'احتياطي قانوني', 'legal reserve'],
        // MainType: حقوق الملكية, SubType: الأرباح المحتجزة
        equity_re: ['أرباح محتجزة', 'retained earnings', 'أرباح مرحلة', 'أرباح العام'],
        // MainType: قائمة الدخل, SubType: الإيرادات
        is_revenue: ['إيراد', 'revenue', 'مبيعات', 'sales'],
        // MainType: قائمة الدخل, SubType: تكلفة المبيعات
        is_cogs: ['تكلفة المبيعات', 'تكلفة البضاعة', 'cost of goods', 'cogs', 'cost of sales'],
        // MainType: قائمة الدخل, SubType: المصروفات
        is_expense: ['مصروف', 'expense', 'راتب', 'salary', 'أجور', 'wage', 'إيجار', 'rent', 'كهرباء', 'electricity', 'تسويق', 'marketing', 'إهلاك', 'depreciation', 'فائدة', 'interest', 'ضريب', 'tax', 'عمومية وإدارية', 'g&a']
    };

    // --- (جديد) دالة مساعدة للحصول على أسماء التصنيفات باللغة الحالية ---
    const getTypeKeys = (lang) => {
        const types = e.accountTypes[lang];
        const assetsKey = Object.keys(types)[0]; // الأصول
        const liabKey = Object.keys(types)[1]; // الخصوم
        const equityKey = Object.keys(types)[2]; // حقوق الملكية
        const isKey = Object.keys(types)[3]; // قائمة الدخل
        
        return {
            assets: assetsKey,
            liabilities: liabKey,
            equity: equityKey,
            is: isKey,
            
            currentAsset: Object.keys(types[assetsKey])[0], // أصل متداول
            nonCurrentAsset: Object.keys(types[assetsKey])[1], // أصل غير متداول
            
            currentLiability: Object.keys(types[liabKey])[0], // خصم متداول
            nonCurrentLiability: Object.keys(types[liabKey])[1], // خصم غير متداول

            capital: Object.keys(types[equityKey])[0], // رأس المال
            re: Object.keys(types[equityKey])[1], // الأرباح المحتجزة
            
            revenue: Object.keys(types[isKey])[0], // الإيرادات
            cogs: Object.keys(types[isKey])[1], // تكلفة المبيعات
            expense: Object.keys(types[isKey])[2] // المصروفات
        };
    };

    // --- (جديد) دالة التصنيف التلقائي ---
    const autoClassify = (accountName) => {
        const name = String(accountName || '').toLowerCase().trim();
        if (!name) return { MainType: "", SubType: "" };
        
        const typeKeys = getTypeKeys(a); // a هي اللغة الحالية
        
        // (ملاحظة: الترتيب مهم، نبدأ بالحالات الخاصة أولاً)
        for (const keyword of classificationKeywordMap.is_cogs) {
            if (name.includes(keyword)) return { MainType: typeKeys.is, SubType: typeKeys.cogs };
        }
        for (const keyword of classificationKeywordMap.is_revenue) {
            if (name.includes(keyword)) return { MainType: typeKeys.is, SubType: typeKeys.revenue };
        }
        for (const keyword of classificationKeywordMap.is_expense) {
            if (name.includes(keyword)) return { MainType: typeKeys.is, SubType: typeKeys.expense };
        }
        for (const keyword of classificationKeywordMap.assets_current) {
            if (name.includes(keyword)) return { MainType: typeKeys.assets, SubType: typeKeys.currentAsset };
        }
        for (const keyword of classificationKeywordMap.assets_noncurrent) {
            if (name.includes(keyword)) return { MainType: typeKeys.assets, SubType: typeKeys.nonCurrentAsset };
        }
        for (const keyword of classificationKeywordMap.liabilities_current) {
            if (name.includes(keyword)) return { MainType: typeKeys.liabilities, SubType: typeKeys.currentLiability };
        }
        for (const keyword of classificationKeywordMap.liabilities_noncurrent) {
            if (name.includes(keyword)) return { MainType: typeKeys.liabilities, SubType: typeKeys.nonCurrentLiability };
        }
        for (const keyword of classificationKeywordMap.equity_capital) {
            if (name.includes(keyword)) return { MainType: typeKeys.equity, SubType: typeKeys.capital };
        }
        for (const keyword of classificationKeywordMap.equity_re) {
            if (name.includes(keyword)) return { MainType: typeKeys.equity, SubType: typeKeys.re };
        }
        
        return { MainType: "", SubType: "" }; // Default if no match
    };
    // --- (نهاية الإضافات الجديدة) ---

    const t={trialData:[],fileData:[],fileHeaders:[]},
    a=localStorage.getItem("lang")||"ar",
    r=e=>window.pageTranslations[a]?.[e]||e,
    n=e=>window.pageTranslations[a]?.[`th${e}`]||e,
    l={currencySelect:document.getElementById("currencySelect"),fxRateInput:document.getElementById("fxRateInput"),tbBody:document.getElementById("tbBody"),validationResult:document.getElementById("validationResult"),addRowBtn:document.getElementById("addRowBtn"),saveBtn:document.getElementById("saveBtn"),clearBtn:document.getElementById("clearBtn"),saveAsNameInput:document.getElementById("saveAsName"),saveAsBtn:document.getElementById("saveAsBtn"),savePreviousBtn:document.getElementById("savePreviousBtn"),fileDropArea:document.getElementById("fileDropArea"),fileUploader:document.getElementById("fileUploader"),browseButton:document.getElementById("browseButton"),fileNameDisplay:document.getElementById("fileNameDisplay"),filePreviewArea:document.getElementById("filePreviewArea"),previewSpinner:document.getElementById("previewSpinner"),filePreviewTable:document.getElementById("filePreviewTable"),columnMapper:document.getElementById("columnMapper"),processFileBtn:document.getElementById("processFileBtn"),manualTab:document.getElementById("manual-tab")},
    i=e=>parseFloat(String(e||"").replace(/,/g,""))||0,
    o=()=>{localStorage.setItem("trialData",JSON.stringify(t.trialData));const a=l.currencySelect.value;e.currencies[a].rate=i(l.fxRateInput.value)||1,localStorage.setItem("fxRates",JSON.stringify(e.currencies)),console.log("Auto-save successful!")},
    s=()=>{t.trialData=JSON.parse(localStorage.getItem("trialData")||"[]"),0===t.trialData.length&&t.trialData.push({Account:"",MainType:"",SubType:"",Debit:0,Credit:0});const a=JSON.parse(localStorage.getItem("fxRates")||"{}");for(const t in a)e.currencies[t]&&(e.currencies[t].rate=a[t].rate)},
    c=()=>{const e=l.saveAsNameInput.value.trim();if(e)try{localStorage.setItem(`FA_DATASET_${e}`,JSON.stringify(t.trialData)),alert(`${r("saveAsSuccess")} "${e}"!`),l.saveAsNameInput.value=""}catch(e){alert("Error saving data.")}else alert(r("saveAsError"))},
    d=()=>{if(0!==t.trialData.length&&(1!==t.trialData.length||t.trialData[0].Account||i(t.trialData[0].Debit)||i(t.trialData[0].Credit)))try{localStorage.setItem("trialDataPrevious",JSON.stringify(t.trialData)),alert(r("savedPreviousSuccess"))}catch(e){alert("Error saving previous period data.")}else alert("ar"===a?"لا توجد بيانات لحفظها.":"No data to save.")},
    u=()=>{const t=l.currencySelect.value,a=e.currencies[t];l.fxRateInput.value=a.rate,l.fxRateInput.disabled="EGP"===t},
    p=()=>{const e=t.trialData.reduce(((e,t)=>(e.debit+=i(t.Debit),e.credit+=i(t.Credit),e)),{debit:0,credit:0});Math.abs(e.debit-e.credit)<.01?(l.validationResult.textContent=`${r("balanced")} ✅ | ${r("total")}: ${e.debit.toLocaleString()}`,l.validationResult.className="text-success fw-bold"):(l.validationResult.textContent=`${r("unbalanced")} ❌ | ${r("debit")}: ${e.debit.toLocaleString()} | ${r("credit")}: ${e.credit.toLocaleString()}`,l.validationResult.className="text-danger fw-bold"),o()},
    m=()=>{l.tbBody.innerHTML="";const r=e.accountTypes[a];t.trialData.forEach(((e,a)=>{const n=document.createElement("tr"),o=Object.keys(r).map((t=>`<option value="${t}" ${e.MainType===t?"selected":""}>${t}</option>`)).join("");let s="";e.MainType&&r[e.MainType]&&(s=Object.keys(r[e.MainType]).map((t=>`<option value="${t}" ${e.SubType===t?"selected":""}>${t}</option>`)).join("")),n.innerHTML=`\n                <td><input class="form-control form-control-sm" data-field="Account" value="${e.Account||""}"></td>\n                <td><select class="form-select form-select-sm" data-field="MainType"><option value="">--</option>${o}</select></td>\n                <td><select class="form-select form-select-sm" data-field="SubType"><option value="">--</option>${s}</select></td>\n                <td><input type="number" step="any" class="form-control form-control-sm text-end" data-field="Debit" value="${e.Debit||0}"></td>\n                <td><input type="number" step="any" class="form-control form-control-sm text-end" data-field="Credit" value="${e.Credit||0}"></td>\n                <td><button class="btn btn-sm btn-outline-danger btn-delete"><i class="bi bi-trash"></i></button></td>`,n.querySelectorAll("input, select").forEach((e=>{const r="SELECT"===e.tagName||"number"===e.type?"change":"input";e.addEventListener(r,(e=>{t.trialData[a][e.target.dataset.field]="number"===e.target.type?i(e.target.value):e.target.value,"MainType"===e.target.dataset.field?(t.trialData[a].SubType="",m()):p()}))})),n.querySelector(".btn-delete").addEventListener("click",(()=>{t.trialData.splice(a,1),m()})),l.tbBody.appendChild(n)})),p()},
    f=()=>{t.fileHeaders.map((e=>`<option value="${e}">${e}</option>`)).join("");l.columnMapper.innerHTML=e.requiredFields.map((e=>{const r=((e,t)=>{const a=e.toLowerCase(),r=(n(e)||"").toLowerCase();for(const e of t){const t=String(e||"").toLowerCase().trim();if(t===a||t===r)return e}return"debit"===a&&t.find((e=>"مدين"===String(e).toLowerCase().trim()))?t.find((e=>"مدين"===String(e).toLowerCase().trim())):"credit"===a&&t.find((e=>"دائن"===String(e).toLowerCase().trim()))?t.find((e=>"دائن"===String(e).toLowerCase().trim())):"account"===a&&t.find((e=>"الحساب"===String(e).toLowerCase().trim()))?t.find((e=>"الحساب"===String(e).toLowerCase().trim())):""})(e,t.fileHeaders);return`\n            <div class="col-md-4 col-sm-6">\n                <label for="map-${e}" class="form-label fw-bold">${n(e)}</label>\n                <select id="map-${e}" class="form-select form-select-sm" data-field-key="${e}">\n                    <option value="">-- ${"ar"===a?"تجاهل":"Ignore"} --</option>\n                    ${t.fileHeaders.map((e=>`<option value="${e}" ${e===r?"selected":""}>${e}</option>`)).join("")}\n                </select>\n            </div>`})).join("")},
    v=e=>{if(!e)return;l.fileNameDisplay.textContent=`File: ${e.name} | Size: ${(e.size/1024).toFixed(2)} KB`,l.filePreviewArea.classList.remove("d-none"),l.fileDropArea.classList.add("d-none"),l.previewSpinner.classList.remove("d-none"),l.filePreviewTable.innerHTML="",l.columnMapper.innerHTML="";const n=new FileReader;n.onload=e=>{try{const r=e.target.result,n=XLSX.read(r,{type:"array"}),i=n.SheetNames[0],o=n.Sheets[i],s=XLSX.utils.sheet_to_json(o,{header:0});if(0===s.length)throw new Error("No data found in file.");t.fileData=s,t.fileHeaders=Object.keys(s[0]),(()=>{if(0===t.fileData.length)return void(l.filePreviewTable.innerHTML=`<p class="text-danger">${"ar"===a?"الملف فارغ أو لا يمكن قراءته.":"File is empty or unreadable."}</p>`);const e=t.fileHeaders,r=t.fileData.slice(0,5);let n='<table class="table table-sm table-bordered table-striped small">';n+='<thead class="table-light">',n+=`<tr>${e.map((e=>`<th>${e}</th>`)).join("")}</tr>`,n+="</thead>",n+="<tbody>",r.forEach((t=>{n+=`<tr>${e.map((e=>`<td>${t[e]||""}</td>`)).join("")}</tr>`})),n+="</tbody>",n+="</table>",l.filePreviewTable.innerHTML=n})(),f(),l.previewSpinner.classList.add("d-none")}catch(e){console.error(e),alert(r("fileReadError")),b()}},n.onerror=()=>{alert(r("fileReadError")),b()},n.readAsArrayBuffer(e)},
    b=()=>{l.filePreviewArea.classList.add("d-none"),l.fileDropArea.classList.remove("d-none"),l.fileUploader.value="",t.fileData=[],t.fileHeaders=[]},
    
    // --- (تطوير) دالة معالجة الملف (y) ---
    y=()=>{
        if(!confirm(r("confirmClearUpload")))return;
        const e={};
        l.columnMapper.querySelectorAll("select").forEach((t=>{e[t.dataset.fieldKey]=t.value}));
        
        t.trialData=[];
        t.fileData.forEach((a=>{
            
            const accountName = a[e.Account] || "";
            let mainType = a[e.MainType] || "";
            let subType = a[e.SubType] || "";

            // (جديد) استدعاء دالة التصنيف التلقائي إذا كانت الحقول فارغة
            if (accountName && (!mainType || !subType)) {
                const classification = autoClassify(accountName);
                if (!mainType) mainType = classification.MainType;
                if (!subType) subType = classification.SubType;
            }

            const rowData = {
                Account: accountName,
                MainType: mainType,
                SubType: subType,
                Debit: i(a[e.Debit]),
                Credit: i(a[e.Credit])
            };
            t.trialData.push(rowData);
        }));
        // (نهاية التطوير)

        0===t.trialData.length&&t.trialData.push({Account:"",MainType:"",SubType:"",Debit:0,Credit:0}),
        m(); // عرض البيانات المحدثة في الجدول
        new bootstrap.Tab(l.manualTab).show(), // العودة لتاب الإدخال اليدوي
        b(), // إخفاء منطقة الرفع
        alert(r("fileProcessingSuccess"))
    };
    // --- (نهاية دالة معالجة الملف) ---
    
    (()=>{for(const t in e.currencies)l.currencySelect.add(new Option(`${e.currencies[t].name} (${t})`,t));s(),l.currencySelect.value=localStorage.getItem("currency")||"EGP",u(),m(),l.addRowBtn.addEventListener("click",(()=>{t.trialData.push({Account:"",MainType:"",SubType:"",Debit:0,Credit:0}),m()})),l.saveBtn.addEventListener("click",(()=>{o(),alert(r("savedSuccess"))})),l.clearBtn.addEventListener("click",(()=>{confirm(r("confirmClear"))&&(t.trialData=[],localStorage.removeItem("trialData"),s(),m())})),l.saveAsBtn.addEventListener("click",c),l.savePreviousBtn.addEventListener("click",d),l.currencySelect.addEventListener("change",u),l.fxRateInput.addEventListener("change",(t=>{e.currencies[l.currencySelect.value].rate=i(t.target.value),o()})),l.browseButton.addEventListener("click",(()=>l.fileUploader.click())),l.fileDropArea.addEventListener("click",(()=>l.fileUploader.click())),l.processFileBtn.addEventListener("click",y),l.fileUploader.addEventListener("change",(e=>{e.target.files.length>0&&v(e.target.files[0])})),["dragenter","dragover","dragleave","drop"].forEach((e=>{l.fileDropArea.addEventListener(e,(e=>{e.preventDefault(),e.stopPropagation()}),!1)})),["dragenter","dragover"].forEach((e=>{l.fileDropArea.addEventListener(e,(()=>{l.fileDropArea.classList.add("border-success"),l.fileDropArea.classList.remove("border-primary-subtle")}),!1)})),["dragleave","drop"].forEach((e=>{l.fileDropArea.addEventListener(e,(()=>{l.fileDropArea.classList.remove("border-success"),l.fileDropArea.classList.add("border-primary-subtle")}),!1)})),l.fileDropArea.addEventListener("drop",(e=>{const t=e.dataTransfer.files;t.length>0&&(l.fileUploader.files=t,v(t[0]))}),!1)})()
}));