// js/main.js (Corrected Version + Explicit Global Export)
// js/main.js

// ▼▼▼=============== Firebase Initialization ===============▼▼▼
const firebaseConfig = {
  apiKey: "AIzaSyAgE_QIPBLwLyzBSTes9DZeoSRRGGsjFc4",
  authDomain: "financial-analyzer-auth.firebaseapp.com",
  projectId: "financial-analyzer-auth",
  storageBucket: "financial-analyzer-auth.firebasestorage.app",
  messagingSenderId: "11825900601",
  appId: "1:11825900601:web:3c931b63188487687171e8",
  measurementId: "G-WPEDML95QW"
};

// Initialize Firebase
let app, auth, db; // Define them here
try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.getAuth(app);
    db = firebase.getFirestore(app); // Initialize Firestore
    console.log("Firebase Initialized Successfully.");
} catch (error) {
    console.error("Firebase Initialization Failed:", error);
    // ممكن تعرض رسالة للمستخدم إن فيه مشكلة في الاتصال بالخدمة
}
// ▲▲▲=============== End Firebase Initialization ===============▲▲▲
const state = {
    preferences: {
        theme: localStorage.getItem('theme') || 'light',
        lang: localStorage.getItem('lang') || 'ar',
    }
};
const translations = {
    ar: {
        brandTitle: "المحلل المالي", navHome: "الرئيسية", navInput: "الإدخال", navUpload: "الرفع",
        navReport: "التقرير", navAdvanced: "تحليلات متقدمة", navDashboard: "لوحة التحكم", navCompare: "المقارنات",
        footerText: "© 2025 المحلل المالي. جميع الحقوق محفوظة.",
        navBenchmarks: "المقارنات المعيارية", // تمت إضافته
        exportPdf: "تصدير PDF",
        pageTitle: "المحلل المالي", // لعنوان الصفحة
    passwordTitle: "مطلوب مصادقة",
    passwordSubtitle: "الرجاء إدخال كلمة المرور لعرض الموقع.",
    passwordPlaceholder: "كلمة المرور",
    passwordButtonText: "دخول",
    passwordErrorText: "كلمة المرور غير صحيحة. حاول مرة أخرى."
  sendOtpButtonText: "إرسال الكود",
    phonePlaceholder: "رقم الموبايل (مع كود الدولة)",
    invalidPhoneError: "الرجاء إدخال رقم موبايل صحيح.",
    recaptchaExpiredError: "انتهت صلاحية التحقق الأمني. حاول مرة أخرى.",
    tooManyRequestsError: "تم إرسال طلبات كثيرة. حاول لاحقاً.",
    otpSendError: "حدث خطأ أثناء إرسال الكود. حاول مرة أخرى.",
    sendingOtpText: "جاري الإرسال...",
    otpTitle: "أدخل الكود",
    otpSubtitle: "تم إرسال كود التحقق إلى ", // الرقم هيتضاف بالكود
  otpButtonText: "تحقق",
    invalidOtpError: "الرجاء إدخال كود صحيح (6 أرقام).",
    otpConfirmationError: "خطأ في عملية التأكيد. أعد إرسال الكود.",
    verifyingOtpText: "جاري التحقق...",
    otpExpiredError: "انتهت صلاحية هذا الكود. أعد الإرسال.",
    otpResendButton: "إعادة إرسال الكود",
    // مفاتيح جديدة للتحقق من Firestore
    unauthorizedNumberError: "هذا الرقم غير مصرح له بالدخول.",
    firestoreCheckError: "حدث خطأ أثناء التحقق من صلاحية الرقم. حاول مرة أخرى."
    },
    en: {
        brandTitle: "Financial Analyzer", navHome: "Home", navInput: "Input", navUpload: "Upload",
        navReport: "Report", navAdvanced: "Advanced", navDashboard: "Dashboard", navCompare: "Comparisons",
        footerText: "© 2025 Financial Analyzer. All rights reserved.",
        navBenchmarks: "Benchmarks", // تمت إضافته
        exportPdf: "Export PDF",
        pageTitle: "Financial Analyzer", // For page title
    passwordTitle: "Authentication Required",
    passwordSubtitle: "Please enter the password to view the site.",
    passwordPlaceholder: "Password",
    passwordButtonText: "Login",
    passwordErrorText: "Incorrect password. Please try again."
    sendOtpButtonText: "Send Code",
    phonePlaceholder: "Mobile Number (with country code)",
    invalidPhoneError: "Please enter a valid mobile number.",
    recaptchaExpiredError: "reCAPTCHA expired. Please try again.",
    tooManyRequestsError: "Too many requests. Please try again later.",
    otpSendError: "Error sending code. Please try again.",
    sendingOtpText: "Sending...",
    otpTitle: "Enter Code",
    otpSubtitle: "Verification code sent to ", // Number added by code
    otpButtonText: "Verify",
    invalidOtpError: "Please enter a valid 6-digit code.",
    otpConfirmationError: "Confirmation error. Please resend the code.",
    verifyingOtpText: "Verifying...",
    otpExpiredError: "This code has expired. Please resend.",
    otpResendButton: "Resend Code",
    // New Firestore Check Keys
    unauthorizedNumberError: "This phone number is not authorized.",
    firestoreCheckError: "Error checking number authorization. Please try again."
    }
};

// --- 2. GLOBAL FUNCTIONS ---
const t = (key) => (translations[state.preferences.lang] && translations[state.preferences.lang][key]) || key;
const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
};

// *** Define applyTranslations GLOBALLY ***
function applyTranslations() {
    const lang = state.preferences.lang;
    console.log(`Applying translations for language: ${lang} (main.js)`);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const pageTranslations = (typeof window.pageTranslations === 'object' && window.pageTranslations !== null) ? window.pageTranslations : {};
        const key = el.dataset.translateKey;
        const translatedText = pageTranslations[lang]?.[key]
                             || translations[lang]?.[key]
                             || `[${key}]`;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (translatedText !== `[${key}]`) { el.placeholder = translatedText; }
        } else {
            el.textContent = translatedText;
        }
    });
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
    console.log("Translations applied (main.js).");
};

// --- 3. DOMContentLoaded for Initialization and Event Binding ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed (main.js)");
    const UI = { themeToggle: document.getElementById('themeToggle'), languageSelect: document.getElementById('languageSelect') };
    if (UI.themeToggle) { UI.themeToggle.addEventListener('click', () => { const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; applyTheme(newTheme); }); }
    if (UI.languageSelect) {
        UI.languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        UI.languageSelect.value = state.preferences.lang;
        UI.languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value;
            localStorage.setItem('lang', state.preferences.lang);
            window.location.reload();
        });
    }
    applyTheme(state.preferences.theme);
    // Call translation ONCE here after DOM is ready
    applyTranslations();
    console.log("Initial setup complete (main.js).");
// ==========================================================
//  (Firebase OTP + Firestore Check) - كود التحكم الجديد
// ==========================================================

// تحديد العناصر (مع إضافة عناصر OTP)
const splashScreen = document.getElementById('splashScreen');
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput'); // حقل الموبايل
const passwordButton = document.getElementById('passwordButton'); // زرار إرسال الكود
const passwordError = document.getElementById('passwordError');
const passwordContent = document.querySelector('.password-content');

// --- إنشاء وإضافة شاشة الـ OTP ديناميكياً ---
const otpScreen = document.createElement('div');
otpScreen.id = 'otpScreen';
otpScreen.className = 'otp-screen';
otpScreen.innerHTML = `
    <h4 data-translate-key="otpTitle">أدخل الكود</h4>
    <p class="text-muted small" data-translate-key="otpSubtitle">تم إرسال كود التحقق إلى <span id="otpPhoneNumber" class="fw-bold"></span></p>
    <input type="text" id="otpInput" class="form-control mb-3" placeholder="------" maxlength="6" inputmode="numeric" pattern="[0-9]*">
    <button id="otpButton" class="btn btn-success w-100" data-translate-key="otpButtonText">تحقق</button>
    <p id="otpError" class="otp-error small"></p>
    <button id="resendOtpButton" class="btn btn-link btn-sm mt-2" data-translate-key="otpResendButton" disabled>إعادة إرسال الكود</button>
`;
if (passwordContent) {
    passwordContent.appendChild(otpScreen);
    otpScreen.style.display = 'none'; // نخفيها في الأول
} else {
     console.error("Password modal content area not found!");
}

// تحديد عناصر OTP بعد إضافتها
const otpInput = document.getElementById('otpInput');
const otpButton = document.getElementById('otpButton');
const otpError = document.getElementById('otpError');
const otpPhoneNumberDisplay = document.getElementById('otpPhoneNumber');
const resendOtpButton = document.getElementById('resendOtpButton');
// --------------------------------------------------

const splashDuration = 1500; // مدة الشاشة الترحيبية

// ----- الدوال المساعدة -----
const showPasswordModal = () => {
    if (!passwordModal) return;
    // إعادة تعيين شكل المودال لشاشة طلب الموبايل
    if (passwordInput) {
        passwordInput.value = '';
        passwordInput.placeholder = t('phonePlaceholder');
        passwordInput.type = 'tel';
        passwordInput.disabled = false;
    }
    if (passwordButton) {
        passwordButton.textContent = t('sendOtpButtonText');
        passwordButton.disabled = false;
         // إعادة ربط الـ reCAPTCHA بالزرار (احتياطي)
         try {
             if (!window.recaptchaVerifier || window.recaptchaVerifier.destroyed) {
                 setupRecaptchaVerifier(); // نعيد إنشاءه لو مش موجود
             } else {
                // التأكد من أن الـ container موجود قبل الـ render
                if (document.getElementById('passwordButton')) {
                    recaptchaVerifier.render().then(widgetId => window.recaptchaWidgetId = widgetId);
                }
             }
         } catch(e){ console.error("Error setting up reCAPTCHA on modal show:", e); }
    }
    if (otpScreen) otpScreen.style.display = 'none';
    if (passwordError) hidePasswordError();
    if (otpError) hideOtpError();
    passwordModal.classList.add('visible');
    if (passwordInput) passwordInput.focus();
};
const hidePasswordModal = () => passwordModal?.classList.remove('visible');
const showPasswordError = (messageKey) => {
    if (!passwordError) return;
    passwordError.textContent = t(messageKey);
    passwordError.classList.add('visible');
    passwordContent?.classList.add('shake');
    setTimeout(() => passwordContent?.classList.remove('shake'), 500);
};
const hidePasswordError = () => passwordError?.classList.remove('visible');
const showOtpError = (message) => {
     if (!otpError) return;
     otpError.textContent = message; // قد تكون رسالة من Firebase مباشرة
     otpError.classList.add('visible');
};
const hideOtpError = () => otpError?.classList.remove('visible');

// --- إعداد الـ reCAPTCHA ---
function setupRecaptchaVerifier() {
     if (!auth || !document.getElementById('passwordButton')) {
         console.warn("Auth or button not ready for reCAPTCHA.");
         return;
     }
     try {
        // تدمير أي reCAPTCHA قديم قبل إنشاء واحد جديد
        if (window.recaptchaVerifier && !window.recaptchaVerifier.destroyed) {
            // لا يوجد طريقة مباشرة للتدمير، سنقوم بإعادة تعيينه عند الحاجة
        }
        window.recaptchaVerifier = new firebase.RecaptchaVerifier(auth, 'passwordButton', {
            'size': 'invisible',
            'callback': (response) => console.log("reCAPTCHA verified."),
            'expired-callback': () => {
                console.warn("reCAPTCHA expired.");
                showPasswordError('recaptchaExpiredError');
            }
        });
        // تأكد من أن الزرار موجود قبل محاولة الـ render
        if (document.getElementById('passwordButton')) {
            window.recaptchaVerifier.render().then((widgetId) => {
                window.recaptchaWidgetId = widgetId;
                console.log("reCAPTCHA rendered, widgetId:", widgetId);
            }).catch(err => console.error("Error rendering reCAPTCHA:", err));
        }
    } catch (error) {
         console.error("Error setting up reCAPTCHA verifier:", error);
         showPasswordError('otpSendError'); // خطأ عام في حالة فشل الإعداد
    }
}
setupRecaptchaVerifier(); // نناديها مرة عند التحميل
// ------------------------

let confirmationResult = null;
let lastPhoneNumber = '';

// --- المنطق الرئيسي ---
const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

if (isAuthenticated) {
    // --- المستخدم مسجل دخوله ---
    if (splashScreen) {
        setTimeout(() => splashScreen.classList.add('hidden'), splashDuration);
    }
} else {
    // --- المستخدم غير مسجل دخوله ---
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // تأخير إظهار المودال قليلاً لضمان اكتمال كل شيء
            setTimeout(showPasswordModal, 550);
        }, splashDuration);
    }

    // --- عند الضغط على زر "إرسال الكود" ---
    if (passwordButton) {
        passwordButton.addEventListener('click', () => {
            if (!auth) { showPasswordError('otpSendError'); return; } // تأكد من تهيئة Firebase Auth
            hidePasswordError();
            hideOtpError(); // إخفاء أي خطأ OTP قديم
            const phoneNumber = passwordInput.value.trim();
            lastPhoneNumber = phoneNumber;

            if (!phoneNumber || phoneNumber.length < 10) {
                showPasswordError('invalidPhoneError');
                return;
            }
            // تنسيق الرقم (مثال لمصر، يجب تحسينه)
            let formattedPhoneNumber = phoneNumber;
            if (!formattedPhoneNumber.startsWith('+')) {
                 if (formattedPhoneNumber.startsWith('01') && formattedPhoneNumber.length === 11) { formattedPhoneNumber = '+20' + formattedPhoneNumber.substring(1); }
                 else if (formattedPhoneNumber.length >= 10) { formattedPhoneNumber = '+20' + formattedPhoneNumber; } // افتراض +20
                 else { showPasswordError('invalidPhoneError'); return; }
            }

            passwordButton.disabled = true;
            passwordButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${t('sendingOtpText')}`;

            // التأكد من جاهزية reCAPTCHA
            if (!window.recaptchaVerifier) {
                 console.error("reCAPTCHA verifier not initialized.");
                 showPasswordError('otpSendError');
                 passwordButton.disabled = false;
                 passwordButton.innerHTML = t('sendOtpButtonText');
                 setupRecaptchaVerifier(); // نحاول إعداده مرة أخرى
                 return;
            }

            firebase.signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)
                .then((result) => {
                    confirmationResult = result;
                    console.log("OTP sent successfully!");
                    if(otpPhoneNumberDisplay) otpPhoneNumberDisplay.textContent = formattedPhoneNumber;
                    if(passwordInput) passwordInput.disabled = true;
                    if(otpScreen) otpScreen.style.display = 'block';
                    if(otpInput) { otpInput.value = ''; otpInput.focus(); }
                    hidePasswordError();
                    enableResendButtonAfterDelay(); // تفعيل زر إعادة الإرسال بعد فترة
                }).catch((error) => {
                    console.error("Error sending OTP:", error);
                    let errorKey = 'otpSendError';
                    if (error.code === 'auth/invalid-phone-number') { errorKey = 'invalidPhoneError'; }
                     else if (error.code === 'auth/too-many-requests') { errorKey = 'tooManyRequestsError'; }
                    showPasswordError(errorKey);
                    // إعادة تعيين reCAPTCHA مهم جداً بعد الخطأ
                     try {
                         if (window.recaptchaWidgetId !== undefined) {
                             grecaptcha.reset(window.recaptchaWidgetId);
                             console.log("reCAPTCHA reset after send error.");
                         } else { // نحاول إعادة الإنشاء لو مفيش ID
                             setupRecaptchaVerifier();
                         }
                     } catch(e) { console.error("Error resetting reCAPTCHA:", e); }
                }).finally(() => {
                    passwordButton.disabled = false;
                    passwordButton.innerHTML = t('sendOtpButtonText');
                });
        });
    }

    // --- عند الضغط على زر "تحقق" (OTP) ---
    if (otpButton) {
        otpButton.addEventListener('click', () => {
             if (!auth || !db) { showOtpError(t('otpConfirmationError')); return; } // تأكد من تهيئة Firebase
            hideOtpError();
            const code = otpInput.value.trim();

            if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
                showOtpError(t('invalidOtpError'));
                return;
            }
            if (!confirmationResult) {
                showOtpError(t('otpConfirmationError'));
                return;
            }

            otpButton.disabled = true;
            otpButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${t('verifyingOtpText')}`;

            confirmationResult.confirm(code)
                .then((result) => {
                    const user = result.user;
                    const phoneNumberVerified = user.phoneNumber;
                    console.log("OTP Verified for:", phoneNumberVerified);

                    // --- ▼▼▼ التحقق من Firestore ▼▼▼ ---
                    const allowedNumbersRef = firebase.collection(db, "allowed_numbers");
                    const q = firebase.query(allowedNumbersRef, firebase.where("phoneNumber", "==", phoneNumberVerified));

                    return firebase.getDocs(q); // نرجع Promise للـ chain
                })
                .then((querySnapshot) => {
                     // هنا نتيجة التحقق من Firestore
                     if (!querySnapshot.empty) {
                         console.log("Phone number IS authorized.");
                         sessionStorage.setItem('isAuthenticated', 'true');
                         hidePasswordModal();
                     } else {
                         console.warn("Phone number is NOT authorized.");
                         showOtpError(t('unauthorizedNumberError'));
                         firebase.signOut(auth).catch(err => console.error("Sign out error:", err)); // حاول تسجيل الخروج
                         // لا تخفي المودال ولا تسجل الدخول
                     }
                })
                .catch((error) => {
                    // يعالج أخطاء الـ confirm وأخطاء الـ Firestore
                    console.error("Error during OTP confirm or Firestore check:", error);
                    let errorMsg = t('invalidOtpError'); // افتراضي
                    if (error.code === 'auth/invalid-verification-code') { errorMsg = t('invalidOtpError'); }
                     else if (error.code === 'auth/code-expired') { errorMsg = t('otpExpiredError'); }
                     else if (error.message.includes("Firestore")) { errorMsg = t('firestoreCheckError'); } // لو الخطأ من Firestore
                    showOtpError(errorMsg);
                     // حاول تسجيل الخروج في حالة الخطأ لضمان عدم وجود سيشن مفتوح
                     firebase.signOut(auth).catch(err => console.error("Sign out error:", err));
                }).finally(() => {
                    otpButton.disabled = false;
                    otpButton.innerHTML = t('otpButtonText');
                });
        });
         // Enter في حقل OTP
         if(otpInput) otpInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); otpButton.click(); } });
    }

    // --- زر إعادة إرسال الكود ---
    if (resendOtpButton) {
        resendOtpButton.addEventListener('click', () => {
             if (!auth || !lastPhoneNumber) return; // لازم يكون فيه رقم سابق
             if (!window.recaptchaVerifier) { // تأكد من وجود الـ verifier
                  console.error("reCAPTCHA needed for resend.");
                  setupRecaptchaVerifier(); // حاول إعداده
                  showOtpError(t('otpSendError')); // أظهر خطأ عام
                  return;
             }

            resendOtpButton.disabled = true;
            passwordButton.disabled = true; // نعطل الزر التاني برضو
            passwordButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${t('sendingOtpText')}`; // نستخدم الزر التاني كمؤشر تحميل

            // تنسيق الرقم مرة أخرى
            let formattedPhoneNumber = lastPhoneNumber;
            if (!formattedPhoneNumber.startsWith('+')) {
                 if (formattedPhoneNumber.startsWith('01') && formattedPhoneNumber.length === 11) { formattedPhoneNumber = '+20' + formattedPhoneNumber.substring(1); }
                 else { formattedPhoneNumber = '+20' + formattedPhoneNumber; } // افتراض +20
            }

            firebase.signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)
                .then((result) => {
                    confirmationResult = result; // تحديث نتيجة التأكيد
                    console.log("OTP resent successfully!");
                    hideOtpError(); // إخفاء أي خطأ قديم
                    if(otpInput) otpInput.focus();
                    enableResendButtonAfterDelay(); // إعادة تشغيل العداد
                }).catch((error) => {
                    console.error("Error resending OTP:", error);
                    let errorKey = 'otpSendError';
                    if (error.code === 'auth/too-many-requests') { errorKey = 'tooManyRequestsError'; }
                    showOtpError(t(errorKey)); // نعرض الخطأ في منطقة الـ OTP
                     // إعادة تعيين reCAPTCHA مهم جداً
                     try {
                         if (window.recaptchaWidgetId !== undefined) {
                             grecaptcha.reset(window.recaptchaWidgetId);
                             console.log("reCAPTCHA reset after resend error.");
                         } else { setupRecaptchaVerifier(); }
                     } catch(e) { console.error("Error resetting reCAPTCHA on resend:", e); }
                }).finally(() => {
                    passwordButton.disabled = false; // تفعيل الزر الأساسي
                    passwordButton.innerHTML = t('sendOtpButtonText');
                    // زر إعادة الإرسال سيبقى معطل حتى انتهاء العداد
                });
        });
    }

    // --- دالة عداد إعادة الإرسال ---
    const RESEND_DELAY = 60000; // 60 ثانية
    let resendTimeout;
    function enableResendButtonAfterDelay() {
        if (!resendOtpButton) return;
        clearTimeout(resendTimeout);
        resendOtpButton.disabled = true;
        let secondsLeft = RESEND_DELAY / 1000;
        resendOtpButton.textContent = `${t('otpResendButton')} (${secondsLeft})`;

        resendTimeout = setInterval(() => {
            secondsLeft--;
            if (secondsLeft <= 0) {
                clearInterval(resendTimeout);
                resendOtpButton.disabled = false;
                resendOtpButton.textContent = t('otpResendButton');
            } else {
                resendOtpButton.textContent = `${t('otpResendButton')} (${secondsLeft})`;
            }
        }, 1000);
    }
} // نهاية بلوك else بتاع المستخدم غير المسجل

// ==========================================================
//  (نهاية الكود الجديد)
// ==========================================================
window.applyTranslations = applyTranslations;
console.log("applyTranslations function explicitly attached to window.");
