// Landing page interactive effects

// Flashing border effect when music link is clicked
document.addEventListener('DOMContentLoaded', function() {
  const musicLink = document.querySelector('.landing-link-music');
  const footer = document.querySelector('.footer');
  
  musicLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add the highlight class to the footer
    footer.classList.add('highlight');
    
    // On mobile, scroll to center the footer
    if (window.innerWidth <= 768) {
      const footerRect = footer.getBoundingClientRect();
      const footerTop = footerRect.top + window.pageYOffset;
      const footerHeight = footerRect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate position to center the footer
      const scrollToPosition = footerTop - (windowHeight / 2) + (footerHeight / 2);
      
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
    
    // Remove it after 4 seconds
    setTimeout(function() {
      footer.classList.remove('highlight');
    }, 4000);
  });
});

// Floating parallax/magnetic effect on landing links
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.landing-main-links-container a');
  const container = document.querySelector('.landing-main-links-container');
  
  container.addEventListener('mousemove', function(e) {
    links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const linkCenterX = rect.left + rect.width / 2;
      const linkCenterY = rect.top + rect.height / 2;
      
      // Calculate distance from cursor to link center
      const deltaX = e.clientX - linkCenterX;
      const deltaY = e.clientY - linkCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Magnetic effect radius (in pixels)
      const maxDistance = 200;
      
      if (distance < maxDistance) {
        // Calculate the strength of the effect (stronger when closer)
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = (deltaX / distance) * strength * 20;
        const moveY = (deltaY / distance) * strength * 20;
        
        // Get the original transform values
        const computedStyle = window.getComputedStyle(link);
        const transform = computedStyle.transform;
        
        // Extract original translateY value from the class
        let originalY = 0;
        if (link.classList.contains('landing-link-about')) originalY = 16; // 1rem = 16px
        if (link.classList.contains('landing-link-music')) originalY = -80; // -5rem
        if (link.classList.contains('landing-link-photos')) originalY = 128; // 8rem
        if (link.classList.contains('landing-link-notes')) originalY = -32; // -2rem
        
        // Apply the transform with original position + magnetic offset
        link.style.transform = `translate(${moveX}px, ${originalY + moveY}px)`;
      }
    });
  });
  
  container.addEventListener('mouseleave', function() {
    links.forEach(link => {
      // Reset to original position
      link.style.transform = '';
    });
  });
});

// Logo rotation effect (speeds up on window resize)
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.querySelector('.landing-logo');
  let currentRotation = 0;
  let rotationSpeed = 0.2; 
  let baseSpeed = 0.2;
  let fastSpeed = 2;
  let resizeTimeout = null;
  
  // Handle window resize - speed up rotation temporarily
  window.addEventListener('resize', function() {
    rotationSpeed = fastSpeed;
    
    // Reset to base speed after resize stops
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      rotationSpeed = baseSpeed;
    }, 500); // Return to slow speed 500ms after resize stops
  });
  
  // Continuous rotation animation
  function animate() {
    currentRotation += rotationSpeed;
    logo.style.transform = `rotate(${currentRotation}deg)`;
    requestAnimationFrame(animate);
  }
  
  // Start the animation
  animate();
});

// Under Construction Tooltip
document.addEventListener('DOMContentLoaded', function() {
  const tooltip = document.getElementById('construction-tooltip');
  const closeBtn = document.querySelector('.construction-close');
  const setsLink = document.querySelector('.landing-link-sets');
  const notesLink = document.querySelector('.landing-link-notes');
  
  // Show tooltip function positioned near the clicked link
  function showTooltip(e) {
    e.preventDefault();
    
    // Get the position of the clicked link
    const linkRect = e.target.getBoundingClientRect();
    
    // Position tooltip below the link
    const tooltipTop = linkRect.bottom + 15; // 15px below the link
    const tooltipLeft = linkRect.left + (linkRect.width / 2);
    
    // Set position
    tooltip.style.top = tooltipTop + 'px';
    tooltip.style.left = tooltipLeft + 'px';
    tooltip.style.transform = 'translateX(-50%) translateY(10px)';
    
    // Show tooltip
    tooltip.classList.add('show');
  }
  
  // Hide tooltip function
  function hideTooltip() {
    tooltip.classList.remove('show');
  }
  
  // Add click listeners to sets and notes links
  if (setsLink) {
    setsLink.addEventListener('click', showTooltip);
  }
  
  if (notesLink) {
    notesLink.addEventListener('click', showTooltip);
  }
  
  // Close button listener
  if (closeBtn) {
    closeBtn.addEventListener('click', hideTooltip);
  }
  
  // Close on clicking outside the tooltip
  document.addEventListener('click', function(e) {
    if (tooltip.classList.contains('show') && 
        !tooltip.contains(e.target) && 
        !setsLink.contains(e.target) && 
        !notesLink.contains(e.target)) {
      hideTooltip();
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && tooltip.classList.contains('show')) {
      hideTooltip();
    }
  });
});

