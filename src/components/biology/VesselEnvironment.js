/**
 * VesselEnvironment.js
 * Intravascular Blood Vessel Lumen & Plasma Dynamics Renderer.
 * 
 * Generates microscopic vessel aesthetics:
 * - Top & Bottom translucent endothelial vessel boundaries.
 * - Physiological pulse wave dilation (systole expansion / diastole recoil).
 * - Volumetric ambient plasma glow and drifting nutrient micelles / plasma proteins.
 */

export class VesselEnvironment {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.time = 0;
    this.micelles = [];
    this.initMicelles();
  }

  initMicelles() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.micelles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.2,
      speed: 0.8 + Math.random() * 1.2,
      opacity: 0.15 + Math.random() * 0.35,
      hue: 200 + Math.random() * 30 // Plasma luminescence
    }));
  }

  update(scrollOffset = 0) {
    this.time += 0.025;
    const width = this.canvas.width;
    const height = this.canvas.height;

    for (let i = 0; i < this.micelles.length; i++) {
      const m = this.micelles[i];
      m.x += m.speed * 1.1;
      m.y += Math.sin(this.time + m.x * 0.005) * 0.3;

      if (m.x > width + 10) {
        m.x = -10;
        m.y = Math.random() * height;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // 1. Volumetric Intravascular Plasma Core Gradient
    const coreGrad = ctx.createLinearGradient(0, 0, 0, height);
    coreGrad.addColorStop(0, 'rgba(4, 7, 17, 0.95)');       // Obsidian void at wall
    coreGrad.addColorStop(0.18, 'rgba(15, 23, 42, 0.82)');
    coreGrad.addColorStop(0.5, 'rgba(14, 28, 54, 0.65)');    // Vibrant plasma lumen center
    coreGrad.addColorStop(0.82, 'rgba(15, 23, 42, 0.82)');
    coreGrad.addColorStop(1, 'rgba(4, 7, 17, 0.95)');

    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Cardiac Systolic / Diastolic Pulse Wave on Vessel Boundaries
    const pulseDilation = Math.sin(this.time * 2.2) * 8 + Math.sin(this.time * 4.4) * 3;
    const wallHeightTop = 55 + pulseDilation;
    const wallHeightBottom = height - (55 + pulseDilation);

    // Top Endothelial Wall
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, wallHeightTop);
    for (let x = 0; x <= width; x += 30) {
      const wave = Math.sin(x * 0.008 + this.time) * 12 + Math.cos(x * 0.015 - this.time * 0.8) * 6;
      ctx.lineTo(x, wallHeightTop + wave);
    }
    ctx.lineTo(width, 0);
    ctx.closePath();

    const topWallGrad = ctx.createLinearGradient(0, 0, 0, wallHeightTop + 20);
    topWallGrad.addColorStop(0, 'rgba(190, 18, 60, 0.28)'); // Endothelial endothelial red-ruby
    topWallGrad.addColorStop(0.7, 'rgba(225, 29, 72, 0.12)');
    topWallGrad.addColorStop(1, 'rgba(225, 29, 72, 0.0)');
    ctx.fillStyle = topWallGrad;
    ctx.fill();

    // Top Wall Specular Lumen Line
    ctx.strokeStyle = 'rgba(251, 113, 133, 0.25)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Bottom Endothelial Wall
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, wallHeightBottom);
    for (let x = 0; x <= width; x += 30) {
      const wave = Math.sin(x * 0.008 - this.time * 1.1) * 12 + Math.cos(x * 0.015 + this.time * 0.7) * 6;
      ctx.lineTo(x, wallHeightBottom + wave);
    }
    ctx.lineTo(width, height);
    ctx.closePath();

    const bottomWallGrad = ctx.createLinearGradient(0, height, 0, wallHeightBottom - 20);
    bottomWallGrad.addColorStop(0, 'rgba(190, 18, 60, 0.28)');
    bottomWallGrad.addColorStop(0.7, 'rgba(225, 29, 72, 0.12)');
    bottomWallGrad.addColorStop(1, 'rgba(225, 29, 72, 0.0)');
    ctx.fillStyle = bottomWallGrad;
    ctx.fill();

    // Bottom Wall Specular Lumen Line
    ctx.strokeStyle = 'rgba(251, 113, 133, 0.25)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 3. Drifting Plasma Micelles & Macromolecules
    for (let i = 0; i < this.micelles.length; i++) {
      const m = this.micelles[i];
      ctx.fillStyle = `hsla(${m.hue}, 90%, 75%, ${m.opacity})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
