document.getElementById('year').textContent = new Date().getFullYear();

// Smooth loop for backdrop video — fade out near end, fade in at start
const backdropVideo = document.querySelector('.video-backdrop video');
if (backdropVideo) {
  const fadeDuration = 1.5; // seconds to fade

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

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
