document.getElementById('climateForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const pledge = document.getElementById('pledge').value;
    alert(`Thank you, ${name}, for your pledge: "${pledge}"!`);
  });
  