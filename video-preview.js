// This script creates a modal video preview on page load with draggable floating preview
window.addEventListener('DOMContentLoaded', function () {
  // Detect mobile device
  const isMobile = () => window.innerWidth < 768;
  const isTouch = () => () => ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // Check if video preview has been shown in this session
  const videoShown = sessionStorage.getItem('videoPreviewShown') === '1';

  // Create the show video button first (always create it)
  const showVideoBtn = document.createElement('button');
  showVideoBtn.setAttribute('aria-label', 'Show video preview');
  showVideoBtn.style.position = 'fixed';
  showVideoBtn.style.bottom = '104px';
  showVideoBtn.style.right = '32px';
  showVideoBtn.style.width = '56px';
  showVideoBtn.style.height = '56px';
  showVideoBtn.style.borderRadius = '50%';
  showVideoBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
  showVideoBtn.style.boxShadow = '4px 4px 16px #c8e0de, -4px -4px 16px #ffffff, 0 2px 8px rgba(54,214,204,0.10)';
  showVideoBtn.style.border = 'none';
  showVideoBtn.style.color = '#0e3c39';
  showVideoBtn.style.cursor = 'pointer';
  showVideoBtn.style.zIndex = '9999';
  showVideoBtn.style.display = 'flex';
  showVideoBtn.style.alignItems = 'center';
  showVideoBtn.style.justifyContent = 'center';
  showVideoBtn.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease, color 0.3s ease';
  showVideoBtn.innerHTML = '<span class="material-icons" style="font-size:1.7rem;vertical-align:middle;">play_arrow</span>';
  showVideoBtn.style.display = videoShown ? 'flex' : 'none';

  showVideoBtn.addEventListener('mouseenter', () => {
    showVideoBtn.style.transform = 'scale(1.12) translateY(-6px)';
    showVideoBtn.style.background = 'linear-gradient(145deg, #d0f3f0 0%, #f0fffe 100%)';
    showVideoBtn.style.boxShadow = '6px 8px 24px rgba(54, 214, 204, 0.25), -4px -4px 16px #ffffff, 0 8px 20px rgba(54, 214, 204, 0.15)';
    showVideoBtn.style.color = '#36d6cc';
  });

  showVideoBtn.addEventListener('mouseleave', () => {
    showVideoBtn.style.transform = 'scale(1)';
    showVideoBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
    showVideoBtn.style.boxShadow = '4px 4px 16px #c8e0de, -4px -4px 16px #ffffff, 0 2px 8px rgba(54,214,204,0.10)';
    showVideoBtn.style.color = '#0e3c39';
  });

  showVideoBtn.addEventListener('touchstart', () => {
    showVideoBtn.style.transform = 'scale(1.08) translateY(-3px)';
    showVideoBtn.style.background = 'linear-gradient(145deg, #d0f3f0 0%, #f0fffe 100%)';
  });

  showVideoBtn.addEventListener('touchend', () => {
    showVideoBtn.style.transform = 'scale(1)';
    showVideoBtn.style.background = 'linear-gradient(145deg, #e6f7f6 0%, #ffffff 100%)';
  });

  // Set up click handler that will work even after page reload
  let overlay, modal, closeBtn, video, title;

  // Create options menu
  const optionsMenu = document.createElement('div');
  optionsMenu.style.position = 'fixed';
  optionsMenu.style.bottom = '170px';
  optionsMenu.style.right = '32px';
  optionsMenu.style.background = '#ffffff';
  optionsMenu.style.borderRadius = '12px';
  optionsMenu.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
  optionsMenu.style.padding = '8px 0';
  optionsMenu.style.display = 'none';
  optionsMenu.style.flexDirection = 'column';
  optionsMenu.style.zIndex = '9998';
  optionsMenu.style.minWidth = '240px';
  optionsMenu.style.opacity = '0';
  optionsMenu.style.transform = 'translateY(10px)';
  optionsMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  const createOptionBtn = (text) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.padding = '12px 20px';
    btn.style.textAlign = 'left';
    btn.style.width = '100%';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '0.95rem';
    btn.style.color = '#0e3c39';
    btn.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    btn.style.transition = 'background 0.2s';
    btn.addEventListener('mouseenter', () => btn.style.background = '#f0f9f8');
    btn.addEventListener('mouseleave', () => btn.style.background = 'none');
    return btn;
  };

  const optionWifi = createOptionBtn('How to Change Wifi Password');
  const optionS2S = createOptionBtn('How to Load S2S Converge');

  optionsMenu.appendChild(optionWifi);
  optionsMenu.appendChild(optionS2S);
  document.body.appendChild(optionsMenu);

  let isMenuOpen = false;

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      optionsMenu.style.display = 'flex';
      void optionsMenu.offsetWidth; // trigger reflow
      optionsMenu.style.opacity = '1';
      optionsMenu.style.transform = 'translateY(0)';
    } else {
      optionsMenu.style.opacity = '0';
      optionsMenu.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (!isMenuOpen) optionsMenu.style.display = 'none';
      }, 300);
    }
  };

  document.addEventListener('click', (e) => {
    if (isMenuOpen && !optionsMenu.contains(e.target) && !showVideoBtn.contains(e.target)) {
      isMenuOpen = false;
      optionsMenu.style.opacity = '0';
      optionsMenu.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (!isMenuOpen) optionsMenu.style.display = 'none';
      }, 300);
    }
  });

  showVideoBtn.onclick = toggleMenu;

  const playVideo = (type) => {
    isMenuOpen = false;
    optionsMenu.style.opacity = '0';
    optionsMenu.style.transform = 'translateY(10px)';
    setTimeout(() => {
      optionsMenu.style.display = 'none';
    }, 300);

    if (type === 'wifi') {
      video.src = 'assets/resetpass.mp4';
      title.textContent = 'How to Change Wifi Password';
    } else {
      video.src = '';
      title.textContent = 'S2S Converge Loading Tutorial!';
    }

    // Reset overlay to show video modal
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.pointerEvents = 'auto';
    overlay.style.display = 'flex';

    // Reset modal to center position
    modal.style.position = 'relative';
    modal.style.width = isMobile() ? '100%' : '720px';
    modal.style.maxWidth = isMobile() ? '95vw' : '90vw';
    modal.style.bottom = 'auto';
    modal.style.right = 'auto';
    modal.style.left = 'auto';
    modal.style.borderRadius = '18px';
    modal.style.padding = isMobile() ? '16px' : '24px';
    modal.style.maxHeight = 'auto';
    modal.style.zIndex = '10000';
    modal.style.display = 'flex';

    // Reset video styles
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.maxHeight = '75vh';

    // Reset title styles
    title.style.fontSize = isMobile() ? '1rem' : '1.2rem';
    title.style.margin = isMobile() ? '0 0 8px 0' : '0 0 12px 0';

    showVideoBtn.style.display = 'none';

    // Clean up any drag headers created by floating mode
    const dragHeaders = modal.querySelectorAll('.drag-header');
    dragHeaders.forEach(header => header.remove());

    video.play();
  };

  window.playVideo = playVideo;

  optionWifi.onclick = () => playVideo('wifi');
  optionS2S.onclick = () => playVideo('s2s');

  document.body.appendChild(showVideoBtn);

  sessionStorage.setItem('videoPreviewShown', '1');

  // Create overlay (always create it so click handler can use it)
  overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.7)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.padding = '10px';

  // Create modal
  modal = document.createElement('div');
  modal.style.background = '#fff';
  modal.style.borderRadius = '18px';
  modal.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
  modal.style.maxWidth = isMobile() ? '95vw' : '90vw';
  modal.style.width = isMobile() ? '100%' : '720px';
  modal.style.padding = isMobile() ? '16px' : '24px';
  modal.style.position = 'relative';
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  modal.style.alignItems = 'center';

  // Close button
  closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.setAttribute('aria-label', 'Close video preview');
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = isMobile() ? '8px' : '10px';
  closeBtn.style.right = isMobile() ? '12px' : '18px';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.fontSize = isMobile() ? '1.5rem' : '2rem';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.color = '#0e3c39';
  closeBtn.style.padding = '4px';

  // Video element
  video = document.createElement('video');
  video.src = ''; // Place your video in assets/hero.mp4
  video.controls = true;
  video.autoplay = !videoShown;
  video.style.width = '100%';
  video.style.borderRadius = '12px';
  video.style.background = '#000';
  video.style.maxHeight = '75vh';

  // Title
  title = document.createElement('h3');
  title.textContent = 'S2S Converge Loading Tutorial!';
  title.style.margin = isMobile() ? '0 0 8px 0' : '0 0 12px 0';
  title.style.fontFamily = 'Segoe UI, Arial, sans-serif';
  title.style.fontWeight = '700';
  title.style.fontSize = isMobile() ? '1rem' : '1.2rem';
  title.style.color = '#0e3c39';

  modal.appendChild(closeBtn);
  modal.appendChild(title);
  modal.appendChild(video);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // If video already shown in this session, hide the overlay initially
  if (videoShown) {
    overlay.style.display = 'none';
  }

  // Close on overlay click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) convertToFloating();
  });

  // Convert modal to floating draggable preview
  function convertToFloating() {
    const mobile = isMobile();

    // For mobile, show as draggable floating overlay
    if (mobile) {
      overlay.style.background = 'none';
      overlay.style.alignItems = 'flex-end';
      overlay.style.justifyContent = 'flex-end';
      overlay.style.pointerEvents = 'none';

      // Convert modal to floating window
      modal.style.position = 'fixed';
      modal.style.width = '85vw';
      modal.style.maxWidth = '85vw';
      modal.style.bottom = '60px';
      modal.style.right = '10px';
      modal.style.left = 'auto';
      modal.style.borderRadius = '16px';
      modal.style.padding = '8px';
      modal.style.margin = '0';
      modal.style.pointerEvents = 'auto';
      modal.style.cursor = 'grab';
      modal.style.zIndex = '10000';
      modal.style.maxHeight = '50vh';
      modal.style.overflowY = 'auto';

      // Update video size for mobile floating
      video.style.width = '100%';
      video.style.height = 'auto';
      video.style.maxHeight = '250px';

      // Update title styling
      title.style.fontSize = '0.9rem';
      title.style.margin = '0 0 6px 0';

      // Create drag header for mobile
      const dragHeader = document.createElement('div');
      dragHeader.className = 'drag-header';
      dragHeader.style.position = 'absolute';
      dragHeader.style.top = '0';
      dragHeader.style.left = '0';
      dragHeader.style.right = '0';
      dragHeader.style.height = '35px';
      dragHeader.style.cursor = 'grab';
      dragHeader.style.borderRadius = '16px 16px 0 0';
      dragHeader.style.display = 'flex';
      dragHeader.style.alignItems = 'center';
      dragHeader.style.justifyContent = 'space-between';
      dragHeader.style.backgroundColor = '#f9f9f9';
      dragHeader.style.paddingLeft = '10px';
      dragHeader.style.paddingRight = '10px';
      dragHeader.style.boxSizing = 'border-box';

      // Add drag indicator
      const dragIndicator = document.createElement('span');
      dragIndicator.textContent = '⋮⋮⋮';
      dragIndicator.style.fontSize = '0.7rem';
      dragIndicator.style.color = '#999';
      dragIndicator.style.flex = '1';
      dragIndicator.style.textAlign = 'center';

      // Add close button in drag header
      const headerCloseBtn = document.createElement('button');
      headerCloseBtn.textContent = '×';
      headerCloseBtn.style.background = 'none';
      headerCloseBtn.style.border = 'none';
      headerCloseBtn.style.fontSize = '1.5rem';
      headerCloseBtn.style.cursor = 'pointer';
      headerCloseBtn.style.color = '#0e3c39';
      headerCloseBtn.style.padding = '4px 8px';
      headerCloseBtn.style.marginLeft = '8px';

      dragHeader.appendChild(dragIndicator);
      dragHeader.appendChild(headerCloseBtn);

      headerCloseBtn.onclick = (e) => {
        e.stopPropagation();
        modal.style.display = 'none';
        showVideoBtn.style.display = 'block';
        video.pause();
      };

      // Touch drag functionality for mobile
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentX = 10;
      let currentY = 60;

      dragHeader.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - currentX;
        startY = touch.clientY - currentY;
        modal.style.cursor = 'grabbing';
        dragHeader.style.cursor = 'grabbing';
      });

      document.addEventListener('touchmove', (e) => {
        if (isDragging) {
          const touch = e.touches[0];
          currentX = touch.clientX - startX;
          currentY = touch.clientY - startY;
          modal.style.right = 'auto';
          modal.style.bottom = 'auto';
          modal.style.left = currentX + 'px';
          modal.style.top = currentY + 'px';
        }
      });

      document.addEventListener('touchend', () => {
        isDragging = false;
        modal.style.cursor = 'grab';
        dragHeader.style.cursor = 'grab';
      });

      // Insert drag header before title
      modal.insertBefore(dragHeader, title);

      // Update close button to hide floating window and show button
      closeBtn.onclick = () => {
        modal.style.display = 'none';
        showVideoBtn.style.display = 'flex';
        video.pause();
      };

      overlay.style.pointerEvents = 'none';
      return;
    }

    // Desktop: floating draggable preview
    overlay.style.background = 'none';
    overlay.style.alignItems = 'flex-end';
    overlay.style.justifyContent = 'flex-end';
    overlay.style.pointerEvents = 'none';

    // Convert modal to floating window
    modal.style.position = 'fixed';
    modal.style.width = '320px';
    modal.style.maxWidth = '320px';
    modal.style.bottom = '20px';
    modal.style.right = '20px';
    modal.style.padding = '16px';
    modal.style.margin = '0';
    modal.style.pointerEvents = 'auto';
    modal.style.cursor = 'grab';
    modal.style.zIndex = '10000';

    // Update video size
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.maxHeight = 'none';

    // Update title styling
    title.style.fontSize = '0.95rem';
    title.style.margin = '0 0 8px 0';

    // Create drag header
    const dragHeader = document.createElement('div');
    dragHeader.className = 'drag-header';
    dragHeader.style.position = 'absolute';
    dragHeader.style.top = '0';
    dragHeader.style.left = '0';
    dragHeader.style.right = '0';
    dragHeader.style.height = '40px';
    dragHeader.style.cursor = 'grab';
    dragHeader.style.borderRadius = '18px 18px 0 0';
    dragHeader.innerHTML = '&nbsp;';

    // Drag functionality (desktop only)
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 20;
    let currentY = 20;

    dragHeader.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      modal.style.cursor = 'grabbing';
      dragHeader.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        modal.style.right = 'auto';
        modal.style.bottom = 'auto';
        modal.style.left = currentX + 'px';
        modal.style.top = currentY + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      modal.style.cursor = 'grab';
      dragHeader.style.cursor = 'grab';
    });

    // Insert drag header before title
    modal.insertBefore(dragHeader, title);

    // Update close button to hide floating window and show button
    closeBtn.onclick = () => {
      modal.style.display = 'none';
      showVideoBtn.style.display = 'flex';
      video.pause();
    };
  }

  closeBtn.onclick = () => convertToFloating();
});
