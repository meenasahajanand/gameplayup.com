// Universal Image Loader - Loads all images with data-load attribute immediately
(function() {
    'use strict';
    
    function loadAllImages() {
        const images = document.querySelectorAll('img[data-load]');
        
        images.forEach(function(img) {
            // Skip if already loaded or if src is already set
            if (img.dataset.loaded === 'true' || img.src) {
                return;
            }
            
            // Get the image path from data-load
            const imagePath = img.getAttribute('data-load');
            if (!imagePath) {
                return;
            }
            
            // Set up load handler
            img.onload = function() {
                this.style.display = 'block';
                this.style.opacity = '1';
                const loader = this.parentElement ? this.parentElement.querySelector('.loader') : null;
                if (loader) {
                    loader.style.display = 'none';
                }
                this.setAttribute('data-loaded', 'true');
            };
            
            // Set up error handler
            img.onerror = function() {
                this.style.display = 'block';
                this.style.opacity = '1';
                const loader = this.parentElement ? this.parentElement.querySelector('.loader') : null;
                if (loader) {
                    loader.style.display = 'none';
                }
                this.setAttribute('data-loaded', 'true');
            };
            
            // Load the image immediately
            img.setAttribute('src', imagePath);
            img.setAttribute('data-loaded', 'true');
            img.style.display = 'block';
        });
    }
    
    // Load images immediately when script runs (no waiting)
    loadAllImages();
    
    // Load images when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadAllImages();
            setTimeout(loadAllImages, 50);
            setTimeout(loadAllImages, 200);
            setTimeout(loadAllImages, 500);
        });
    } else {
        // DOM already loaded, load immediately multiple times
        loadAllImages();
        setTimeout(loadAllImages, 50);
        setTimeout(loadAllImages, 200);
        setTimeout(loadAllImages, 500);
    }
    
    // Also load on window load
    window.addEventListener('load', function() {
        loadAllImages();
        setTimeout(loadAllImages, 100);
    });
    
    // Load on scroll (for any images that might have been missed)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(loadAllImages, 50);
    }, { passive: true });
    
    // Load on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(loadAllImages, 100);
    });
    
    // Use MutationObserver to catch dynamically added images
    if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
            let shouldReload = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            if (node.tagName === 'IMG' && node.hasAttribute('data-load')) {
                                shouldReload = true;
                            } else if (node.querySelectorAll && node.querySelectorAll('img[data-load]').length > 0) {
                                shouldReload = true;
                            }
                        }
                    });
                }
            });
            if (shouldReload) {
                setTimeout(loadAllImages, 50);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
})();

