const worker = new Worker('js/workers/csvWorker.js');
worker.onmessage = (e) => {
  const { type, payload } = e.data;
  if (type === 'data') {
    // دمج payload في الـ state أو تخزين مؤقت
  } else if (type === 'chunk') {
    // تحديث شريط التقدم
  } else if (type === 'done') {
    // انتهت المعالجة
  } else if (type === 'error') {
    // عرض خطأ
  }
};
// عند رفع ملف:
worker.postMessage({ file });
