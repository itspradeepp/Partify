import { renderForm } from './views/formview.js';
import { handleFormSubmit } from './controllers/formController.js';

document.addEventListener('DOMContentLoaded', () => {
  // Render the form initially
  renderForm();
});

fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    // Extract unique values for each dropdown
    const years = [...new Set(data.map(item => item.Year))];
    const makes = [...new Set(data.map(item => item.Make))];
    const models = [...new Set(data.map(item => item.Model))];
    const productTypes = [...new Set(data.map(item => item['Product Type']))];

    // Populate dropdowns
    populateSelect('year', years);
    populateSelect('make', makes);
    populateSelect('model', models);
    populateSelect('productType', productTypes);

    // Add form submit handler after form is ready
    document.getElementById('vehicle-form').addEventListener('submit', handleFormSubmit);
  })
  .catch(error => console.error('Error fetching data:', error));

function populateSelect(id, options) {
  const select = document.getElementById(id);
  if (!select) return;
  // Remove existing options except the first
  select.options.length = 1;
  options.forEach(option => {
    if (option) {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    }
  });
}
