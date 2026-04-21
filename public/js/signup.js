
    // track selected role
    let selectedRole = 'student';

    function setRole(btn, role) {
      document.querySelectorAll('.btn-role').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = role;
    }

    // password toggle
    document.getElementById('toggle-pw').addEventListener('click', () => {
      const pw = document.getElementById('password');
      const icon = document.querySelector('#toggle-pw i');
      if (pw.type === 'password') {
        pw.type = 'text';
        icon.className = 'fa-regular fa-eye-slash';
      } else {
        pw.type = 'password';
        icon.className = 'fa-regular fa-eye';
      }
    });

    // validation helpers
    function showError(fieldId, errorId) {
      document.getElementById(fieldId).classList.add('error');
      document.getElementById(errorId).classList.add('show');
    }

    function clearError(fieldId, errorId) {
      document.getElementById(fieldId).classList.remove('error');
      document.getElementById(errorId).classList.remove('show');
    }

    // clear errors on typing
    ['name', 'email', 'password'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        clearError(id, id + '-error');
      });
    });

    // email validation
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // create account — validate then redirect based on role
    document.getElementById('btn-create').addEventListener('click', () => {
      const name     = document.getElementById('name');
      const email    = document.getElementById('email');
      const password = document.getElementById('password');
      const terms    = document.getElementById('terms');
      const btn      = document.getElementById('btn-create');
      let valid = true;

      // name check
      if (!name.value.trim()) {
        showError('name', 'name-error');
        valid = false;
      } else {
        clearError('name', 'name-error');
      }

      // email check
      if (!email.value.trim() || !isValidEmail(email.value)) {
        showError('email', 'email-error');
        valid = false;
      } else {
        clearError('email', 'email-error');
      }

      // password check
      if (password.value.length < 6) {
        showError('password', 'password-error');
        valid = false;
      } else {
        clearError('password', 'password-error');
      }

      // terms check
      if (!terms.checked) {
        document.getElementById('terms-error').classList.add('show');
        valid = false;
      } else {
        document.getElementById('terms-error').classList.remove('show');
      }

      if (!valid) {
        // shake button
        btn.style.transform = 'translateX(-6px)';
        setTimeout(() => btn.style.transform = 'translateX(6px)', 100);
        setTimeout(() => btn.style.transform = 'translateX(0)', 200);
        return;
      }

      // after successful login or signup
     localStorage.setItem("role", selectedRole);
     
      const routes = {
        student:    "../../pages/student/dashboard.html",
        instructor: "../../pages/instructor/dashboard.html",
        admin:      "../../pages/admin/dashboard.html"
      };
      window.location.href = routes[selectedRole];
    });
 
