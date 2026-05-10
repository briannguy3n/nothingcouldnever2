---
layout: no-header
title: Notes
permalink: /notes/post
---

<div class="notes-share-outer">
  <div class="notes-share-view" id="notes-share-view" style="display:none;"></div>
  <div class="notes-share-not-found" id="notes-share-not-found" style="display:none;">
    Link not found.
  </div>
</div>

<script>
  (function() {
    {% assign active_posts = site.data.blog_posts | where_exp: "item", "item.disabled != true" %}
    var posts = {{ active_posts | jsonify }};

    function formatDate(dateStr) {
      if (!dateStr) return '';
      var parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      var months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
      return months[parseInt(parts[1], 10) - 1] + ' ' + parseInt(parts[2], 10) + ', ' + parts[0];
    }

    document.addEventListener('DOMContentLoaded', function() {
      var params = new URLSearchParams(window.location.search);
      var token = params.get('token');
      var post = posts.find(function(p) { return p.share_token === token; });

      if (post) {
        var view = document.getElementById('notes-share-view');
        var img = document.createElement('img');
        img.src = '{{ site.baseurl }}/assets/notes/images/' + post.filename;
        img.alt = post.title || '';
        img.className = 'notes-share-image';

        var date = document.createElement('div');
        date.className = 'notes-share-date';
        date.textContent = formatDate(post.date);

        view.appendChild(img);
        view.appendChild(date);
        view.style.display = 'block';
      } else {
        document.getElementById('notes-share-not-found').style.display = 'block';
      }
    });
  })();
</script>
