---
layout: no-header
title: Notes
permalink: /notes-password
---

<!-- Password validation and redirect to /notes is handled in notes-password.js -->
<div class="notes-password-page">
  <div class="password-container">
    <h2 class="password-title">Protected Content</h2>
    <p class="password-prompt">what was the first car I owned</p>
    <form id="password-form" class="password-form">
      <input 
        type="password" 
        id="password-input" 
        class="password-input" 
        placeholder="Enter password"
        autocomplete="off"
      />
      <button type="submit" class="password-submit">Enter</button>
      <p id="error-message" class="error-message"></p>
    </form>
  </div>
</div>

<script src="{{ '/assets/js/notes-password.js' | relative_url }}"></script>

