// ===== GET ROLE =====
function getRole() {
  return localStorage.getItem("role"); 
  // "instructor", "student", "admin", or null
}

// ===== COURSES =====
function goCourses() {
  window.location.href = "../../../public/pages/public/all-courses.html";
}

// ===== CHALLENGES =====
function goChallenges() {
  window.location.href = "../pages/public/coding-challenges.html";
}

// ===== DASHBOARD =====
function goDashboard() {
  const role = getRole();

  if (role === "instructor") {
    window.location.href = "../pages/instructor/dashboard.html";
  } 
  else if (role === "student") {
    window.location.href = "../pages/student/dashboard.html";
  } 
  else if (role === "admin") {
    window.location.href = "../pages/admin/dashboard.html";
  } 
  else {
    // not logged in
    window.location.href = "../pages/login.html";
  }
}

// ===== PROFILE =====
function goProfile() {
  const role = getRole();

  if (role === "instructor") {
    window.location.href = "../pages/instructor/profile.html";
  } 
  else if (role === "student") {
    window.location.href = "../pages/student/profile.html";
  } 
  else if (role === "admin") {
    window.location.href = "../pages/admin/profile.html";
  } 
  else {
    window.location.href = "../pages/login.html";
  }
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("role");
  window.location.href = "../index.html";
}
function goHome() {
  window.location.href = "/index.html";
}