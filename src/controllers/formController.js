export function handleFormSubmit(event) {
  event.preventDefault();

  const year = document.getElementById('year').value;
  const make = document.getElementById('make').value;
  const model = document.getElementById('model').value;
  const productType = document.getElementById('productType').value;

  let url = `https://partifyusa.com/collections/${year}-${make}-${model}`;
  if (productType) url += `?filter.p.product_type=${productType}`;

  window.location.href = url;
}