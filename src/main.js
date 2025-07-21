import { renderForm } from './views/formview.js';
import { handleFormSubmit } from './controllers/formController.js';

document.addEventListener('DOMContentLoaded', () => {
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

document.getElementById('vehicle-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const year = document.getElementById('year').value;
  const make = document.getElementById('make').value;
  const model = document.getElementById('model').value;
  let valid = true;

  // Remove previous error messages
  document.querySelectorAll('.form-error').forEach(e => e.remove());
  document.querySelectorAll('.form-error-highlight').forEach(e => e.classList.remove('form-error-highlight'));

  function showError(id, message) {
    const el = document.getElementById(id);
    el.classList.add('form-error-highlight');
    const error = document.createElement('div');
    error.className = 'form-error';
    error.style.color = 'red';
    error.style.fontSize = '0.9em';
    error.textContent = message;
    el.parentNode.insertBefore(error, el.nextSibling);
  }

  if (!year) {
    showError('year', 'Year is required');
    valid = false;
  }
  if (!make) {
    showError('make', 'Make is required');
    valid = false;
  }
  if (!model) {
    showError('model', 'Model is required');
    valid = false;
  }

  if (valid) {
    handleFormSubmit(event);
  }
});
