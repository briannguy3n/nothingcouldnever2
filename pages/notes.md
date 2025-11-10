---
layout: no-header
title: Notes
permalink: /notes
---

<script>
  // Check if user is authenticated
  (function() {
    if (sessionStorage.getItem('notesAuthenticated') !== 'true') {
      window.location.href = '/notes-password';
    }
  })();
</script>

<div class="notes-page-outer">
  <div class="notes-page-inner">
    <h2 class="notes-page-title">Notes</h2>
    <!-- Add your notes content here -->
  </div>
</div>
