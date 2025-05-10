// script.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const content = document.querySelector('.content');
    const servicesItem = document.querySelector('.services');
    const servicesItemRt = servicesItem.getBoundingClientRect();
    const sList = document.querySelector('.sList');
  
    // Toggle main mobile menu
    hamburger.addEventListener('click', function() {
      // Calculate height for smooth transition
      if (!content.classList.contains('active')) {
        // Opening menu
        content.classList.add('active');
        content.style.height = '0';
        // Force reflow to enable transition
        void content.offsetHeight;
        content.style.height = content.scrollHeight + 'px';
        
        // After transition completes
        const onTransitionEnd = () => {
          content.style.height = 'auto';
          content.removeEventListener('transitionend', onTransitionEnd);
        };
        content.addEventListener('transitionend', onTransitionEnd);
      } else {
        // Closing menu
        const startHeight = content.scrollHeight;
        content.style.height = startHeight + 'px';
        
        // Force reflow
        void content.offsetHeight;
        
        content.style.height = '0';
        
        // After transition completes
        const onTransitionEnd = () => {
          content.classList.remove('active');
          content.style.height = '';
          // Close all dropdowns when main menu closes
          document.querySelectorAll('.sList').forEach(dropdown => {
            dropdown.style.display = 'none';
          });
          content.removeEventListener('transitionend', onTransitionEnd);
        };
        content.addEventListener('transitionend', onTransitionEnd);
      }
    });
  
    // Handle Services dropdown
    function setupDropdown() {
      if (window.innerWidth <= 690) {
        // Mobile behavior
        servicesItem.style.cursor = 'pointer';
        servicesItem.addEventListener('click', function(e) {
          e.preventDefault();
          const dropdown = this.nextElementSibling;
          if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
          } else {
            // Position dropdown absolutely over content
            dropdown.style.display = 'block';
            dropdown.style.position = 'absolute';
            dropdown.style.left = '5rem';
            dropdown.style.right = '5rem';
            dropdown.style.width = 'auto';
            dropdown.style.top = `${this.offsetTop + this.offsetHeight}px`;
            dropdown.style.minWidth = '100px';
            dropdown.style.maxWidth = 'calc(100% - 10rem)';
            
            // Close other open dropdowns if any
            document.querySelectorAll('.sList').forEach(item => {
              if (item !== dropdown) item.style.display = 'none';
            });
          }
        });
      } else {
        // Desktop behavior
        servicesItem.style.cursor = '';
        sList.style.position = 'absolute';
        sList.style.left = `${servicesItemRt.left + window.scrollX-40}px`;
        sList.style.top = servicesItemRt.top + window.screenY;
        sList.style.minWidth = '150px';
        sList.style.display = '';
      }
    }
  
    // Initial setup
    setupDropdown();
  
    // Handle window resize
    window.addEventListener('resize', function() {
      setupDropdown();
      
      // Reset menu state when switching to desktop
      if (window.innerWidth > 690) {
        content.classList.remove('active');
        content.style.height = '';
        sList.style.display = '';
      }
    });
  
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.chover') && !e.target.closest('#hamburger')) {
        document.querySelectorAll('.sList').forEach(dropdown => {
          dropdown.style.display = 'none';
        });
      }
    });
  });