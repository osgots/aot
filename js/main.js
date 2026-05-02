document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader Logic ---
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        // Add a slight delay for dramatic effect
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Trigger the hero entrance manually after preload
            document.querySelector('.main-title').classList.add('active');
        }, 2000);
    });

    // --- 2. Smooth Scroll Progress Bar ---
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
        
        // Navigation background toggle on scroll
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.style.background = "rgba(5, 5, 5, 0.8)";
            nav.style.padding = "15px 8%";
        } else {
            nav.style.background = "rgba(255, 255, 255, 0.03)";
            nav.style.padding = "25px 8%";
        }
    });

    // --- 3. Intersection Observer (Scroll Reveals) ---
    // This looks for elements with the 'reveal' class and triggers them
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it has appeared, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply the observer to cards and headers
    document.querySelectorAll('.titan-card, .section-header').forEach(el => {
        el.classList.add('reveal'); // Ensure they have the base reveal class
        revealObserver.observe(el);
    });

    // --- 4. Interactive Hover Parallax (Subtle) ---
    // Makes the Titan cards tilt slightly towards the mouse
    const cards = document.querySelectorAll('.titan-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
});












//--------------------------------------------------------- Music Beat Sync Logic-------------------------------------------------------
const musicBtn = document.getElementById('music-toggle');
const audio = document.getElementById('bg-music');
const body = document.body;

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        body.classList.add('music-active');
        musicBtn.innerText = "STOP THE RUMBLING";
        musicBtn.style.background = "#000";
        musicBtn.style.borderColor = "#ff0000";
    } else {
        audio.pause();
        body.classList.remove('music-active');
        musicBtn.innerText = "DEDICATE YOUR HEART (PLAY)";
        musicBtn.style.background = "rgba(139, 0, 0, 0.8)";
    }
});

// Subtle: Make particles move faster when music is active
// (Add this inside your particles.js update loop if you want to be extra)
if (body.classList.contains('music-active')) {
    p.speedY *= 1.05; // Make embers fly faster to the beat
}