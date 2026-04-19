
  // =====================
  // Forgot Password Page
  // =====================
  const fpEmail   = document.getElementById('fpEmail');
  const fpSendBtn = document.getElementById('fpSendBtn');
  const fpError   = document.getElementById('fpError');
  const fpSuccess = document.getElementById('fpSuccess');

  if (fpEmail && fpSendBtn) {
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearFpError() {
      fpEmail.classList.remove('error');
      fpError.classList.add('hidden');
    }

    fpEmail.addEventListener('input', () => {
      if (fpEmail.value.trim()) clearFpError();
    });

    fpSendBtn.addEventListener('click', () => {
      const email = fpEmail.value.trim();
      clearFpError();
      fpSuccess.classList.add('hidden');

      if (!email || !isValidEmail(email)) {
        fpEmail.classList.add('error');
        fpError.classList.remove('hidden');
        fpEmail.focus();
        return;
      }

      fpSendBtn.disabled = true;
      fpSendBtn.textContent = 'Sending...';

      // Simulate API call — replace this with your real backend call
      setTimeout(() => {
        fpSendBtn.disabled = false;
        fpSendBtn.textContent = 'Send Reset Link';
        fpEmail.value = '';
        fpSuccess.classList.remove('hidden');
      }, 1500);
    });

    fpEmail.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') fpSendBtn.click();
    });
  }

});
