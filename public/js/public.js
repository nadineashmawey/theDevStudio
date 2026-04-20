// =====================
// All Courses Page
// =====================
document.addEventListener('DOMContentLoaded', () => {

  // --- All Courses ---
  const searchInput  = document.getElementById('searchInput');
  const courseCards  = document.querySelectorAll('.course-card');
  const showingCount = document.getElementById('showingCount');
  const noResults    = document.getElementById('noResults');

  if (searchInput && courseCards.length > 0) {

    const categoryBtns = document.querySelectorAll('.filter-btn-category');
    const levelBtns    = document.querySelectorAll('.filter-btn-level');

    let activeCategory = 'all';
    let activeLevel    = 'all';
    let searchQuery    = '';

    function filterCourses() {
      let visibleCount = 0;

      courseCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardLevel    = card.dataset.level;
        const cardTitle    = card.querySelector('.card-title').textContent.toLowerCase();
        const cardDesc     = card.querySelector('.card-desc').textContent.toLowerCase();
        const cardAuthor   = card.querySelector('.card-author').textContent.toLowerCase();

        const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
        const matchesLevel    = activeLevel === 'all'    || cardLevel === activeLevel;
        const matchesSearch   = searchQuery === ''                               ||
                                cardTitle.includes(searchQuery)                  ||
                                cardDesc.includes(searchQuery)                   ||
                                cardAuthor.includes(searchQuery)                 ||
                                cardCategory.toLowerCase().includes(searchQuery);

        if (matchesCategory && matchesLevel && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      showingCount.textContent = `Showing ${visibleCount} course${visibleCount !== 1 ? 's' : ''}`;
      noResults.classList.toggle('hidden', visibleCount > 0);
    }

    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterCourses();
    });

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        filterCourses();
      });
    });

    levelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        levelBtns.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        activeLevel = btn.dataset.level;
        filterCourses();
      });
    });

    document.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.target.closest('.course-card').querySelector('.card-title').textContent;
        console.log(`View details: ${title}`);
      });
    });

    filterCourses();

  } // end all-courses guard


  // =====================
  // Forgot Password Page
  // =====================
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