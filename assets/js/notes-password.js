// Password protection for notes page
(function() {
  var prompts = window.PASSWORD_PROMPTS || [];
  var picked = prompts[Math.floor(Math.random() * prompts.length)];

  var form = document.getElementById('password-form');
  var input = document.getElementById('password-input');
  var errorMessage = document.getElementById('error-message');
  var promptEl = document.querySelector('.password-prompt');

  if (sessionStorage.getItem('notesAuthenticated') === 'true') {
    window.location.href = '/notes';
    return;
  }

  if (picked && promptEl) {
    promptEl.textContent = picked.question;
  }

  function sha256(str) {
    var encoded = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', encoded).then(function(buf) {
      return Array.from(new Uint8Array(buf))
        .map(function(b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var entered = input.value.trim().toLowerCase();

    sha256(entered).then(function(hash) {
      if (picked && hash === picked.answer) {
        sessionStorage.setItem('notesAuthenticated', 'true');
        window.location.href = '/notes';
      } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.style.display = 'block';
        input.value = '';
        input.focus();

        setTimeout(function() {
          errorMessage.style.display = 'none';
          errorMessage.textContent = '';
        }, 3000);
      }
    });
  });

  input.focus();
})();
