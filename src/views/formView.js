export function renderForm() {
  // Ensure the form and dropdowns exist
  const form = document.getElementById('vehicle-form');
  const yearSelect = form.querySelector('#year');
  const makeSelect = form.querySelector('#make');
  const modelSelect = form.querySelector('#model');
  const typeSelect = form.querySelector('#productType');

  // Set placeholder options if not already present
  if (yearSelect && yearSelect.options.length === 0) {
    yearSelect.innerHTML = '<option value="">Select Year</option>';
  }
  if (makeSelect && makeSelect.options.length === 0) {
    makeSelect.innerHTML = '<option value="">Select Make</option>';
  }
  if (modelSelect && modelSelect.options.length === 0) {
    modelSelect.innerHTML = '<option value="">Select Model</option>';
  }
  if (typeSelect && typeSelect.options.length === 0) {
    typeSelect.innerHTML = '<option value="">Select Product Type</option>';
  }
}