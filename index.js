// Entry point for the Node.js app
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const { getDataFromCSV } = require('./src/models/data');

// Middleware
app.use(express.json());
app.use(express.static('src'));

// Serve static files from the project root so /Logo.png is accessible
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

// API endpoint to get CSV data, with optional year filter
app.get('/api/data', (req, res) => {
  const data = getDataFromCSV();
  const { year } = req.query;
  let filtered = data;
  if (year) {
    filtered = data.filter(item => String(item.Year) === String(year));
  }
  res.json(filtered);
});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server is running on ${url}`);
});
