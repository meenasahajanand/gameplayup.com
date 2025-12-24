// Universal Image Loader - Loads all images with data-load attribute immediately
(function() {
    'use strict';
    
    function loadAllImages() {
        const images = document.querySelectorAll('img[data-load]');
        
        images.forEach(function(img) {
            // Skip if already loaded
            if (img.dataset.loaded === 'true') {
                return;
            }
            
            // Set up load handler
            img.onload = function() {
                this.style.display = 'block';
                this.style.opacity = '1';
                const loader = this.parentElement.querySelector('.loader');
                if (loader) {
                    loader.style.display = 'none';
                }
                this.setAttribute('data-loaded', 'true');
            };
            
            // Set up error handler
            img.onerror = function() {
                this.style.display = 'block';
                this.style.opacity = '1';
                const loader = this.parentElement.querySelector('.loader');
                if (loader) {
                    loader.style.display = 'none';
                }
                this.setAttribute('data-loaded', 'true');
            };
            
            // Load the image
            img.setAttribute('src', img.dataset.load);
            img.setAttribute('data-loaded', 'true');
            img.style.display = 'block';
        });
    }
    
    // Load images immediately when script runs
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadAllImages();
            // Also load after a short delay to catch any dynamically added images
            setTimeout(loadAllImages, 100);
            setTimeout(loadAllImages, 500);
        });
    } else {
        // DOM already loaded, load immediately
        loadAllImages();
        setTimeout(loadAllImages, 100);
        setTimeout(loadAllImages, 500);
    }
    
    // Also load on window load
    window.addEventListener('load', function() {
        loadAllImages();
    });
    
    // Load on scroll (for any images that might have been missed)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(loadAllImages, 100);
    });
    
    // Load on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(loadAllImages, 200);
    });
    
})();

