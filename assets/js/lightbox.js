// Lightbox functionality
(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
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
      showImage(currentIndex);
      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Show image at specific index
  function showImage(index) {
    if (index < 0) index = thumbnails.length - 1;
    if (index >= thumbnails.length) index = 0;
    currentIndex = index;
    
    const thumbnail = thumbnails[currentIndex];
    lightboxImg.src = thumbnail.dataset.full;
    
    // Only show caption if there's a description
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
    showImage(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'block') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showImage(currentIndex + 1);
      }
    }
  });
})();

