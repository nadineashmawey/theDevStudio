const roleButtons = document.querySelectorAll(".role-btn");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const signinForm = document.getElementById("signinForm");

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

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  alert(`Signed in as ${selectedRole}`);
});