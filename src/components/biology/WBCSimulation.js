/**
 * WBCSimulation.js
 * Scientifically accurate White Blood Cell (Leukocyte / Neutrophil) particle engine.
 * 
 * Generates organic amoeboid leukocyte morphology:
 * - Dynamic undulating plasma membrane using multi-harmonic sine perturbation.
 * - Multi-lobed dense chromatin nucleus with granular cytoplasmic organelles.
 * - Surface receptor glycoprotein pins projecting from the lipid bilayer.
 * - Slow, purposeful surveillance migration (Brownian amoeboid motility).
 */

export class WBCSimulation {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.count = options.count || 2;
    this.cells = [];
    this.mouse = { x: -1000, y: -1000, vx: 0, vy: 0, active: false };
    this.time = 0;
    this.init();
  }

  init() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.cells = [];

    for (let i = 0; i < this.count; i++) {
      this.cells.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 48 + Math.random() * 24,
        speed: 0.25 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        
        // Multi-harmonic membrane parameters
        harmonics: [
          { freq: 4, amp: 3.5, speed: 0.015, phase: Math.random() * Math.PI },
          { freq: 7, amp: 2.0, speed: 0.025, phase: Math.random() * Math.PI },
          { freq: 11, amp: 1.2, speed: 0.04, phase: Math.random() * Math.PI }
        ],
        
        // Granular cytoplasm organelle particles
        granules: Array.from({ length: 18 }, () => ({
          r: 2 + Math.random() * 3.5,
          dist: Math.random() * 0.65,
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() - 0.5) * 0.01
        })),

        // Receptor pins
        receptorCount: 16,
        rotation: 0,
        opacity: 0.82
      });
    }
  }

  setMouse(x, y, vx, vy, active) {
    this.mouse.x = x;
    this.mouse.y = y;
    this.mouse.vx = vx;
    this.mouse.vy = vy;
    this.mouse.active = active;
  }

  update() {
    this.time += 1;
    const width = this.canvas.width;
    const height = this.canvas.height;

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];

      // Slow Brownian surveillance crawl
      cell.x += cell.vx * cell.speed;
      cell.y += cell.vy * cell.speed;
      cell.rotation += 0.002;

      // Membrane undulation phase updates
      cell.harmonics.forEach(h => {
        h.phase += h.speed;
      });

      // Mouse proximity: subtle orientation and immune surveillance response
      if (this.mouse.active) {
        const dx = this.mouse.x - cell.x;
        const dy = this.mouse.y - cell.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 280 && dist > 10) {
          // Slow directional drift toward interaction zone (chemotaxis simulation)
          cell.vx += (dx / dist) * 0.008;
          cell.vy += (dy / dist) * 0.008;
          
          // Dampen maximum velocity
          cell.vx = Math.max(-0.6, Math.min(0.6, cell.vx));
          cell.vy = Math.max(-0.6, Math.min(0.6, cell.vy));
        }
      }

      // Keep within bounds with smooth bounce
      const margin = cell.radius * 2;
      if (cell.x < margin) cell.vx = Math.abs(cell.vx);
      if (cell.x > width - margin) cell.vx = -Math.abs(cell.vx);
      if (cell.y < margin) cell.vy = Math.abs(cell.vy);
      if (cell.y > height - margin) cell.vy = -Math.abs(cell.vy);
    }
  }

  draw() {
    const ctx = this.ctx;

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      ctx.save();
      ctx.translate(cell.x, cell.y);
      ctx.globalAlpha = cell.opacity;

      // 1. Amoeboid Plasma Membrane Path Construction
      ctx.beginPath();
      const points = 64;
      for (let j = 0; j <= points; j++) {
        const theta = (j / points) * Math.PI * 2;
        let r = cell.radius;

        // Apply harmonic perturbations
        cell.harmonics.forEach(h => {
          r += Math.sin(theta * h.freq + h.phase) * h.amp;
        });

        const px = Math.cos(theta) * r;
        const py = Math.sin(theta) * r;

        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Translucent Leukocyte Bilayer Gradient (Pearl / Sky / Soft Violet)
      const memGrad = ctx.createRadialGradient(
        -cell.radius * 0.25, -cell.radius * 0.25, cell.radius * 0.1,
        0, 0, cell.radius * 1.15
      );
      memGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      memGrad.addColorStop(0.35, 'rgba(224, 242, 254, 0.28)'); // Soft sky pearl
      memGrad.addColorStop(0.8, 'rgba(186, 230, 253, 0.15)');
      memGrad.addColorStop(1, 'rgba(125, 211, 252, 0.05)');

      ctx.fillStyle = memGrad;
      ctx.fill();

      // Outer Membrane Bioluminescent Rim Stroke
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 2. Multi-Lobed Chromatin Nucleus
      const nucleusRadius = cell.radius * 0.38;
      const lobes = [
        { ox: -nucleusRadius * 0.5, oy: -nucleusRadius * 0.3, r: nucleusRadius * 0.65 },
        { ox: nucleusRadius * 0.45, oy: -nucleusRadius * 0.2, r: nucleusRadius * 0.72 },
        { ox: 0, oy: nucleusRadius * 0.4, r: nucleusRadius * 0.6 }
      ];

      ctx.fillStyle = 'rgba(147, 51, 234, 0.38)'; // EMBS Purple chromatin tone
      lobes.forEach(lobe => {
        ctx.beginPath();
        ctx.arc(lobe.ox, lobe.oy, lobe.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.45)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      });

      // 3. Cytoplasmic Organelle Granules
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      cell.granules.forEach(g => {
        g.angle += g.speed;
        const gx = Math.cos(g.angle) * (cell.radius * g.dist);
        const gy = Math.sin(g.angle) * (cell.radius * g.dist);
        ctx.beginPath();
        ctx.arc(gx, gy, g.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Glycoprotein Surface Receptor Pins
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)'; // Bio-cyan receptor spikes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.2;

      for (let k = 0; k < cell.receptorCount; k++) {
        const phi = (k / cell.receptorCount) * Math.PI * 2 + cell.rotation;
        const baseR = cell.radius + Math.sin(phi * 4 + cell.harmonics[0].phase) * 3;
        const headR = baseR + 7;

        const bx = Math.cos(phi) * baseR;
        const by = Math.sin(phi) * baseR;
        const hx = Math.cos(phi) * headR;
        const hy = Math.sin(phi) * headR;

        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(hx, hy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }
}
