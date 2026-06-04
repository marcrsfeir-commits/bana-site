document.getElementById('year').textContent = new Date().getFullYear();

const backdropVideo = document.querySelector('.video-backdrop video');
if (backdropVideo) {
  const fadeDuration = 1.5;

  backdropVideo.addEventListener('timeupdate', () => {
    const remaining = backdropVideo.duration - backdropVideo.currentTime;
    if (remaining <= fadeDuration) {
      backdropVideo.style.opacity = (remaining / fadeDuration) * 0.25;
    }
  });

  backdropVideo.addEventListener('seeking', () => {
    if (backdropVideo.currentTime < fadeDuration) {
      backdropVideo.style.opacity = 0;
      setTimeout(() => {
        backdropVideo.style.transition = 'opacity 1.5s ease';
        backdropVideo.style.opacity = 0.25;
      }, 50);
    }
  });
}
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const duration = 600;
    let startTime = null;
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    function step(now) {
      if (startTime === null) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, start + (end - start) * ease(p));
      if (p < 1) requestAnimationFrame(step);
      else history.replaceState(null, '', '#' + id);
    }
    requestAnimationFrame(step);
  });
});
