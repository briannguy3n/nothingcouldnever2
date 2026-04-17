(function () {
  const modal = document.querySelector('.linktree-share');
  if (!modal) return;

  const dialog = modal.querySelector('.linktree-share__dialog');
  const imgEl = modal.querySelector('.linktree-share__image');
  const titleEl = modal.querySelector('.linktree-share__title');
  const urlEl = modal.querySelector('.linktree-share__url');
  const actionEls = modal.querySelectorAll('[data-share-action]');

  let lastFocused = null;
  let currentUrl = '';
  let currentTitle = '';

  function buildShareHref(action, url, title) {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(title);
    switch (action) {
      case 'x':         return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
      case 'facebook':  return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
      case 'whatsapp':  return `https://wa.me/?text=${t}%20${u}`;
      case 'messenger': return `https://www.facebook.com/dialog/send?link=${u}&app_id=291494419107518&redirect_uri=${u}`;
      case 'email':     return `mailto:?subject=${t}&body=${t}%20${u}`;
      default:          return '#';
    }
  }

  function prettyUrl(raw) {
    try {
      const u = new URL(raw);
      return (u.host + u.pathname).replace(/\/$/, '');
    } catch {
      return raw;
    }
  }

  function openModal(trigger) {
    currentUrl = trigger.dataset.url || '';
    currentTitle = trigger.dataset.title || '';
    const image = trigger.dataset.image || '';

    titleEl.textContent = currentTitle;
    urlEl.textContent = prettyUrl(currentUrl);

    if (image) {
      imgEl.src = image;
      imgEl.alt = currentTitle;
      imgEl.hidden = false;
    } else {
      imgEl.removeAttribute('src');
      imgEl.hidden = true;
    }

    actionEls.forEach((el) => {
      const action = el.dataset.shareAction;
      if (action === 'copy' || action === 'more') return;
      el.setAttribute('href', buildShareHref(action, currentUrl, currentTitle));
    });

    lastFocused = trigger;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const closeBtn = modal.querySelector('.linktree-share__close');
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeModal() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function showToast(message) {
    let toast = document.querySelector('.linktree-share__toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'linktree-share__toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 1800);
  }

  async function copyLink() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const tmp = document.createElement('textarea');
        tmp.value = currentUrl;
        tmp.setAttribute('readonly', '');
        tmp.style.position = 'absolute';
        tmp.style.left = '-9999px';
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
      }
      showToast('Link copied');
    } catch {
      showToast('Copy failed');
    }
  }

  const moreBtn = modal.querySelector('[data-share-action="more"]');
  if (moreBtn && typeof navigator.share === 'function') {
    moreBtn.hidden = false;
    moreBtn.addEventListener('click', async () => {
      try {
        await navigator.share({ title: currentTitle, url: currentUrl });
      } catch {
        // user cancelled or share failed — no-op
      }
    });
  }

  document.querySelectorAll('[data-share-trigger]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal(btn);
    });
  });

  modal.querySelectorAll('[data-share-close]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  dialog.addEventListener('click', (e) => e.stopPropagation());

  actionEls.forEach((el) => {
    el.addEventListener('click', (e) => {
      const action = el.dataset.shareAction;
      if (action === 'copy') {
        e.preventDefault();
        copyLink();
      }
    });
  });
})();
