
    document.getElementById('price-input').addEventListener('input', function() {
      const val = parseFloat(this.value);
      document.getElementById('preview-price').textContent = isNaN(val) ? '$0' : '$' + val.toFixed(2);
    });