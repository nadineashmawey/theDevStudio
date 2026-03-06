document.addEventListener('DOMContentLoaded', () => {

  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 200);
  });
  document.querySelectorAll('.btn-continue').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card  = e.target.closest('.course-progress-card');
      const title = card?.querySelector('.course-progress-title')?.textContent;
      console.log(`Continue: ${title}`);
    });
  });

});
