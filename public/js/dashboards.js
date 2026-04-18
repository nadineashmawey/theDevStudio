
document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // All Courses Page
  // =====================
  const searchInput  = document.getElementById('searchInput');
  const categoryBtns = document.querySelectorAll('.filter-btn-category');
  const levelBtns    = document.querySelectorAll('.filter-btn-level');
  const courseCards  = document.querySelectorAll('.course-card');
  const showingCount = document.getElementById('showingCount');
  const noResults    = document.getElementById('noResults');

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
  // Instructor Dashboard Charts
  // =====================
  const enrollCanvas  = document.getElementById('enrollmentsChart');
  const revenueCanvas = document.getElementById('revenueChart');

  if (enrollCanvas && revenueCanvas) {

    // Read colors from CSS variables so they stay in sync with the stylesheet
    const style     = getComputedStyle(document.documentElement);
    const PINK      = style.getPropertyValue('--pink').trim();
    const PINK_LIGHT = style.getPropertyValue('--pink-light').trim();
    const YELLOW    = style.getPropertyValue('--yellow').trim();
    const SURFACE   = style.getPropertyValue('--surface').trim();
    const MUTED     = style.getPropertyValue('--text-muted').trim();

    const months      = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const enrollData  = [120, 175, 245, 220, 265, 320];
    const revenueData = [4200, 7200, 9500, 8800, 11200, 13800];

    function setupCanvas(canvas) {
      const wrapper  = canvas.parentElement;
      canvas.width   = wrapper.offsetWidth;
      canvas.height  = wrapper.offsetHeight;
      return canvas.getContext('2d');
    }

    function showTooltip(tooltip, x, y, month, value, valueColor) {
      tooltip.innerHTML = `${month}<span style="color:${valueColor}">${value}</span>`;
      tooltip.classList.remove('hidden');
      tooltip.style.left = (x + 14) + 'px';
      tooltip.style.top  = (y - 10) + 'px';
    }

    function hideTooltip(tooltip) {
      tooltip.classList.add('hidden');
    }

    // ---- Line Chart: Student Enrollments ----
    function drawLineChart() {
      const canvas  = enrollCanvas;
      const tooltip = document.getElementById('enrollTooltip');
      const ctx     = setupCanvas(canvas);
      const W = canvas.width;
      const H = canvas.height;
      const PAD = { top: 20, right: 20, bottom: 40, left: 44 };
      const chartW = W - PAD.left - PAD.right;
      const chartH = H - PAD.top  - PAD.bottom;
      const maxVal = 360;

      function xPos(i)   { return PAD.left + (i / (months.length - 1)) * chartW; }
      function yPos(val) { return PAD.top  + chartH - (val / maxVal) * chartH; }

      function draw(hoverIdx = -1) {
        ctx.clearRect(0, 0, W, H);

        // Gridlines and Y labels
        const yTicks = [0, 80, 160, 240, 320];
        ctx.font      = '11px Inter, sans-serif';
        ctx.fillStyle = MUTED;
        ctx.textAlign = 'right';
        yTicks.forEach(t => {
          const y = yPos(t);
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255,255,255,0.06)';
          ctx.lineWidth   = 1;
          ctx.moveTo(PAD.left, y);
          ctx.lineTo(W - PAD.right, y);
          ctx.stroke();
          ctx.fillText(t, PAD.left - 6, y + 4);
        });

        // X labels
        ctx.textAlign = 'center';
        months.forEach((m, i) => ctx.fillText(m, xPos(i), H - PAD.bottom + 18));

        // Gradient fill under line
        const grad = ctx.createLinearGradient(0, PAD.top, 0, H - PAD.bottom);
        grad.addColorStop(0, 'rgba(255,64,160,0.25)');
        grad.addColorStop(1, 'rgba(255,64,160,0)');
        ctx.beginPath();
        ctx.moveTo(xPos(0), yPos(enrollData[0]));
        enrollData.forEach((v, i) => { if (i > 0) ctx.lineTo(xPos(i), yPos(v)); });
        ctx.lineTo(xPos(enrollData.length - 1), H - PAD.bottom);
        ctx.lineTo(xPos(0), H - PAD.bottom);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Line
        ctx.beginPath();
        ctx.strokeStyle = PINK;
        ctx.lineWidth   = 2.5;
        ctx.lineJoin    = 'round';
        ctx.moveTo(xPos(0), yPos(enrollData[0]));
        enrollData.forEach((v, i) => { if (i > 0) ctx.lineTo(xPos(i), yPos(v)); });
        ctx.stroke();

        // Dots
        enrollData.forEach((v, i) => {
          const isHover = i === hoverIdx;
          ctx.beginPath();
          ctx.arc(xPos(i), yPos(v), isHover ? 7 : 5, 0, Math.PI * 2);
          ctx.fillStyle   = isHover ? PINK_LIGHT : PINK;
          ctx.strokeStyle = SURFACE;
          ctx.lineWidth   = 2;
          ctx.fill();
          ctx.stroke();
        });

        // Dashed vertical line on hover
        if (hoverIdx >= 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.lineWidth   = 1;
          ctx.setLineDash([4, 4]);
          ctx.moveTo(xPos(hoverIdx), PAD.top);
          ctx.lineTo(xPos(hoverIdx), H - PAD.bottom);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      draw();

      canvas.addEventListener('mousemove', (e) => {
        const rect   = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const mouseX = (e.clientX - rect.left) * scaleX;

        let closest = -1, minDist = 40;
        months.forEach((_, i) => {
          const d = Math.abs(mouseX - xPos(i));
          if (d < minDist) { minDist = d; closest = i; }
        });

        draw(closest);
        if (closest >= 0) {
          showTooltip(tooltip, xPos(closest) / scaleX, yPos(enrollData[closest]) / (canvas.height / rect.height),
            months[closest], `students : ${enrollData[closest]}`, PINK);
        } else {
          hideTooltip(tooltip);
        }
      });

      canvas.addEventListener('mouseleave', () => { draw(); hideTooltip(tooltip); });
    }

    // ---- Bar Chart: Monthly Revenue ----
    function drawBarChart() {
      const canvas  = revenueCanvas;
      const tooltip = document.getElementById('revenueTooltip');
      const ctx     = setupCanvas(canvas);
      const W = canvas.width;
      const H = canvas.height;
      const PAD = { top: 20, right: 20, bottom: 40, left: 56 };
      const chartW = W - PAD.left - PAD.right;
      const chartH = H - PAD.top  - PAD.bottom;
      const maxVal = 14000;
      const yTicks = [0, 3500, 7000, 10500, 14000];
      const barW   = (chartW / months.length) * 0.55;

      function xCenter(i) { return PAD.left + (i + 0.5) * (chartW / months.length); }
      function yPos(val)  { return PAD.top  + chartH - (val / maxVal) * chartH; }

      function draw(hoverIdx = -1) {
        ctx.clearRect(0, 0, W, H);

        // Gridlines and Y labels
        ctx.font      = '11px Inter, sans-serif';
        ctx.fillStyle = YELLOW;
        ctx.textAlign = 'right';
        yTicks.forEach(t => {
          const y = yPos(t);
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255,255,255,0.06)';
          ctx.lineWidth   = 1;
          ctx.moveTo(PAD.left, y);
          ctx.lineTo(W - PAD.right, y);
          ctx.stroke();
          ctx.fillText(t.toLocaleString(), PAD.left - 6, y + 4);
        });

        // X labels
        ctx.textAlign = 'center';
        months.forEach((m, i) => ctx.fillText(m, xCenter(i), H - PAD.bottom + 18));

        // Bars with rounded tops
        revenueData.forEach((v, i) => {
          const x    = xCenter(i) - barW / 2;
          const y    = yPos(v);
          const bH   = chartH - (y - PAD.top);
          const r    = 4;
          const isHov = i === hoverIdx;

          ctx.beginPath();
          ctx.fillStyle   = YELLOW;
          ctx.globalAlpha = isHov ? 0.5 : 0.85;
          ctx.moveTo(x + r, y);
          ctx.lineTo(x + barW - r, y);
          ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
          ctx.lineTo(x + barW, y + bH);
          ctx.lineTo(x, y + bH);
          ctx.lineTo(x, y + r);
          ctx.quadraticCurveTo(x, y, x + r, y);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      }

      draw();

      canvas.addEventListener('mousemove', (e) => {
        const rect   = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const mouseX = (e.clientX - rect.left) * scaleX;

        let closest = -1, minDist = (chartW / months.length) / 2;
        months.forEach((_, i) => {
          const d = Math.abs(mouseX - xCenter(i));
          if (d < minDist) { minDist = d; closest = i; }
        });

        draw(closest);
        if (closest >= 0) {
          showTooltip(tooltip, xCenter(closest) / scaleX, yPos(revenueData[closest]) / (canvas.height / rect.height),
            months[closest], `revenue : ${revenueData[closest].toLocaleString()}`, YELLOW);
        } else {
          hideTooltip(tooltip);
        }
      });

      canvas.addEventListener('mouseleave', () => { draw(); hideTooltip(tooltip); });
    }

    drawLineChart();
    drawBarChart();

    window.addEventListener('resize', () => {
      drawLineChart();
      drawBarChart();
    });
  }

});
