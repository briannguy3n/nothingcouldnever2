// Floating parallax/magnetic effect on chooser buttons
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.chooser-container a');
  const container = document.querySelector('.chooser-container');

  if (!container || links.length === 0) return;

  container.addEventListener('mousemove', function(e) {
    links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const linkCenterX = rect.left + rect.width / 2;
      const linkCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - linkCenterX;
      const deltaY = e.clientY - linkCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = 200;

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = (deltaX / distance) * strength * 20;
        const moveY = (deltaY / distance) * strength * 20;
        link.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        link.style.transform = '';
      }
    });
  });

  container.addEventListener('mouseleave', function() {
    links.forEach(link => {
      link.style.transform = '';
    });
  });
});
