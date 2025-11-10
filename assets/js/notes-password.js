// Password protection for notes page
(function() {
  const correctPassword = 'lancer';
  const form = document.getElementById('password-form');
  const input = document.getElementById('password-input');
  const errorMessage = document.getElementById('error-message');

  // Check if already authenticated
  if (sessionStorage.getItem('notesAuthenticated') === 'true') {
    window.location.href = '/notes';
    return;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const enteredPassword = input.value.trim().toLowerCase();
    
    if (enteredPassword === correctPassword) {
      // Set session flag
      sessionStorage.setItem('notesAuthenticated', 'true');
      // Redirect to notes page
      window.location.href = '/notes';
    } else {
      // Show error message
      errorMessage.textContent = 'Incorrect password. Please try again.';
      errorMessage.style.display = 'block';
      input.value = '';
      input.focus();
      
      // Clear error message after 3 seconds
      setTimeout(function() {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
      }, 3000);
    }
  });

  // Focus input on page load
  input.focus();
})();

