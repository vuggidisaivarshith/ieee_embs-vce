/**
 * CellMatrixSimulation.js
 * Living Cellular Matrix & Tissue Environment Simulation.
 * 
 * Generates microscopic tissue histology:
 * - Hexagonal/organic cellular tile boundaries with pulsating lipid bilayers.
 * - Cytoplasmic streaming and organelle vesicle diffusion.
 * - Intercellular signaling flashes upon pointer interaction.
 */

export class CellMatrixSimulation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cells = [];
    this.signals = [];
    this.mouse = { x: -1000, y: -1000, active: false };
    this.time = 0;
    this.init();
  }

  init() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const spacing = 110;
    this.cells = [];

    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / (spacing * 0.86)) + 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const xOffset = (r % 2) * (spacing * 0.5);
        const bx = c * spacing + xOffset - spacing;
        const by = r * (spacing * 0.86) - spacing;

        this.cells.push({
          x: bx + (Math.random() - 0.5) * 15,
          y: by + (Math.random() - 0.5) * 15,
          radius: spacing * 0.48,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          nucleusSize: 12 + Math.random() * 6,
          activity: 0.15 + Math.random() * 0.35,
          hue: 265 + (Math.random() - 0.5) * 20 // EMBS Violet / Bio-Indigo
        });
      }
    }
  }

  setMouse(x, y, active) {
    this.mouse.x = x;
    this.mouse.y = y;
    this.mouse.active = active;
  }

  update() {
    this.time += 0.02;

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      cell.phase += cell.pulseSpeed;

      // Mouse triggers intercellular signaling cascades
      if (this.mouse.active) {
        const dx = this.mouse.x - cell.x;
        const dy = this.mouse.y - cell.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160) {
          cell.activity = Math.min(1.0, cell.activity + 0.08);
          if (Math.random() < 0.04) {
            this.signals.push({
              x: cell.x,
              y: cell.y,
              vx: (Math.random() - 0.5) * 2.5,
              vy: (Math.random() - 0.5) * 2.5,
              life: 1.0,
              size: 2.5
            });
          }
        }
      }

      // Decay activity back to baseline
      cell.activity += (0.2 - cell.activity) * 0.03;
    }

    // Update signaling vesicles
    for (let s = this.signals.length - 1; s >= 0; s--) {
      const sig = this.signals[s];
      sig.x += sig.vx;
      sig.y += sig.vy;
      sig.life -= 0.03;
      if (sig.life <= 0) {
        this.signals.splice(s, 1);
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Dark cellular histology background
    ctx.fillStyle = 'rgba(6, 10, 22, 0.96)';
    ctx.fillRect(0, 0, width, height);

    // Draw living hexagonal cell boundaries
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      const r = cell.radius + Math.sin(cell.phase) * 3.5;

      ctx.save();
      ctx.translate(cell.x, cell.y);

      // Hexagonal Membrane Contour
      ctx.beginPath();
      for (let side = 0; side < 6; side++) {
        const angle = (side / 6) * Math.PI * 2 + Math.PI / 6;
        const hx = Math.cos(angle) * r;
        const hy = Math.sin(angle) * r;
        if (side === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      // Cytoplasmic Fluid Fill
      const cellGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, r);
      cellGrad.addColorStop(0, `hsla(${cell.hue}, 80%, 45%, ${0.12 + cell.activity * 0.25})`);
      cellGrad.addColorStop(0.7, `hsla(${cell.hue}, 70%, 25%, 0.08)`);
      cellGrad.addColorStop(1, `rgba(255, 255, 255, 0.0)`);
      ctx.fillStyle = cellGrad;
      ctx.fill();

      // Intercellular Junction Membrane Boundary
      ctx.strokeStyle = `hsla(${cell.hue}, 80%, 65%, ${0.18 + cell.activity * 0.35})`;
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Cell Nucleus with Organelle Halo
      ctx.beginPath();
      ctx.arc(0, 0, cell.nucleusSize, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${cell.hue - 15}, 85%, 60%, ${0.25 + cell.activity * 0.45})`;
      ctx.fill();
      ctx.strokeStyle = `hsla(${cell.hue + 20}, 100%, 75%, ${0.35 + cell.activity * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    }

    // Draw active signaling vesicle emissions
    for (let s = 0; s < this.signals.length; s++) {
      const sig = this.signals[s];
      ctx.fillStyle = `rgba(56, 189, 248, ${sig.life * 0.9})`;
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(sig.x, sig.y, sig.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}
