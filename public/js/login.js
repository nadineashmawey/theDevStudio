const roleButtons = document.querySelectorAll(".role-btn");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const signinForm = document.getElementById("signinForm");
const formMessage = document.getElementById("form-message");

let selectedRole = "Student";

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    roleButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    selectedRole = button.dataset.role;
  });
});

togglePassword.addEventListener("click", () => {
  const hidden = passwordInput.type === "password";
  passwordInput.type = hidden ? "text" : "password";
  togglePassword.textContent = hidden ? "🙈" : "👁";
});



signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value.trim();

  // reset message
  formMessage.textContent = "";

  if (!email || !password) {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Signing in...";
  formMessage.style.color = "#60A3A6"; 

  // redirect after short delay
  setTimeout(() => {
    redirectUser();
  }, 50);
});

function redirectUser() {
  if (selectedRole === "Student") {
    window.location.href = "/../../../public/pages/student/dashboard.html";
  } 
  else if (selectedRole === "Instructor") {
    window.location.href = "/../../../public/pages/instructor/dashboard.html";
  } 
  else if (selectedRole === "Admin") {
    window.location.href = "/../../../public/pages/admin/dashboard.html";
  } 
  else {
    formMessage.textContent = "Please select a role.";
    formMessage.style.color = "red";
  }
}