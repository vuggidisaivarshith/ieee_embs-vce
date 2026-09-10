/**
 * BioSignalSimulation.js
 * Biomedical Signal Processing & Telemetry Diagnostics Simulation.
 * 
 * Generates clinical engineering telemetry:
 * - Real-time ECG (P-Q-R-S-T cardiac waveform) oscilloscope sweep.
 * - Neural EEG wave rhythms (Alpha/Beta/Gamma bands).
 * - Synaptic bio-potential pulse network nodes.
 */

export class BioSignalSimulation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.time = 0;
    this.scanX = 0;
    this.nodes = [];
    this.initNodes();
  }

  initNodes() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.nodes = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * Math.PI * 2,
      radius: 2 + Math.random() * 2.5
    }));
  }

  update() {
    this.time += 0.04;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Telemetry sweep scanner
    this.scanX = (this.scanX + 3.5) % width;

    // Update synaptic nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.x += node.vx;
      node.y += node.vy;
      node.pulse += 0.03;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
    }
  }

  // Clinical ECG P-Q-R-S-T Waveform generator function
  getEcgHeight(phase) {
    const p = phase % (Math.PI * 2);
    // P wave (Atrial Depolarization)
    if (p > 0.4 && p < 0.9) return -Math.sin((p - 0.4) / 0.5 * Math.PI) * 14;
    // Q wave (Septal Depolarization)
    if (p >= 1.1 && p < 1.25) return ((p - 1.1) / 0.15) * 8;
    // R peak (Ventricular Depolarization)
    if (p >= 1.25 && p < 1.45) return -((p - 1.25) / 0.1) * 85 + 8;
    // S wave
    if (p >= 1.45 && p < 1.65) return 18 - ((1.65 - p) / 0.2) * 26;
    // T wave (Ventricular Repolarization)
    if (p > 2.0 && p < 2.7) return -Math.sin((p - 2.0) / 0.7 * Math.PI) * 22;
    // Baseline isoelectric
    return 0;
  }

  draw() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Dark bio-instrumentation display background
    ctx.fillStyle = 'rgba(5, 8, 18, 0.96)';
    ctx.fillRect(0, 0, width, height);

    // 1. Digital Telemetry Grid Lines
    ctx.strokeStyle = 'rgba(13, 166, 160, 0.06)'; // Bio-teal grid
    ctx.lineWidth = 1;
    const gridSpacing = 40;

    for (let x = 0; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Continuous Medical ECG Wave Trace
    const centerY = height * 0.5;
    ctx.strokeStyle = '#0DA6A0'; // EMBS Vital Teal
    ctx.lineWidth = 2.0;
    ctx.shadowColor = '#0DA6A0';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    for (let x = 0; x < width; x += 3) {
      const phase = (x * 0.015 - this.time * 0.6);
      const ecgY = centerY + this.getEcgHeight(phase);

      // Fade out trailing edge near the sweep scanner
      const distToScan = (x - this.scanX + width) % width;
      const alpha = Math.max(0.12, 1 - (distToScan / width));

      if (x === 0) ctx.moveTo(x, ecgY);
      else ctx.lineTo(x, ecgY);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 3. Synaptic Bio-Potential Node Network
    ctx.strokeStyle = 'rgba(106, 63, 160, 0.15)'; // EMBS Purple synapses
    ctx.lineWidth = 1.0;

    for (let i = 0; i < this.nodes.length; i++) {
      const n1 = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n2 = this.nodes[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // Draw glowing node point
      const glow = Math.sin(n1.pulse) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(56, 189, 248, ${0.4 + glow * 0.5})`;
      ctx.beginPath();
      ctx.arc(n1.x, n1.y, n1.radius * (0.8 + glow * 0.4), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
