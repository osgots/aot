/**
 * Titan Ember & Smoke System
 * Generates floating particles to simulate heat and ash
 */

class AoTParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 60; // Adjust for density
        this.init();
    }

    init() {
        // Setup Canvas styling
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none'; // So users can click through it
        this.canvas.style.zIndex = '1'; // Behind text, above background
        document.body.appendChild(this.canvas);

        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());

        this.createParticles();
        this.animate();
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height + this.canvas.height, // Start below or randomly
                size: Math.random() * 3 + 1,
                speedY: Math.random() * 1 + 0.5, // Slow upward drift
                speedX: Math.random() * 1 - 0.5, // Subtle side drift
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#8b0000' : '#c5a059' // Red or Gold embers
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;
            this.ctx.fill();
        });
    }

    update() {
        this.particles.forEach(p => {
            p.y -= p.speedY; // Move up
            p.x += p.speedX; // Sway

            // If particle leaves the top, reset to bottom
            if (p.y < -10) {
                p.y = this.canvas.height + 10;
                p.x = Math.random() * this.canvas.width;
            }

            // Flicker effect
            p.opacity += (Math.random() - 0.5) * 0.05;
            if (p.opacity < 0) p.opacity = 0.1;
            if (p.opacity > 0.7) p.opacity = 0.7;
        });
    }

    animate() {
        this.draw();
        this.update();
        requestAnimationFrame(() => this.animate());
    }
}

// Fire it up when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AoTParticles();
});