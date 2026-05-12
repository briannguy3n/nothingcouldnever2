---
layout: no-header
title: Notes
permalink: /notes
---

<script>
  (function() {
    if (sessionStorage.getItem('notesAuthenticated') !== 'true') {
      window.location.href = '/notes-password';
    }
  })();
</script>

<div class="notes-page-outer">
  <div class="notes-page-inner">

    <div class="notes-grid">
      {% assign all_notes = site.pages | where: "layout", "note-share" %}
      {% assign sorted_notes = all_notes | sort: "date" | reverse %}
      {% for note in sorted_notes %}
        <div class="notes-item">
          <img src="{{ site.baseurl }}/assets/notes/images/{{ note.filename }}"
               alt="{{ note.caption }}"
               class="notes-thumbnail gallery-thumbnail"
               data-type="image"
               data-full="{{ site.baseurl }}/assets/notes/images/{{ note.filename }}"
               data-description="{{ note.caption }}"
               data-share-token="{{ note.token }}">
          <div class="notes-date">{{ note.date | date: "%B %-d, %Y" }}</div>
        </div>
      {% endfor %}
    </div>

    <a href="{{ site.baseurl }}/personal"
       class="notes-back-link"
       aria-label="Back to personal">←</a>

  </div>
</div>

<!-- Lightbox Modal -->
<div id="lightbox" class="lightbox notes-lightbox">
  <span class="lightbox-close">&times;</span>
  <img class="lightbox-content" id="lightbox-img">
  <video class="lightbox-content" id="lightbox-video" controls playsinline></video>
  <div class="lightbox-caption" id="lightbox-caption"></div>
</div>

<script src="{{ site.baseurl }}/assets/js/notes-lightbox.js"></script>
