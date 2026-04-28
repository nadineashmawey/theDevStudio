
document.addEventListener('DOMContentLoaded', () => {
const fpEmail   = document.getElementById('fpEmail');
  const fpSendBtn = document.getElementById('fpSendBtn');
  const fpError   = document.getElementById('fpError');
  const fpSuccess = document.getElementById('fpSuccess');

  if (fpEmail && fpSendBtn && fpError && fpSuccess) {

    function isValidEmail(email) {
      return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim());
    }

    function showError(message) {
      fpEmail.classList.add('error');
      fpError.textContent = message;
      fpError.classList.remove('hidden');
    }

    function clearError() {
      fpEmail.classList.remove('error');
      fpError.classList.add('hidden');
    }

    fpEmail.addEventListener('input', () => {
      if (fpEmail.value.trim()) clearError();
    });

    fpSendBtn.addEventListener('click', () => {
      const email = fpEmail.value.trim();

      clearError();
      fpSuccess.classList.add('hidden');

      if (!email) {
        showError('Email address is required.');
        fpEmail.focus();
        return;
      }

      if (!isValidEmail(email)) {
        showError('Please enter a valid email address (e.g. you@example.com).');
        fpEmail.focus();
        return;
      }

      fpSendBtn.disabled    = true;
      fpSendBtn.textContent = 'Sending...';

      setTimeout(() => {
        fpSendBtn.disabled    = false;
        fpSendBtn.textContent = 'Send Reset Link';
        fpEmail.value         = '';
        clearError();
        fpSuccess.classList.remove('hidden');
      }, 1500);
    });

    fpEmail.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') fpSendBtn.click();
    });

  } 

});