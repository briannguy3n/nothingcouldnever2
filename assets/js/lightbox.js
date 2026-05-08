// Lightbox functionality
(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  const thumbnails = Array.from(document.querySelectorAll('.gallery-thumbnail'));
  let currentIndex = 0;

  // Open lightbox
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      currentIndex = index;
      showItem(currentIndex);
      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  function clearVideo() {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    while (lightboxVideo.firstChild) lightboxVideo.removeChild(lightboxVideo.firstChild);
    lightboxVideo.load();
  }

  // Show item at specific index (image or video)
  function showItem(index) {
    if (index < 0) index = thumbnails.length - 1;
    if (index >= thumbnails.length) index = 0;
    currentIndex = index;

    const thumbnail = thumbnails[currentIndex];
    const type = thumbnail.dataset.type || 'image';
    const src = thumbnail.dataset.full;

    if (type === 'video') {
      lightboxImg.style.display = 'none';
      lightboxImg.src = '';
      clearVideo();
      const source = document.createElement('source');
      source.src = src;
      source.type = thumbnail.dataset.mime || 'video/mp4';
      lightboxVideo.appendChild(source);
      lightboxVideo.style.display = 'block';
      lightboxVideo.load();
      lightboxVideo.play().catch(() => { /* autoplay may be blocked; controls still work */ });
    } else {
      clearVideo();
      lightboxVideo.style.display = 'none';
      lightboxImg.src = src;
      lightboxImg.style.display = 'block';
    }

    const description = thumbnail.dataset.description;
    if (description && description !== '') {
      lightboxCaption.textContent = description;
      lightboxCaption.style.display = 'block';
    } else {
      lightboxCaption.style.display = 'none';
    }
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    clearVideo();
    lightboxImg.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  // Close on overlay click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showItem(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showItem(currentIndex + 1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'block') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showItem(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showItem(currentIndex + 1);
      }
    }
  });
})();
