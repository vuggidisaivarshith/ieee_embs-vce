/**
 * PlateletSimulation.js
 * Scientifically accurate Platelet (Thrombocyte) particle system.
 * 
 * Generates irregular disc / stellate morphology:
 * - Small irregular biological shapes with micro-pseudopodia protrusions.
 * - Subtle clustering and aggregation behavior.
 * - Localized focal attraction during clotting / interactive stimulus.
 */

export class PlateletSimulation {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.count = options.count || 32;
    this.platelets = [];
    this.mouse = { x: -1000, y: -1000, active: false };
    this.init();
  }

  init() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.platelets = [];

    for (let i = 0; i < this.count; i++) {
      this.platelets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7 + 0.6,
        vy: (Math.random() - 0.5) * 0.5 + 0.3,
        size: 3.5 + Math.random() * 4.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        spikes: 5 + Math.floor(Math.random() * 4),
        spikeLengths: Array.from({ length: 8 }, () => 0.8 + Math.random() * 0.5),
        opacity: 0.45 + Math.random() * 0.35,
        hue: 32 + (Math.random() - 0.5) * 12 // Vardhaman Amber/Platelet Gold (#F5821F / #FBBF24)
      });
    }
  }

  setMouse(x, y, active) {
    this.mouse.x = x;
    this.mouse.y = y;
    this.mouse.active = active;
  }

  update() {
    const width = this.canvas.width;
    const height = this.canvas.height;

    for (let i = 0; i < this.platelets.length; i++) {
      const p = this.platelets[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      // Mouse focal aggregation (platelet activation / clotting reflex)
      if (this.mouse.active) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && dist > 15) {
          p.vx += (dx / dist) * 0.03;
          p.vy += (dy / dist) * 0.03;
          p.vx *= 0.94;
          p.vy *= 0.94;
        }
      }

      // Wrap boundaries
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;
      if (p.y > height + 20) p.y = -20;
      if (p.y < -20) p.y = height + 20;
    }
  }

  draw() {
    const ctx = this.ctx;

    for (let i = 0; i < this.platelets.length; i++) {
      const p = this.platelets[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      ctx.fillStyle = `hsla(${p.hue}, 88%, 56%, 0.85)`;
      ctx.strokeStyle = `hsla(${p.hue + 8}, 100%, 75%, 0.9)`;
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      for (let s = 0; s < p.spikes; s++) {
        const angle = (s / p.spikes) * Math.PI * 2;
        const len = p.size * (p.spikeLengths[s % p.spikeLengths.length] || 1);
        const sx = Math.cos(angle) * len;
        const sy = Math.sin(angle) * len;

        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  }
}
