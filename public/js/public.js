document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // All Courses Page
  // =====================
  const searchInput   = document.getElementById('searchInput');
  const categoryBtns  = document.querySelectorAll('.filter-btn-category');
  const levelBtns     = document.querySelectorAll('.filter-btn-level');
  const courseCards   = document.querySelectorAll('.course-card');
  const showingCount  = document.getElementById('showingCount');
  const noResults     = document.getElementById('noResults');

  if (searchInput && courseCards.length) {
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
        const matchesSearch   = searchQuery === '' ||
                                cardTitle.includes(searchQuery)  ||
                                cardDesc.includes(searchQuery)   ||
                                cardAuthor.includes(searchQuery) ||
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
  }

  // =====================
  // Forgot Password Page
  // =====================
  const fpEmail   = document.getElementById('fpEmail');
  const fpSendBtn = document.getElementById('fpSendBtn');
  const fpError   = document.getElementById('fpError');
  const fpSuccess = document.getElementById('fpSuccess');

  if (fpEmail && fpSendBtn) {
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearFpError() {
      fpEmail.classList.remove('error');
      fpError.classList.add('hidden');
    }

    fpEmail.addEventListener('input', () => {
      if (fpEmail.value.trim()) clearFpError();
    });

    fpSendBtn.addEventListener('click', () => {
      const email = fpEmail.value.trim();
      clearFpError();
      fpSuccess.classList.add('hidden');

      if (!email || !isValidEmail(email)) {
        fpEmail.classList.add('error');
        fpError.classList.remove('hidden');
        fpEmail.focus();
        return;
      }

      fpSendBtn.disabled = true;
      fpSendBtn.textContent = 'Sending...';

      // Simulate API call — replace this with your real backend call
      setTimeout(() => {
        fpSendBtn.disabled = false;
        fpSendBtn.textContent = 'Send Reset Link';
        fpEmail.value = '';
        fpSuccess.classList.remove('hidden');
      }, 1500);
    });

    fpEmail.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') fpSendBtn.click();
    });
  }

});
