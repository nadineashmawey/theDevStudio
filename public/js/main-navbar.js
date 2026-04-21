// ================= ROLE =================
function getRole() {
  return localStorage.getItem("role");
}

// ================= NAVIGATION =================
function goHome()       { window.location.href = "/index.html"; }
function goCourses()    { window.location.href = "/public/pages/public/all-courses.html"; }
function goChallenges() { window.location.href = "/public/pages/public/coding-challenges.html"; }

function goDashboard() {
  const routes = {
    instructor: "/public/pages/instructor/dashboard.html",
    student:    "/public/pages/student/dashboard.html",
    admin:      "/public/pages/admin/dashboard.html"
  };
  window.location.href = routes[getRole()] || "/public/pages/public/login.html";
}

function goProfile() {
  const routes = {
    instructor: "/public/pages/instructor/profile.html",
    student:    "/public/pages/student/profile.html",
    admin:      "/public/pages/admin/profile.html"
  };
  window.location.href = routes[getRole()] || "/public/pages/public/login.html";
}

function logout() {
  localStorage.removeItem("role");
  window.location.href = "/index.html";
}

// ================= NAVBAR =================
function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "top-navbar";
  nav.innerHTML = `
    <div class="nav-left" onclick="goHome()">
      <div class="logo-icon">
        <i class="fa-solid fa-graduation-cap"></i>
      </div>
      <span class="logo-text">EduPlatform</span>
    </div>
    <div class="nav-center">
      <a onclick="goCourses()">Courses</a>
      <a onclick="goChallenges()">Challenges</a>
      <a onclick="goDashboard()">Dashboard</a>
    </div>
    <div class="nav-right">
      <div class="profile-pill" onclick="goProfile()">
        <div class="avatar">
          <i class="fa-solid fa-user"></i>
        </div>
        <span id="nav-profile-name">Alex Johnson</span>
      </div>
      <div class="logout-icon" onclick="logout()">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", createNavbar);