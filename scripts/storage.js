// scripts/storage.js
// Functions to save/load sessions and preferences

const STORAGE_KEY = 'fa:data:v1';
const SESSIONS_KEY = 'fa:sessions:v1';
const PREF_KEY = 'fa:prefs:v1';

function saveSessionsList(list){
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(list));
}
function loadSessionsList(){
  try{ return JSON.parse(localStorage.getItem(SESSIONS_KEY)) || []; }catch(e){ return []; }
}

function saveCurrentData(data){
  // data: { trial: [...], metadata: {...} }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadCurrentData(){
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)); }catch(e){ return null; }
}

function savePrefs(prefs){
  localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
}

function loadPrefs(){
  try{return JSON.parse(localStorage.getItem(PREF_KEY)) || {};}catch(e){ return {}; }
}

// helper: save session snapshot with name
function addSessionSnapshot(name){
  const data = loadCurrentData();
  if(!data) return false;
  const sessions = loadSessionsList();
  sessions.push({ id: Date.now().toString(), name: name || ('Session ' + (sessions.length+1)), data, created: new Date().toISOString()});
  saveSessionsList(sessions);
  return true;
}

function getSessionById(id){
  const sessions = loadSessionsList();
  return sessions.find(s=>s.id === id) || null;
}
