document.addEventListener('DOMContentLoaded', () => {

  // Animate progress bars on load
  const bars = document.querySelectorAll('.progress-bar');
  bars.forEach(bar => {
    const targetWidth = bar.dataset.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = targetWidth + '%';
    }, 200);
  });

  // Continue button click handler
  document.querySelectorAll('.btn-continue').forEach(btn => {
    btn.addEventListener('click', e => {
      const card  = e.target.closest('.course-progress-card');
      const title = card?.querySelector('.course-progress-title')?.textContent;
      console.log(`Continue: ${title}`);
    });
  });

});