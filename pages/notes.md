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
      {% assign sorted_posts = site.data.blog_posts | sort: "date" | reverse %}
      {% for post in sorted_posts %}
        {% if post.disabled %}{% continue %}{% endif %}
        <div class="notes-item">
          <img src="{{ site.baseurl }}/assets/notes/images/{{ post.filename }}"
               alt="{{ post.title }}"
               class="notes-thumbnail gallery-thumbnail"
               data-type="image"
               data-full="{{ site.baseurl }}/assets/notes/images/{{ post.filename }}"
               data-description="{{ post.title }}"
               data-date="{{ post.date }}">
          <div class="notes-date" data-date="{{ post.date }}">{{ post.date }}</div>
        </div>
      {% endfor %}
    </div>

  </div>
</div>

<!-- Lightbox Modal -->
<div id="lightbox" class="lightbox">
  <span class="lightbox-close">&times;</span>
  <img class="lightbox-content" id="lightbox-img">
  <video class="lightbox-content" id="lightbox-video" controls playsinline></video>
  <div class="lightbox-caption" id="lightbox-caption"></div>
  <a class="lightbox-prev">&#10094;</a>
  <a class="lightbox-next">&#10095;</a>
</div>

<script src="{{ site.baseurl }}/assets/js/lightbox.js"></script>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    function formatDate(dateStr) {
      if (!dateStr) return '';
      var parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      var months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
      var month = months[parseInt(parts[1], 10) - 1];
      var day = parseInt(parts[2], 10);
      var year = parts[0];
      return month + ' ' + day + ', ' + year;
    }

    document.querySelectorAll('.notes-date').forEach(function(el) {
      el.textContent = formatDate(el.getAttribute('data-date'));
    });
  });
</script>
