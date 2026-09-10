/**
 * RBCSimulation.js
 * High-performance, mathematically accurate Red Blood Cell (Erythrocyte) particle engine.
 * 
 * Generates true biconcave disc morphology:
 * - 3D pitch, yaw, and roll orientation with realistic torus-dimple projection.
 * - Multi-layer depth simulation (foreground, midground, background) with depth-of-field opacity and velocity scaling.
 * - Dynamic shear deformation when passing through biological flow streamlines.
 * - Accurate arterial ruby (#E11D48 / #BE123C / #881337) and oxygenated highlights.
 */

export class RBCSimulation {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.count = options.count || 28;
    this.particles = [];
    this.flowAngle = options.flowAngle || Math.PI * 0.15; // Fluid stream direction
    this.speedMultiplier = options.speedMultiplier || 1.0;
    this.mouse = { x: -1000, y: -1000, vx: 0, vy: 0, active: false };
    this.init();
  }

  init() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.particles = [];

    for (let i = 0; i < this.count; i++) {
      this.particles.push(this.createParticle(width, height, true));
    }
  }

  createParticle(width, height, randomStart = false) {
    // 3 depth layers: 0: Background (small, slow, blurred), 1: Midground, 2: Foreground (large, fast, prominent)
    const layer = Math.random() < 0.35 ? 0 : Math.random() < 0.8 ? 1 : 2;
    
    let radius, speed, opacity;
    if (layer === 0) {
      radius = 12 + Math.random() * 8;
      speed = 0.4 + Math.random() * 0.4;
      opacity = 0.25 + Math.random() * 0.2;
    } else if (layer === 1) {
      radius = 22 + Math.random() * 12;
      speed = 0.8 + Math.random() * 0.6;
      opacity = 0.6 + Math.random() * 0.25;
    } else {
      radius = 36 + Math.random() * 16;
      speed = 1.3 + Math.random() * 0.8;
      opacity = 0.85 + Math.random() * 0.15;
    }

    return {
      x: randomStart ? Math.random() * width : -radius * 2,
      y: randomStart ? Math.random() * height : Math.random() * height,
      z: layer,
      radius: radius,
      baseRadius: radius,
      opacity: opacity,
      speed: speed,
      
      // 3D Rotational angles
      pitch: Math.random() * Math.PI * 2,
      yaw: Math.random() * Math.PI * 2,
      roll: Math.random() * Math.PI * 2,
      
      // Rotational velocities
      dPitch: (Math.random() - 0.5) * 0.02,
      dYaw: (Math.random() - 0.5) * 0.03,
      dRoll: (Math.random() - 0.5) * 0.015,
      
      // Biological deformation state (squish when passing tight streamlines)
      deformation: 0,
      targetDeformation: 0,
      
      // Color tint variation (Arterial oxygen-rich blood)
      hue: 348 + (Math.random() - 0.5) * 8, // ~#E11D48
      sat: 82 + Math.random() * 12,
      light: layer === 2 ? 46 : layer === 1 ? 38 : 28
    };
  }

  setMouse(x, y, vx, vy, active) {
    this.mouse.x = x;
    this.mouse.y = y;
    this.mouse.vx = vx;
    this.mouse.vy = vy;
    this.mouse.active = active;
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  update(scrollOffset = 0) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Slight flow vector curvature with scroll
    const angle = this.flowAngle + Math.sin(scrollOffset * 0.001) * 0.1;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Standard laminar flow
      p.x += cosAngle * p.speed * this.speedMultiplier;
      p.y += sinAngle * p.speed * this.speedMultiplier;

      // Natural rotational tumbling
      p.pitch += p.dPitch;
      p.yaw += p.dYaw;
      p.roll += p.dRoll;

      // Mouse fluid interaction
      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distSq = dx * dx + dy * dy;
        const maxDist = (p.z + 1) * 120;
        
        if (distSq < maxDist * maxDist && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / maxDist) * (0.8 + p.z * 0.5);
          
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
          
          // Induce fluid spin and deformation on proximity
          p.dYaw += (this.mouse.vx || 0) * 0.001;
          p.targetDeformation = Math.min(0.4, force * 0.5);
        } else {
          p.targetDeformation = 0;
        }
      }

      // Smooth deformation relaxation
      p.deformation += (p.targetDeformation - p.deformation) * 0.08;

      // Wrap around bounds seamlessly
      const margin = p.radius * 3;
      if (p.x > width + margin) {
        p.x = -margin;
        p.y = Math.random() * height;
      } else if (p.x < -margin) {
        p.x = width + margin;
        p.y = Math.random() * height;
      }

      if (p.y > height + margin) {
        p.y = -margin;
        p.x = Math.random() * width;
      } else if (p.y < -margin) {
        p.y = height + margin;
        p.x = Math.random() * width;
      }
    }
  }

  draw() {
    const ctx = this.ctx;

    // Sort by depth layer (background -> midground -> foreground) for correct volumetric layering
    this.particles.sort((a, b) => a.z - b.z);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.roll);

      // Projected 3D biconcave disc dimensions
      const aspectX = Math.cos(p.yaw);
      const aspectY = Math.cos(p.pitch);
      
      const rx = Math.max(3, p.radius * Math.abs(aspectX) * (1 - p.deformation * 0.3));
      const ry = Math.max(3, p.radius * Math.abs(aspectY) * (1 + p.deformation * 0.5));
      const isSideView = Math.abs(aspectX) < 0.35 || Math.abs(aspectY) < 0.35;

      ctx.globalAlpha = p.opacity;

      // Outer Torus Rim of the Erythrocyte
      const outerGrad = ctx.createRadialGradient(
        -rx * 0.15, -ry * 0.2, rx * 0.1,
        0, 0, Math.max(rx, ry)
      );

      const colorBase = `hsl(${p.hue}, ${p.sat}%, ${p.light}%)`;
      const colorHighlight = `hsl(${p.hue + 4}, ${p.sat + 6}%, ${p.light + 18}%)`;
      const colorShadow = `hsl(${p.hue - 6}, ${p.sat - 10}%, ${p.light - 16}%)`;
      const colorDimple = `hsl(${p.hue - 8}, ${p.sat - 15}%, ${p.light - 20}%)`;

      outerGrad.addColorStop(0, colorHighlight);
      outerGrad.addColorStop(0.45, colorBase);
      outerGrad.addColorStop(0.85, colorShadow);
      outerGrad.addColorStop(1, `hsla(${p.hue - 10}, ${p.sat}%, 12%, 0.8)`);

      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // Biconcave Central Dimple (the signature hollow depression of human RBCs)
      if (!isSideView && rx > 6 && ry > 6) {
        const dimpleRx = rx * 0.52;
        const dimpleRy = ry * 0.52;

        const innerGrad = ctx.createRadialGradient(
          rx * 0.1, ry * 0.15, dimpleRx * 0.05,
          0, 0, dimpleRx
        );
        innerGrad.addColorStop(0, colorDimple);
        innerGrad.addColorStop(0.65, colorShadow);
        innerGrad.addColorStop(1, `rgba(0, 0, 0, 0)`);

        ctx.fillStyle = innerGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, dimpleRx, dimpleRy, 0, 0, Math.PI * 2);
        ctx.fill();

        // Subtle Specular Crescent Highlight on the outer rim
        ctx.strokeStyle = `hsla(${p.hue + 8}, 100%, 75%, ${p.z === 2 ? 0.45 : 0.25})`;
        ctx.lineWidth = p.z === 2 ? 1.8 : 1.0;
        ctx.beginPath();
        ctx.ellipse(-rx * 0.08, -ry * 0.1, rx * 0.82, ry * 0.82, 0, -Math.PI * 0.75, -Math.PI * 0.15);
        ctx.stroke();
      }

      ctx.restore();
    }
  }
}
