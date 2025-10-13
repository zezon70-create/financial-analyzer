// js/utils/csvSanitize.js
export function sanitizeCell(cell) {
  if (cell === null || typeof cell === 'undefined') return '';
  let s = String(cell);
  // إزالة أحرف null
  s = s.replace(/\u0000/g, '');
  // إزالة وسوم HTML بالكامل، تبقي النص فقط
  s = s.replace(/<[^>]*>/g, '');
  // إزالة أو استبدال بروتوكول javascript:
  s = s.replace(/javascript:/gi, '');
  // إزالة event handlers مثل onerror= أو onclick=
  s = s.replace(/on\w+\s*=/gi, '');
  // تقليم
  return s.trim();
}

export function sanitizeRow(row) {
  const out = {};
  for (const k in row) {
    out[k] = sanitizeCell(row[k]);
  }
  return out;
}
