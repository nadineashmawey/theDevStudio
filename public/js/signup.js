lucide.createIcons();

const roleButtons = document.querySelectorAll(".role-btn");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const signupForm = document.getElementById("signupForm");

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    roleButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";

  togglePassword.innerHTML = isHidden
    ? '<i data-lucide="eye-off"></i>'
    : '<i data-lucide="eye"></i>';

  lucide.createIcons();
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value.trim();
  const terms = document.getElementById("terms").checked;
  const selectedRole = document.querySelector(".role-btn.active")?.dataset.role;

  if (!fullName || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (!terms) {
    alert("Please agree to the Terms of Service and Privacy Policy.");
    return;
  }

  alert(`Account created as ${selectedRole}`);
});