/**
 * Advanced Scroll Effects for AoT Project
 * Focuses on Parallax depth and Smooth Scroll behavior
 */

class AoTScrollEffects {
    constructor() {
        this.parallaxElems = document.querySelectorAll('.parallax-bg');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        // Run parallax on scroll
        window.addEventListener('scroll', () => {
            this.handleParallax();
            this.handleWallBlur();
        }, { passive: true });

        // Add subtle floating animation to hero text
        this.initHeroParallax();
    }

    // 1. Multi-Layer Parallax
    // As you scroll, the background moves slower than the foreground
    handleParallax() {
        const scrolled = window.pageYOffset;
        
        this.parallaxElems.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            // Shift the background position based on scroll
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    // 2. The "Wall" Blur Effect
    // Background becomes slightly more blurry/dark as you leave the hero section
    handleWallBlur() {
        const hero = document.querySelector('#hero');
        const scrollPercent = window.scrollY / window.innerHeight;
        
        if (scrollPercent <= 1) {
            // Gradually darken and blur the hero section as we scroll down
            hero.style.filter = `blur(${scrollPercent * 10}px) brightness(${1 - scrollPercent * 0.5})`;
        }
    }

    // 3. Mouse-Follow Parallax for Hero
    // The main title moves slightly with the mouse for a 3D effect
    initHeroParallax() {
        const heroContent = document.querySelector('.hero-inner');
        
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            
            heroContent.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AoTScrollEffects();
});