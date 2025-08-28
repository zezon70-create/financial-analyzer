// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const { parseUploadedWorkbook, parseCSVText, buildExcelBuffer, buildPdfBufferAsync } = require('./export-server');
const { buildStatementsFromRows, computeRatios, computeEVA, forecastSeriesLinear } = require('./calculations');

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit:'20mb' }));
app.use(bodyParser.urlencoded({ extended:true, limit:'20mb' }));

// Serve frontend static
app.use('/', express.static(path.join(__dirname, 'public')));

// COA endpoint
app.get('/api/coa', (req,res)=>{
  const coa = require('./data/coa.json');
  res.json(coa);
});

// Upload file endpoint (XLSX/CSV)
app.post('/api/upload', upload.single('file'), async (req,res)=>{
  try {
    if(!req.file) return res.status(400).json({error:'No file provided'});
    const name = req.file.originalname.toLowerCase();
    let rows;
    if(name.endsWith('.csv')){
      rows = parseCSVText(req.file.buffer.toString('utf8'));
    } else {
      rows = await parseUploadedWorkbook(req.file.buffer);
    }
    const statements = buildStatementsFromRows(rows, {});
    res.json({ rows, statements });
  } catch(e){
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Manual paste endpoint
app.post('/api/manual', (req,res)=>{
  try{
    const { text } = req.body;
    if(!text) return res.status(400).json({ error: 'No text provided' });
    const rows = parseCSVText(text);
    const statements = buildStatementsFromRows(rows, {});
    res.json({ rows, statements });
  } catch(e){
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Build statements with mapping and return ratios
app.post('/api/build', async (req,res)=>{
  try{
    const { rows, userMap, wacc } = req.body;
    if(!rows) return res.status(400).json({ error:'No rows provided' });
    const stm = buildStatementsFromRows(rows, userMap || {});
    const ratios = {};
    Object.keys(stm.statements).forEach(y=>{
      ratios[y] = computeRatios(stm.statements[y]);
      ratios[y].eva = computeEVA(stm.statements[y], (typeof wacc==='number' ? wacc : 10));
    });
    res.json({ statements: stm, ratios });
  } catch(e){
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Forecast
app.post('/api/forecast', (req,res)=>{
  try{
    const { baseSeries, growthRate, years } = req.body;
    const gr = (typeof growthRate === 'number') ? growthRate/100 : null;
    const series = forecastSeriesLinear(baseSeries || [], years || 5, gr);
    res.json({ forecast: series });
  } catch(e){
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Export Excel
app.post('/api/export/excel', (req,res)=>{
  try{
    const { statements } = req.body;
    if(!statements) return res.status(400).json({ error:'No statements' });
    const buf = buildExcelBuffer(statements);
    res.setHeader('Content-Disposition','attachment; filename=financial_statements.xlsx');
    res.setHeader('Content-Type','application/octet-stream');
    res.send(buf);
  } catch(e){
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Export PDF (async)
app.post('/api/export/pdf', async (req,res)=>{
  try{
    const { statements } = req.body;
    if(!statements) return res.status(400).json({ error:'No statements' });
    const buf = await buildPdfBufferAsync(statements);
    res.setHeader('Content-Disposition','attachment; filename=financial_statements.pdf');
    res.setHeader('Content-Type','application/pdf');
    res.send(buf);
  } catch(e){
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
