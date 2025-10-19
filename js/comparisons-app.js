// js/comparisons-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "مقارنة الفترات — المحلل المالي",
        pageHeader: "مقارنة الأداء المالي",
        pageSubheader: "قارن بين مجموعات البيانات المحفوظة لديك لاكتشاف الاتجاهات والتغيرات في الأداء المالي.",
        manageTitle: "إدارة البيانات المحفوظة",
        noDatasets: "لم يتم العثور على بيانات محفوظة. اذهب إلى صفحة 'إدخال البيانات' أو 'رفع القوائم' لحفظ بعض البيانات أولاً.",
        confirmDelete: "هل أنت متأكد من حذف مجموعة البيانات",
        setupTitle: "إعداد المقارنة",
        setupDesc: "اختر مجموعتي البيانات التي تريد مقارنتها من القوائم أدناه.",
        labelDataset1: "الفترة الأساسية",
        labelDataset2: "فترة المقارنة",
        compareBtn: "قارن",
        summaryTitle: "ملخص المقارنة",
        chartTitle: "مقارنة مرئية",
        tableHdrAccount: "الحساب",
        tableHdrChange: "التغير",
        tableHdrChangePercent: "التغير (%)",
        selectPlaceholder: "اختر مجموعة بيانات..."
    },
    en: {
        pageTitle: "Period Comparisons — Financial Analyzer",
        pageHeader: "Financial Performance Comparison",
        pageSubheader: "Compare your saved datasets to discover trends and changes in financial performance.",
        manageTitle: "Manage Saved Datasets",
        noDatasets: "No saved datasets found. Go to the 'Data Entry' or 'Upload Statements' page to save some data first.",
        confirmDelete: "Are you sure you want to delete the dataset",
        setupTitle: "Comparison Setup",
        setupDesc: "Choose the two datasets you want to compare from the dropdowns below.",
        labelDataset1: "Base Period",
        labelDataset2: "Comparison Period",
        compareBtn: "Compare",
        summaryTitle: "Comparison Summary",
        chartTitle: "Visual Comparison",
        tableHdrAccount: "Account",
        tableHdrChange: "Change",
        tableHdrChangePercent: "Change (%)",
        selectPlaceholder: "Select a dataset..."
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = {
        datasets: [],
        comparisonChart: null
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;

    const UI = {
        noDatasetsMessage: document.getElementById('noDatasetsMessage'),
        savedDatasetsContainer: document.getElementById('savedDatasetsContainer'),
        comparisonSetup: document.getElementById('comparisonSetup'),
        dataset1Select: document.getElementById('dataset1'),
        dataset2Select: document.getElementById('dataset2'),
        compareBtn: document.getElementById('compareBtn'),
        comparisonResults: document.getElementById('comparisonResults'),
        comparisonSummaryTable: document.getElementById('comparisonSummaryTable'),
        comparisonChartCanvas: document.getElementById('comparisonChart'),
        closeResultsBtn: document.getElementById('closeResultsBtn')
    };

    const loadDatasets = () => {
        state.datasets = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('FA_DATASET_')) {
                try {
                    const name = key.replace('FA_DATASET_', '');
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && Array.isArray(data)) {
                        state.datasets.push({ name, data });
                    }
                } catch (e) {
                    console.error(`Could not parse dataset ${key}:`, e);
                }
            }
        }
        state.datasets.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    };

    const handleDelete = (datasetName) => {
        if (confirm(`${t_page('confirmDelete')} "${datasetName}"?`)) {
            localStorage.removeItem(`FA_DATASET_${datasetName}`);
            // Re-initialize the page
            init();
        }
    };

    const renderDatasetManager = () => {
        if (state.datasets.length === 0) {
            UI.noDatasetsMessage.textContent = t_page('noDatasets');
            UI.noDatasetsMessage.style.display = 'block';
            UI.savedDatasetsContainer.innerHTML = '';
            UI.comparisonSetup.style.display = 'none'; // Hide setup if no data
        } else {
            UI.noDatasetsMessage.style.display = 'none';
            UI.comparisonSetup.style.display = 'block';
            UI.savedDatasetsContainer.innerHTML = state.datasets.map(ds => `
                <div class="col-md-4">
                    <div class="card card-body d-flex flex-row justify-content-between align-items-center">
                        <span class="fw-bold text-primary"><i class="bi bi-archive-fill me-2"></i>${ds.name}</span>
                        <button class="btn btn-sm btn-outline-danger btn-delete" data-name="${ds.name}" aria-label="Delete ${ds.name}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');

            // Add event listeners to delete buttons
            UI.savedDatasetsContainer.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', () => handleDelete(btn.dataset.name));
            });
        }
    };

    const populateSelectors = () => {
        const placeholder = `<option value="">${t_page('selectPlaceholder')}</option>`;
        const options = state.datasets.map(ds => `<option value="${ds.name}">${ds.name}</option>`).join('');
        
        UI.dataset1Select.innerHTML = placeholder + options;
        UI.dataset2Select.innerHTML = placeholder + options;
    };

    const performComparison = () => {
        const name1 = UI.dataset1Select.value;
        const name2 = UI.dataset2Select.value;

        if (!name1 || !name2) {
            UI.comparisonResults.style.display = 'none';
            return;
        }

        const ds1 = state.datasets.find(ds => ds.name === name1);
        const ds2 = state.datasets.find(ds => ds.name === name2);

        // Create a map for quick lookups
        const data1Map = new Map(ds1.data.map(item => [item.Account, { debit: item.Debit, credit: item.Credit }]));
        const data2Map = new Map(ds2.data.map(item => [item.Account, { debit: item.Debit, credit: item.Credit }]));
        
        // Get all unique account names
        const allAccounts = [...new Set([...data1Map.keys(), ...data2Map.keys()])].sort();

        const comparisonData = allAccounts.map(account => {
            const item1 = data1Map.get(account) || { debit: 0, credit: 0 };
            const item2 = data2Map.get(account) || { debit: 0, credit: 0 };

            const val1 = item1.debit - item1.credit;
            const val2 = item2.debit - item2.credit;
            const change = val2 - val1;
            const changePercent = val1 !== 0 ? (change / Math.abs(val1)) * 100 : (val2 !== 0 ? 100 : 0);

            return { account, val1, val2, change, changePercent };
        });

        renderComparisonTable(comparisonData, name1, name2);
        renderComparisonChart(comparisonData, name1, name2);

        UI.comparisonResults.style.display = 'block';
    };

    const renderComparisonTable = (data, name1, name2) => {
        let tableHTML = `
            <table class="table table-sm table-bordered table-striped align-middle">
                <thead class="table-light">
                    <tr>
                        <th>${t_page('tableHdrAccount')}</th>
                        <th class="text-end">${name1}</th>
                        <th class="text-end">${name2}</th>
                        <th class="text-end">${t_page('tableHdrChange')}</th>
                        <th class="text-end">${t_page('tableHdrChangePercent')}</th>
                    </tr>
                </thead>
                <tbody>
        `;
        data.forEach(item => {
            const changeClass = item.change > 0 ? 'text-success' : (item.change < 0 ? 'text-danger' : '');
            tableHTML += `
                <tr>
                    <td>${item.account}</td>
                    <td class="text-end">${item.val1.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td class="text-end">${item.val2.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td class="text-end ${changeClass}">${item.change.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td class="text-end ${changeClass}">
                        ${item.change > 0 ? '▲' : (item.change < 0 ? '▼' : '')} 
                        ${Math.abs(item.changePercent).toFixed(2)}%
                    </td>
                </tr>
            `;
        });
        tableHTML += `</tbody></table>`;
        UI.comparisonSummaryTable.innerHTML = tableHTML;
    };
    
    const renderComparisonChart = (data, name1, name2) => {
        if (state.comparisonChart) {
            state.comparisonChart.destroy();
        }
        
        // For simplicity, let's chart a few key summary items if they exist
        const chartItems = data.filter(item => 
            ['الأصول', 'الخصوم', 'حقوق الملكية', 'الإيرادات', 'المصروفات'].some(key => item.account.includes(key))
        );
        const labels = chartItems.map(item => item.account);
        const data1 = chartItems.map(item => item.val1);
        const data2 = chartItems.map(item => item.val2);

        const ctx = UI.comparisonChartCanvas.getContext('2d');
        state.comparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: name1,
                    data: data1,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: name2,
                    data: data2,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    };


    const init = () => {
        loadDatasets();
        renderDatasetManager();
        populateSelectors();

        UI.compareBtn.addEventListener('click', performComparison);
        UI.closeResultsBtn.addEventListener('click', () => {
            UI.comparisonResults.style.display = 'none';
        });
    };

    init();
});
