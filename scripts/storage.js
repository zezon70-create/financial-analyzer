// scripts/storage.js
const FA_STORAGE_KEY = 'fa:data:v1';

const bufToBase64 = (b)=> btoa(String.fromCharCode(...new Uint8Array(b)));
const base64ToBuf = (s)=> {
  const bin = atob(s);
  const arr = new Uint8Array(bin.length);
  for (let i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i);
  return arr.buffer;
};

async function deriveKey(pass) {
  const enc = new TextEncoder();
  const salt = enc.encode('financial-analyzer-salt-v1');
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(pass), {name: 'PBKDF2'}, false, ['deriveKey']);
  return crypto.subtle.deriveKey({name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256'}, keyMaterial, {name: 'AES-GCM', length: 256}, false, ['encrypt','decrypt']);
}

window.secureSave = async function(key, obj, pass) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const derived = await deriveKey(pass);
  const enc = new TextEncoder();
  const ct = await crypto.subtle.encrypt({name:'AES-GCM', iv}, derived, enc.encode(JSON.stringify(obj)));
  const payload = {iv: bufToBase64(iv), data: bufToBase64(ct)};
  localStorage.setItem(key, JSON.stringify(payload));
};

window.secureLoad = async function(key, pass) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try{
    const parsed = JSON.parse(raw);
    const derived = await deriveKey(pass);
    const dec = await crypto.subtle.decrypt({name:'AES-GCM', iv: base64ToBuf(parsed.iv)}, derived, base64ToBuf(parsed.data));
    return JSON.parse(new TextDecoder().decode(dec));
  }catch(e){
    console.error('decrypt failed', e);
    return null;
  }
};

window.clearAllData = function(){
  localStorage.removeItem(FA_STORAGE_KEY);
  // also keep other keys if needed
};
