function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer-grid">

      <div class="footer-brand">
        <div class="footer-logo">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">TheDevStudio</span>
        </div>
        <p class="footer-desc">Empowering learners worldwide with cutting-edge educational content and interactive challenges.</p>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Quick Links</h4>
        <ul class="footer-links">
          <li><a href="/index.html">Home</a></li>
          <li><a href="/courses.html">All Courses</a></li>
          <li><a href="/challenges.html">Challenges</a></li>
          <li><a href="/login.html">Login</a></li>
          <li><a href="/signup.html">Sign Up</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Categories</h4>
        <ul class="footer-links">
          <li><a href="#">Web Development</a></li>
          <li><a href="#">Data Science</a></li>
          <li><a href="#">Mobile Development</a></li>
          <li><a href="#">Machine Learning</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">Contact</h4>
        <ul class="footer-links">
          <li>✉️ info@thedevstudio.com</li>
          <li>📞 +1 (555) 123-4567</li>
          <li>📍 San Francisco, CA</li>
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


