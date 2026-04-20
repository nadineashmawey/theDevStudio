document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // Admin Dashboard Charts
  // =====================
  const userGrowthCanvas    = document.getElementById('userGrowthChart');
  const revenueGrowthCanvas = document.getElementById('revenueGrowthChart');
  const donutCanvas         = document.getElementById('donutChart');

  if (!userGrowthCanvas || !revenueGrowthCanvas || !donutCanvas) return;

  // Read colors from CSS variables
  const style      = getComputedStyle(document.documentElement);
  const PINK       = style.getPropertyValue('--pink').trim();
  const PINK_LIGHT = style.getPropertyValue('--pink-light').trim();
  const YELLOW     = style.getPropertyValue('--yellow').trim();
  const TEAL       = style.getPropertyValue('--teal').trim();
  const SURFACE    = style.getPropertyValue('--surface').trim();
  const MUTED      = style.getPropertyValue('--text-muted').trim();

  const months      = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const userData    = [36000, 42000, 45000, 46500, 47500, 50000];
  const revenueData = [175, 210, 235, 255, 280, 0]; // Jun has no data yet

  // ---- Helpers ----
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

  // ---- Line Chart: User Growth ----
  function drawUserGrowthChart() {
    const canvas  = userGrowthCanvas;
    const tooltip = document.getElementById('userTooltip');
    const ctx     = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height;
    const PAD = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartW = W - PAD.left - PAD.right;
    const chartH = H - PAD.top  - PAD.bottom;
    const maxVal = 60000;
    const yTicks = [0, 15000, 30000, 45000, 60000];

    function xPos(i)   { return PAD.left + (i / (months.length - 1)) * chartW; }
    function yPos(val) { return PAD.top  + chartH - (val / maxVal) * chartH; }

    function draw(hoverIdx = -1) {
      ctx.clearRect(0, 0, W, H);

      // Gridlines and Y labels
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
        ctx.fillText(t.toLocaleString(), PAD.left - 8, y + 4);
      });

      // X labels
      ctx.textAlign = 'center';
      months.forEach((m, i) => ctx.fillText(m, xPos(i), H - PAD.bottom + 18));

      // Gradient fill
      const grad = ctx.createLinearGradient(0, PAD.top, 0, H - PAD.bottom);
      grad.addColorStop(0, 'rgba(255,64,160,0.2)');
      grad.addColorStop(1, 'rgba(255,64,160,0)');
      ctx.beginPath();
      ctx.moveTo(xPos(0), yPos(userData[0]));
      userData.forEach((v, i) => { if (i > 0) ctx.lineTo(xPos(i), yPos(v)); });
      ctx.lineTo(xPos(userData.length - 1), H - PAD.bottom);
      ctx.lineTo(xPos(0), H - PAD.bottom);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Line
      ctx.beginPath();
      ctx.strokeStyle = PINK;
      ctx.lineWidth   = 2.5;
      ctx.lineJoin    = 'round';
      ctx.moveTo(xPos(0), yPos(userData[0]));
      userData.forEach((v, i) => { if (i > 0) ctx.lineTo(xPos(i), yPos(v)); });
      ctx.stroke();

      // Dots
      userData.forEach((v, i) => {
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
      const scaleY = canvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;

      let closest = -1, minDist = 40;
      months.forEach((_, i) => {
        const d = Math.abs(mouseX - xPos(i));
        if (d < minDist) { minDist = d; closest = i; }
      });

      draw(closest);
      if (closest >= 0) {
        showTooltip(
          tooltip,
          xPos(closest) / scaleX,
          yPos(userData[closest]) / scaleY,
          months[closest],
          `users : ${userData[closest].toLocaleString()}`,
          PINK
        );
      } else {
        hideTooltip(tooltip);
      }
    });

    canvas.addEventListener('mouseleave', () => { draw(); hideTooltip(tooltip); });
  }

  // ---- Bar Chart: Revenue Growth ----
  function drawRevenueGrowthChart() {
    const canvas  = revenueGrowthCanvas;
    const tooltip = document.getElementById('revenueTooltip');
    const ctx     = setupCanvas(canvas);
    const W = canvas.width, H = canvas.height;
    const PAD = { top: 20, right: 20, bottom: 40, left: 44 };
    const chartW = W - PAD.left - PAD.right;
    const chartH = H - PAD.top  - PAD.bottom;
    const maxVal = 280;
    const yTicks = [0, 70, 140, 210, 280];
    const barW   = (chartW / months.length) * 0.55;

    function xCenter(i) { return PAD.left + (i + 0.5) * (chartW / months.length); }
    function yPos(val)  { return PAD.top  + chartH - (val / maxVal) * chartH; }

    function draw(hoverIdx = -1) {
      ctx.clearRect(0, 0, W, H);

      // Gridlines and Y labels
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
      months.forEach((m, i) => ctx.fillText(m, xCenter(i), H - PAD.bottom + 18));

      // Bars — skip Jun (no data)
      revenueData.forEach((v, i) => {
        if (v === 0) return;
        const x    = xCenter(i) - barW / 2;
        const y    = yPos(v);
        const bH   = chartH - (y - PAD.top);
        const r    = 4;
        const isHov = i === hoverIdx;

        ctx.beginPath();
        ctx.fillStyle   = TEAL;
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
      const scaleY = canvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;

      let closest = -1, minDist = (chartW / months.length) / 2;
      revenueData.forEach((v, i) => {
        if (v === 0) return;
        const d = Math.abs(mouseX - xCenter(i));
        if (d < minDist) { minDist = d; closest = i; }
      });

      draw(closest);
      if (closest >= 0) {
        showTooltip(
          tooltip,
          xCenter(closest) / scaleX,
          yPos(revenueData[closest]) / scaleY,
          months[closest],
          `revenue : $${revenueData[closest]}K`,
          TEAL
        );
      } else {
        hideTooltip(tooltip);
      }
    });

    canvas.addEventListener('mouseleave', () => { draw(); hideTooltip(tooltip); });
  }

  // ---- Donut Chart: Course Categories ----
  function drawDonutChart() {
    const canvas  = donutCanvas;
    const tooltip = document.getElementById('donutTooltip');
    canvas.width  = 200;
    canvas.height = 200;
    const ctx         = canvas.getContext('2d');
    const cx          = 100, cy = 100;
    const radius      = 80;
    const innerRadius = 52;
    const gapAngle    = 0.04;

    const slices = [
      { label: 'Web Dev',      value: 30, color: PINK },
      { label: 'Data Science', value: 25, color: YELLOW },
      { label: 'Mobile',       value: 20, color: TEAL },
      { label: 'ML/AI',        value: 15, color: '#8B8BF5' },
      { label: 'Design',       value: 10, color: '#FFB7E6' },
    ];

    const total = slices.reduce((s, d) => s + d.value, 0);

    // Pre-calculate start/end angles for hit testing
    let angle = -Math.PI / 2;
    slices.forEach(slice => {
      slice.startAngle = angle;
      slice.sweepAngle = (slice.value / total) * Math.PI * 2 - gapAngle;
      slice.endAngle   = angle + slice.sweepAngle;
      angle += slice.sweepAngle + gapAngle;
    });

    function draw(hoverIdx = -1) {
      ctx.clearRect(0, 0, 200, 200);
      slices.forEach((slice, i) => {
        const isHover = i === hoverIdx;
        const r = isHover ? radius + 6 : radius;

        ctx.beginPath();
        ctx.moveTo(cx + innerRadius * Math.cos(slice.startAngle), cy + innerRadius * Math.sin(slice.startAngle));
        ctx.arc(cx, cy, r, slice.startAngle, slice.endAngle);
        ctx.arc(cx, cy, innerRadius, slice.endAngle, slice.startAngle, true);
        ctx.closePath();
        ctx.fillStyle   = slice.color;
        ctx.globalAlpha = isHover ? 1 : 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    draw();

    canvas.addEventListener('mousemove', (e) => {
      const rect  = canvas.getBoundingClientRect();
      const scaleX = canvas.width  / rect.width;
      const scaleY = canvas.height / rect.height;
      const mx    = (e.clientX - rect.left) * scaleX - cx;
      const my    = (e.clientY - rect.top)  * scaleY - cy;
      const dist  = Math.sqrt(mx * mx + my * my);

      if (dist < innerRadius || dist > radius + 8) {
        draw();
        hideTooltip(tooltip);
        return;
      }

      let angle = Math.atan2(my, mx);
      if (angle < -Math.PI / 2) angle += Math.PI * 2;

      let hoverIdx = -1;
      slices.forEach((slice, i) => {
        let start = slice.startAngle;
        let end   = slice.endAngle;
        if (start < -Math.PI / 2) { start += Math.PI * 2; end += Math.PI * 2; }
        if (angle >= start && angle <= end) hoverIdx = i;
      });

      draw(hoverIdx);

      if (hoverIdx >= 0) {
        const slice = slices[hoverIdx];
        tooltip.innerHTML = `${slice.label}<span style="color:${slice.color}">${slice.value}%</span>`;
        tooltip.classList.remove('hidden');
        tooltip.style.left = ((e.clientX - rect.left) + 12) + 'px';
        tooltip.style.top  = ((e.clientY - rect.top)  - 10) + 'px';
      } else {
        hideTooltip(tooltip);
      }
    });

    canvas.addEventListener('mouseleave', () => { draw(); hideTooltip(tooltip); });
  }

  // Init
  drawUserGrowthChart();
  drawRevenueGrowthChart();
  drawDonutChart();

  window.addEventListener('resize', () => {
    drawUserGrowthChart();
    drawRevenueGrowthChart();
  });

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
