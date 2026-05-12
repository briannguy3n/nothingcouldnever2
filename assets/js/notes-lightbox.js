// Notes-only lightbox: opens a single post, updates URL to /notes/<token>/,
// closes on overlay/close/Escape/browser-back. No prev/next navigation.
(function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  const thumbnails = Array.from(document.querySelectorAll('.gallery-thumbnail'));
  let isOpen = false;

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      openLightbox(index, { pushHistory: true });
    });
  });

  function clearVideo() {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    while (lightboxVideo.firstChild) lightboxVideo.removeChild(lightboxVideo.firstChild);
    lightboxVideo.load();
  }

  function showItem(index) {
    const thumbnail = thumbnails[index];
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

  function openLightbox(index, opts) {
    showItem(index);
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    isOpen = true;

    if (opts && opts.pushHistory) {
      const token = thumbnails[index].dataset.shareToken;
      if (token) {
        history.pushState({ notesLightbox: true }, '', '/notes/' + token + '/');
      }
    }
  }

  function closeLightbox(opts) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    clearVideo();
    lightboxImg.src = '';
    isOpen = false;

    if (opts && opts.restoreUrl && /^\/notes\/[^\/]+\/?$/.test(location.pathname)) {
      history.replaceState(null, '', '/notes');
    }
  }

  closeBtn.addEventListener('click', function() {
    closeLightbox({ restoreUrl: true });
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox({ restoreUrl: true });
    }
  });

  window.addEventListener('popstate', function() {
    if (isOpen) {
      closeLightbox({ restoreUrl: false });
    }
  });

  document.addEventListener('keydown', function(e) {
    if (isOpen && e.key === 'Escape') {
      closeLightbox({ restoreUrl: true });
    }
  });
})();
