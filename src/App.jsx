import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts'

export default function App() {
  const [data, setData] = useState([])
  const [input, setInput] = useState({ year: '', revenue: '', expenses: '', profit: '' })

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!input.year) return
    setData([...data, { ...input, revenue: +input.revenue, expenses: +input.expenses, profit: +input.profit }])
    setInput({ year: '', revenue: '', expenses: '', profit: '' })
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>📊 Financial Analyzer</h1>
      <div style={{ marginBottom: 20 }}>
        <input name="year" placeholder="Year" value={input.year} onChange={handleChange} />
        <input name="revenue" placeholder="Revenue" value={input.revenue} onChange={handleChange} />
        <input name="expenses" placeholder="Expenses" value={input.expenses} onChange={handleChange} />
        <input name="profit" placeholder="Profit" value={input.profit} onChange={handleChange} />
        <button onClick={handleAdd}>Add</button>
      </div>

      <h2>Data Table</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr><th>Year</th><th>Revenue</th><th>Expenses</th><th>Profit</th></tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.year}</td><td>{row.revenue}</td><td>{row.expenses}</td><td>{row.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Charts</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#8884d8" />
        <Bar dataKey="expenses" fill="#82ca9d" />
        <Bar dataKey="profit" fill="#ffc658" />
      </BarChart>

      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="profit" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}
