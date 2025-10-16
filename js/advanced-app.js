document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIGURATION ---
    const state = {
        rawData: [],
        aggregatedData: {},
        ratios: {},
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            source: 'trialData'
        },
        charts: {}
    };

    // --- 2. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        dataSource: document.getElementById('dataSource'),
        ratiosBody: document.getElementById('ratiosBody'),
        trendChart: document.getElementById('trendChart'),
        smartSummary: document.getElementById('smartSummary'),
        alertsArea: document.getElementById('alertsArea'),
    };

    // --- 3. CORE LOGIC & CALCULATIONS ---

    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    
    const unifyData = (sourceKey) => {
        const rawData = localStorage.getItem(sourceKey) || '[]';
        let parsedData = JSON.parse(rawData);
        if (sourceKey === 'statementData') {
            const { bs = [], is = [] } = parsedData;
            const unified = [];
            bs.forEach(r => unified.push({ Account: r.Account, Type: r.Type, Debit: r.Debit, Credit: r.Credit }));
            is.forEach(r => {
                const type = (r.Type || '').toLowerCase();
                const value = toNum(r.Value);
                if (type.includes('revenue') || type.includes('إيراد')) {
                    unified.push({ Account: r.Account, Type: r.Type, Debit: 0, Credit: value });
                } else {
                    unified.push({ Account: r.Account, Type: r.Type, Debit: value, Credit: 0 });
                }
            });
            return unified;
        }
        return parsedData;
    };

    const aggregateData = () => {
        const agg = { assets: 0, liabilities: 0, equity: 0, revenue: 0, expense: 0, currentAssets: 0, currentLiabilities: 0 };
        state.rawData.forEach(r => {
            const net = toNum(r.Debit) - toNum(r.Credit);
            const type = (r.Type || r.Account || '').toLowerCase();
            
            if (type.includes('asset') || type.includes('أصل')) agg.assets += net;
            else if (type.includes('liab') || type.includes('خصوم')) agg.liabilities -= net;
            else if (type.includes('equity') || type.includes('حقوق')) agg.equity -= net;
            else if (type.includes('revenue') || type.includes('إيراد')) agg.revenue -= net;
            else if (type.includes('expense') || type.includes('مصروف')) agg.expense += net;
            
            // For Current Ratio
            if (type.includes('current asset') || type.includes('أصل متداول')) agg.currentAssets += net;
            if (type.includes('current liab') || type.includes('خصوم متداولة')) agg.currentLiabilities -= net;
        });
        state.aggregatedData = agg;
    };

    const calculateRatios = () => {
        const agg = state.aggregatedData;
        const netProfit = agg.revenue - agg.expense;
        state.ratios = {
            currentRatio: agg.currentLiabilities > 0 ? agg.currentAssets / agg.currentLiabilities : Infinity,
            debtToEquity: agg.equity > 0 ? agg.liabilities / agg.equity : Infinity,
            netProfitMargin: agg.revenue > 0 ? netProfit / agg.revenue : 0,
            roa: agg.assets > 0 ? netProfit / agg.assets : 0, // Return on Assets
            roe: agg.equity > 0 ? netProfit / agg.equity : 0,   // Return on Equity
        };
    };

    // --- 4. RENDERING FUNCTIONS ---
    
    const getRatioComment = (key, value) => {
        if (!isFinite(value)) return "بيانات غير كافية للحساب.";
        switch (key) {
            case 'currentRatio':
                if (value >= 2) return "سيولة ممتازة. قدرة عالية على سداد الالتزامات قصيرة الأجل.";
                if (value >= 1) return "سيولة جيدة. الوضع آمن في المدى القصير.";
                return "مؤشر خطر. قد تواجه الشركة صعوبة في سداد ديونها قصيرة الأجل.";
            case 'debtToEquity':
                if (value < 0.5) return "مستوى دين منخفض. تعتمد الشركة بشكل كبير على التمويل الذاتي.";
                if (value <= 1.5) return "مستوى دين معتدل ومتوازن.";
                return "مستوى دين مرتفع. قد يشير إلى مخاطر مالية عالية.";
            case 'netProfitMargin':
                if (value >= 0.15) return "ربحية ممتازة. كفاءة عالية في تحويل الإيرادات إلى أرباح.";
                if (value > 0) return "الشركة تحقق أرباحًا ولكن يمكن تحسين الهامش.";
                return "الشركة تحقق خسائر. يجب مراجعة هيكل التكاليف والتسعير.";
            default: return "";
        }
    };

    const renderRatiosTable = () => {
        const ratioDefs = [
            { key: 'currentRatio', label: 'نسبة التداول' },
            { key: 'debtToEquity', label: 'نسبة الدين إلى حقوق الملكية' },
            { key: 'netProfitMargin', label: 'هامش صافي الربح' },
            { key: 'roa', label: 'العائد على الأصول (ROA)' },
            { key: 'roe', label: 'العائد على حقوق الملكية (ROE)' },
        ];
        
        UI.ratiosBody.innerHTML = ratioDefs.map(def => {
            const value = state.ratios[def.key];
            const formattedValue = isFinite(value) 
                ? (def.key.includes('Margin') || def.key.includes('roa') || def.key.includes('roe') ? `${(value * 100).toFixed(1)}%` : value.toFixed(2))
                : "N/A";
            const comment = getRatioComment(def.key, value);
            return `<tr>
                <td>${def.label}</td>
                <td><strong>${formattedValue}</strong></td>
                <td class="text-muted small">${comment}</td>
            </tr>`;
        }).join('');
    };

    const renderTrendChart = () => {
        if (state.charts.trend) state.charts.trend.destroy();
        
        const revenue = state.aggregatedData.revenue || 0;
        // Create synthetic historical data for demonstration
        const historicalData = [revenue / 1.2, revenue / 1.1, revenue];
        const labels = ['2023', '2024', '2025'];
        
        // Simple linear forecast
        const forecast = historicalData[2] + (historicalData[2] - historicalData[0]) / 2;
        
        state.charts.trend = new Chart(UI.trendChart, {
            type: 'line',
            data: {
                labels: [...labels, '2026 (توقع)'],
                datasets: [{
                    label: 'الإيرادات',
                    data: [...historicalData, forecast],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    };
    
    const renderSmartSummary = () => {
        const { currentRatio, netProfitMargin, debtToEquity } = state.ratios;
        let summary = `بناءً على البيانات، `;
        summary += `هامش صافي الربح يبلغ ${isFinite(netProfitMargin) ? `${(netProfitMargin * 100).toFixed(1)}%` : 'N/A'}. `;
        summary += `نسبة التداول هي ${isFinite(currentRatio) ? currentRatio.toFixed(2) : 'N/A'}, مما يعطي مؤشرًا عن السيولة قصيرة الأجل. `;
        summary += `أما هيكل رأس المال، فتبلغ نسبة الدين إلى حقوق الملكية ${isFinite(debtToEquity) ? debtToEquity.toFixed(2) : 'N/A'}.`;
        UI.smartSummary.textContent = summary;
    };
    
    const renderAlerts = () => {
        const alerts = [];
        if (state.ratios.currentRatio < 1) alerts.push("🔴 خطر سيولة: نسبة التداول أقل من 1.");
        if (state.ratios.debtToEquity > 2) alerts.push("🟡 تنبيه: نسبة الدين إلى حقوق الملكية مرتفعة.");
        if (state.ratios.netProfitMargin < 0) alerts.push("🔴 خطر ربحية: الشركة تحقق صافي خسارة.");
        
        if (alerts.length > 0) {
            UI.alertsArea.innerHTML = alerts.map(alert => `<div>${alert}</div>`).join('');
        } else {
            UI.alertsArea.innerHTML = '<div>🟢 لا توجد مؤشرات خطر حرجة بناءً على النسب الأساسية.</div>';
        }
    };
    
    // --- 5. MAIN UPDATE FUNCTION ---
    const runAnalysis = () => {
        state.rawData = unifyData(state.preferences.source);
        if (!state.rawData || state.rawData.length === 0) {
            // Handle UI for no data
            return;
        }
        aggregateData();
        calculateRatios();
        renderRatiosTable();
        renderTrendChart();
        renderSmartSummary();
        renderAlerts();
    };

    // --- 6. EVENT LISTENERS & INITIALIZATION ---

    UI.themeToggle.addEventListener('click', () => {
        let newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        UI.themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        if (link.href.includes('advanced.html')) link.classList.add('active');
        else link.classList.remove('active');
    });

    UI.dataSource.addEventListener('change', (e) => {
        state.preferences.source = e.target.value;
        runAnalysis();
    });

    const init = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', theme);
        UI.themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        
        runAnalysis();
    };

    init();
});