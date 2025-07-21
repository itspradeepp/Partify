const fs = require('fs');
const path = require('path');
const csvFilePath = path.join(__dirname, 'data.csv');

function parseCSV(data) {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, idx) => {
      obj[header.trim()] = values[idx].trim();
      return obj;
    }, {});
  });
}

function getDataFromCSV() {
  try {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    return parseCSV(csvData);
  } catch (err) {
    console.error('Error reading CSV:', err);
    return [];
  }
}

module.exports = { getDataFromCSV };