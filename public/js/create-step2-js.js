
    // Add learning outcome
    document.getElementById('add-outcome').addEventListener('click', () => {
      const list = document.getElementById('outcomes-list');
      const item = document.createElement('div');
      item.className = 'outcome-item';
      item.innerHTML = `
        <input type="text" class="form-input" placeholder="e.g., Build responsive websites"/>
        <button class="btn-remove"><i class="fa-solid fa-xmark"></i></button>
      `;
      item.querySelector('.btn-remove').addEventListener('click', () => item.remove());
      list.appendChild(item);
    });

    // Remove first outcome
    document.querySelector('.btn-remove').addEventListener('click', function() {
      const items = document.querySelectorAll('.outcome-item');
      if (items.length > 1) this.closest('.outcome-item').remove();
    });

    // Add section
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
        <button class="btn-add add-lesson-btn">
          <i class="fa-solid fa-plus"></i> Add Lesson
        </button>
      `;
      // Add lesson inside section
      card.querySelector('.add-lesson-btn').addEventListener('click', () => {
        const lessonInput = document.createElement('div');
        lessonInput.className = 'form-group';
        lessonInput.innerHTML = `<input type="text" class="form-input" placeholder="Lesson title"/>`;
        card.insertBefore(lessonInput, card.querySelector('.add-lesson-btn'));
      });
      list.appendChild(card);
    });

    // Add lesson in first section
    document.querySelector('.section-card .btn-add').addEventListener('click', function() {
      const card = this.closest('.section-card');
      const lessonInput = document.createElement('div');
      lessonInput.className = 'form-group';
      lessonInput.innerHTML = `<input type="text" class="form-input" placeholder="Lesson title"/>`;
      card.insertBefore(lessonInput, this);
    });
  