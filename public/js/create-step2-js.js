// ── ADD LEARNING OUTCOME ──
document.getElementById('add-outcome').addEventListener('click', () => {
  const list = document.getElementById('outcomes-list');
  const item = document.createElement('div');
  item.className = 'outcome-item';
  item.innerHTML = `
    <input type="text" class="form-input" placeholder="e.g., Build responsive websites"/>
    <button class="btn-remove"><i class="fa-solid fa-xmark"></i></button>
  `;
  // remove button for new item
  item.querySelector('.btn-remove').addEventListener('click', () => {
    const items = document.querySelectorAll('.outcome-item');
    if (items.length > 1) {
      item.remove();
    }
  });
  list.appendChild(item);

  // focus the new input
  item.querySelector('.form-input').focus();
});

// remove button for first outcome
document.querySelector('.outcome-item .btn-remove').addEventListener('click', function () {
  const items = document.querySelectorAll('.outcome-item');
  if (items.length > 1) {
    this.closest('.outcome-item').remove();
  }
});

// ── ADD LESSON inside a section ──
function addLessonToSection(section) {
  const addLessonBtn = section.querySelector('.btn-add');
  const lessonInput = document.createElement('div');
  lessonInput.className = 'form-group lesson-item';
  lessonInput.innerHTML = `
    <div class="outcome-item">
      <input type="text" class="form-input" placeholder="Lesson title"/>
      <button class="btn-remove"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;
  // remove lesson
  lessonInput.querySelector('.btn-remove').addEventListener('click', () => {
    lessonInput.remove();
  });
  section.insertBefore(lessonInput, addLessonBtn);
  lessonInput.querySelector('.form-input').focus();
}

// attach add lesson to first section
document.querySelector('.section-card .btn-add').addEventListener('click', function () {
  addLessonToSection(this.closest('.section-card'));
});

// ── ADD SECTION ──
document.getElementById('add-section').addEventListener('click', () => {
  const list = document.getElementById('sections-list');
  const card = document.createElement('div');
  card.className = 'section-card';
  card.innerHTML = `
    <div class="form-group">
      <input type="text" class="form-input" placeholder="Section title"/>
    </div>
    <div class="form-group">
      <input type="text" class="form-input" placeholder="Lesson title"/>
    </div>
    <button class="btn-add">
      <i class="fa-solid fa-plus"></i> Add Lesson
    </button>
  `;
  // add lesson button for new section
  card.querySelector('.btn-add').addEventListener('click', function () {
    addLessonToSection(card);
  });
  list.appendChild(card);

  // focus section title
  card.querySelector('.form-input').focus();
});

// ── BACK BUTTON ──
document.querySelector('.btn-back').addEventListener('click', () => {
  window.location.href = 'create-step1.html';
});

// ── NEXT BUTTON — validate + go to step 3 ──
document.querySelector('.btn-enroll').addEventListener('click', () => {
  let valid = true;
  const nextBtn = document.querySelector('.btn-enroll');

  // check at least one outcome is filled
  const outcomes = document.querySelectorAll('.outcome-item .form-input');
  outcomes.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'var(--pink)';
      input.style.boxShadow = '0 0 0 3px rgba(255,64,160,0.2)';
      valid = false;
    } else {
      input.style.borderColor = 'var(--border)';
      input.style.boxShadow = 'none';
    }
  });

  // check all section titles are filled
  const sectionTitles = document.querySelectorAll('.section-card .form-group:first-child .form-input');
  sectionTitles.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'var(--pink)';
      input.style.boxShadow = '0 0 0 3px rgba(255,64,160,0.2)';
      valid = false;
    } else {
      input.style.borderColor = 'var(--border)';
      input.style.boxShadow = 'none';
    }
  });

  if (!valid) {
    // shake button
    nextBtn.style.transform = 'translateX(-6px)';
    setTimeout(() => nextBtn.style.transform = 'translateX(6px)', 100);
    setTimeout(() => nextBtn.style.transform = 'translateX(0)', 200);
    return;
  }

  // ✅ all good — go to step 3
  window.location.href = 'create-step3.html';
});

// ── CLEAR ERRORS ON TYPING ──
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('form-input')) {
    e.target.style.borderColor = 'var(--border)';
    e.target.style.boxShadow = 'none';
  }
});