// ── LIVE PRICE PREVIEW ──
document.getElementById('price-input').addEventListener('input', function () {
  const val = parseFloat(this.value);
  document.getElementById('preview-price').textContent = isNaN(val) ? '$0' : '$' + val.toFixed(2);
});

// ── BACK BUTTON ──
document.querySelector('.btn-back').addEventListener('click', () => {
  window.location.href = 'create-step2.html';
});

// ── PUBLISH BUTTON — validate + submit ──
document.querySelector('.btn-publish').addEventListener('click', () => {
  const publishBtn = document.querySelector('.btn-publish');
  const priceInput = document.getElementById('price-input');
  const durationInput = document.querySelector('input[placeholder="e.g., 40 hours"]');

  let valid = true;

  // check price is filled
  if (!priceInput.value.trim() || parseFloat(priceInput.value) < 0) {
    priceInput.style.borderColor = 'var(--pink)';
    priceInput.style.boxShadow = '0 0 0 3px rgba(255,64,160,0.2)';
    valid = false;
  } else {
    priceInput.style.borderColor = 'var(--border)';
    priceInput.style.boxShadow = 'none';
  }

  // check duration is filled
  if (!durationInput.value.trim()) {
    durationInput.style.borderColor = 'var(--pink)';
    durationInput.style.boxShadow = '0 0 0 3px rgba(255,64,160,0.2)';
    valid = false;
  } else {
    durationInput.style.borderColor = 'var(--border)';
    durationInput.style.boxShadow = 'none';
  }

  if (!valid) {
    // shake button
    publishBtn.style.transform = 'translateX(-6px)';
    setTimeout(() => publishBtn.style.transform = 'translateX(6px)', 100);
    setTimeout(() => publishBtn.style.transform = 'translateX(0)', 200);
    return;
  }

  publishBtn.textContent = '✓ Course Published!';
  publishBtn.style.background = 'linear-gradient(90deg, var(--teal), var(--yellow))';
  publishBtn.disabled = true;

  // redirect after 1.5 seconds
 setTimeout(() => {
  window.location.href = "page-created.html";
}, 1500);});

// ── CLEAR ERRORS ON TYPING ──
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('input', () => {
    input.style.borderColor = 'var(--border)';
    input.style.boxShadow = 'none';
  });
});