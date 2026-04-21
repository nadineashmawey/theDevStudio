function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer-grid">

      <div class="footer-brand">
        <div class="footer-logo">
          <span class="logo-icon"><i class="fa-solid fa-graduation-cap" style="color:white"></i></span>
          <span class="logo-text">TheDevStudio</span>
        </div>
        <p class="footer-desc">Empowering learners worldwide with cutting-edge educational content and interactive challenges.</p>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Quick Links</h4>
        <ul class="footer-links">
          <li><a href="/index.html">Home</a></li>
          <li><a href="/public/pages/public/all-courses.html">All Courses</a></li>
          <li><a href="/public/pages/public/coding-challenges.html">Challenges</a></li>
          <li><a href="/public/pages/public/login.html">Login</a></li>
          <li><a href="/public/pages/public/signup.html">Sign Up</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Categories</h4>
        <ul class="footer-links">
          <li>Web Development</a></li>
          <li>Data Science</a></li>
          <li>Mobile Development</a></li>
          <li>Machine Learning</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Contact</h4>
        <ul class="footer-links">
          <li><i class="fa-solid fa-envelope"style="color:white" ></i> info@thedevstudio.com</li>
          <li><i class="fa-solid fa-phone" style="color:white;"></i> +1 (555) 123-4567</li>
          <li><i class="fa-solid fa-map-pin" style="color: white;"></i> San Francisco, CA</li>
        </ul>
      </div>

    </div>

    
    <div class="footer-bottom">
   
      <p>© 2026 TheDevStudio. All rights reserved.</p>
    </div>
  `;

  document.body.appendChild(footer);
}

renderFooter();


