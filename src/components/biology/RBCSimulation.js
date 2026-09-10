/**
 * RBCSimulation.js
 * High-performance, mathematically accurate Red Blood Cell (Erythrocyte) particle engine.
 * 
 * Generates true biconcave disc morphology:
 * - 3D pitch, yaw, and roll orientation with realistic torus-dimple projection.
 * - Multi-layer depth simulation (foreground, midground, background) with optical depth-of-field diffusion.
 * - Subsurface scattering and arterial oxygenated lipid highlights.
 * - Hydrodynamic shear deformation and streamline velocity alignment.
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
    this.scrollVelocity = 0;
    this.lastScrollY = 0;
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
    // 3 depth layers: 0: Background (diffuse, slow), 1: Midground (standard), 2: Foreground (crisp, prominent)
    const layer = Math.random() < 0.35 ? 0 : Math.random() < 0.8 ? 1 : 2;
    
    let radius, speed, opacity;
    if (layer === 0) {
      radius = 14 + Math.random() * 8;
      speed = 0.45 + Math.random() * 0.35;
      opacity = 0.35 + Math.random() * 0.2;
    } else if (layer === 1) {
      radius = 24 + Math.random() * 10;
      speed = 0.85 + Math.random() * 0.5;
      opacity = 0.7 + Math.random() * 0.2;
    } else {
      radius = 38 + Math.random() * 14;
      speed = 1.35 + Math.random() * 0.7;
      opacity = 0.92 + Math.random() * 0.08;
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
      dPitch: (Math.random() - 0.5) * 0.018,
      dYaw: (Math.random() - 0.5) * 0.025,
      dRoll: (Math.random() - 0.5) * 0.012,
      
      // Biological deformation state
      deformation: 0,
      targetDeformation: 0,
      
      // Color tint variation (Arterial oxygen-rich blood)
      hue: 348 + (Math.random() - 0.5) * 6, // ~#E11D48
      sat: 85 + Math.random() * 10,
      light: layer === 2 ? 48 : layer === 1 ? 40 : 30
    };
  }

  setMouse(x, y, vx, vy, active) {
    this.mouse.x = x;
    this.mouse.y = y;
    this.mouse.vx = vx;
    this.mouse.vy = vy;
    this.mouse.active = active;
  }

  setScrollVelocity(vel) {
    this.scrollVelocity = vel;
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  update(scrollOffset = 0) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Dynamic streamline curvature with scroll response
    const scrollEffect = Math.sin(scrollOffset * 0.0008) * 0.08;
    const angle = this.flowAngle + scrollEffect;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const dynamicSpeedMult = this.speedMultiplier * (1 + Math.min(1.5, Math.abs(this.scrollVelocity) * 0.05));

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Laminar flow advancement
      p.x += cosAngle * p.speed * dynamicSpeedMult;
      p.y += sinAngle * p.speed * dynamicSpeedMult;

      // Natural rotational tumbling
      p.pitch += p.dPitch;
      p.yaw += p.dYaw;
      p.roll += p.dRoll;

      // Hydrodynamic Cursor Fluid Deflection
      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distSq = dx * dx + dy * dy;
        const interactionRadius = (p.z + 1) * 120;
        
        if (distSq < interactionRadius * interactionRadius && distSq > 4) {
          const dist = Math.sqrt(distSq);
          const normalizedDist = 1 - (dist / interactionRadius);
          
          // Deflection force scaled by layer depth
          const force = normalizedDist * (0.65 + p.z * 0.35);
          
          // Push along normalized vector away from cursor
          p.x += (dx / dist) * force * 3.5;
          p.y += (dy / dist) * force * 3.5;
          
          // Tangential stream drag from cursor motion
          if (this.mouse.vx || this.mouse.vy) {
            p.x += (this.mouse.vx || 0) * normalizedDist * 0.28;
            p.y += (this.mouse.vy || 0) * normalizedDist * 0.28;
          }
          
          // Fluid shear torque
          p.dYaw += (this.mouse.vx || 0) * 0.0009 + (dx > 0 ? 0.002 : -0.002);
          p.dPitch += (this.mouse.vy || 0) * 0.0009;
          p.targetDeformation = Math.min(0.4, force * 0.5);
        } else {
          p.targetDeformation = 0;
        }
      } else {
        p.targetDeformation = 0;
      }

      // Smooth decay of excess rotational velocity
      p.dYaw += ((Math.random() - 0.5) * 0.02 - p.dYaw) * 0.025;
      p.dPitch += ((Math.random() - 0.5) * 0.015 - p.dPitch) * 0.025;

      // Relaxation of biological deformation
      p.deformation += (p.targetDeformation - p.deformation) * 0.09;

      // Toroidal boundary wrapping
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

    // Sort by depth layer (background -> midground -> foreground) for proper volumetric occlusion
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
      const isSideView = Math.abs(aspectX) < 0.32 || Math.abs(aspectY) < 0.32;

      ctx.globalAlpha = p.opacity;

      // Sub-surface scattering halo on prominent foreground cells
      if (p.z === 2 && rx > 15) {
        const glowGrad = ctx.createRadialGradient(0, 0, rx * 0.6, 0, 0, rx * 1.35);
        glowGrad.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, 50%, 0.2)`);
        glowGrad.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, 50%, 0.0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx * 1.35, ry * 1.35, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Outer Torus Rim of the Erythrocyte
      const outerGrad = ctx.createRadialGradient(
        -rx * 0.18, -ry * 0.22, rx * 0.08,
        0, 0, Math.max(rx, ry)
      );

      const colorBase = `hsl(${p.hue}, ${p.sat}%, ${p.light}%)`;
      const colorHighlight = `hsl(${p.hue + 4}, ${p.sat + 6}%, ${p.light + 20}%)`;
      const colorShadow = `hsl(${p.hue - 6}, ${p.sat - 10}%, ${p.light - 16}%)`;
      const colorDimple = `hsl(${p.hue - 8}, ${p.sat - 15}%, ${p.light - 22}%)`;

      outerGrad.addColorStop(0, colorHighlight);
      outerGrad.addColorStop(0.42, colorBase);
      outerGrad.addColorStop(0.85, colorShadow);
      outerGrad.addColorStop(1, `hsla(${p.hue - 12}, ${p.sat}%, 10%, 0.85)`);

      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // Biconcave Central Dimple
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

        // Specular Crescent Highlight on the outer rim
        ctx.strokeStyle = `hsla(${p.hue + 10}, 100%, 78%, ${p.z === 2 ? 0.5 : 0.28})`;
        ctx.lineWidth = p.z === 2 ? 2.0 : 1.2;
        ctx.beginPath();
        ctx.ellipse(-rx * 0.08, -ry * 0.1, rx * 0.82, ry * 0.82, 0, -Math.PI * 0.75, -Math.PI * 0.15);
        ctx.stroke();
      }

      ctx.restore();
    }
  }
}

