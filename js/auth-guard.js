// js/auth-guard.js

(function() {
    // 1. هل المستخدم سجل دخوله في التاب دي؟
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    // 2. إيه هي الصفحة اللي المستخدم بيحاول يفتحها؟
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 3. القرار (ده أهم جزء)
    if (!isAuthenticated && currentPage !== 'index.html') {
        // لو المستخدم "مش" مسجل دخوله
        // و "كمان" الصفحة اللي بيحاول يفتحها "مش" هي صفحة الدخول (index)
        // ... رجعه فوراً لصفحة الدخول
        window.location.href = 'index.html';
    }
})();