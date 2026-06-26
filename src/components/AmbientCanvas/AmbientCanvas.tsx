'use client';
import React, { useEffect, useRef, memo } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export const AmbientCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = useTheme();
  const mode = theme.palette.mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (interpolated)
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    // Scroll velocity tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollAccumulator = 0;
    let canvasAlpha = 1.0;
    let scrollFade = 1.0;
    let isScrolling = false;
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Glow Blobs
    interface Blob {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      colorDark: string;
      colorLight: string;
      speed: number;
    }

    const blobs: Blob[] = [
      {
        x: width * 0.25,
        y: height * 0.3,
        targetX: width * 0.25,
        targetY: height * 0.3,
        size: Math.min(width, height) * 0.35,
        colorDark: 'rgba(99, 102, 241, 0.08)',
        colorLight: 'rgba(79, 70, 229, 0.06)',
        speed: 0.01,
      },
      {
        x: width * 0.75,
        y: height * 0.7,
        targetX: width * 0.75,
        targetY: height * 0.7,
        size: Math.min(width, height) * 0.4,
        colorDark: 'rgba(236, 72, 153, 0.05)',
        colorLight: 'rgba(219, 39, 119, 0.04)',
        speed: 0.008,
      },
    ];

    // Fluid Particles – scattered dots with independent random drift (no shared noise field)
    interface FluidParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      colorIdx: number;
    }

    const fluidParticles: FluidParticle[] = [];
    const maxParticles = 90;

    for (let i = 0; i < maxParticles; i++) {
      fluidParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        size: Math.random() * 1.0 + 1.8,
        alpha: Math.random() * 0.15 + 0.05,
        colorIdx: Math.floor(Math.random() * 3),
      });
    }

    // Helper for wave organic noise shape morphing
    const getWaveNoise = (nx: number, ny: number) => {
      return Math.sin(nx + Math.cos(ny) * 2) * 0.65 + Math.cos(nx * 0.5 - ny) * 0.35;
    };

    const animate = () => {
      // Clear fully
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Scroll velocity dampening
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      scrollVelocity = scrollDiff * 0.3;
      lastScrollY = currentScrollY;
      scrollVelocity *= 0.92;
      scrollAccumulator += Math.abs(scrollDiff) * 0.0025;

      // Smoothly transition scrollFade: dims slightly when scrolling, fades back to 1.0 when stopped.
      const targetScrollFade = isScrolling ? 0.45 : 1.0;
      scrollFade += (targetScrollFade - scrollFade) * 0.06;

      // Fade out canvas opacity dynamically on scroll depth and active scroll velocity
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = maxScroll > 0 ? currentScrollY / maxScroll : 0;

      // Baseline opacity goes down to 0.4 at the bottom. Active scroll velocity and scrollFade dim it further.
      const baseScrollAlpha = 1.0 - scrollRatio * 0.4;
      const velocityFade = Math.max(0.15, 1 - Math.abs(scrollVelocity) * 0.04);
      const targetCanvasAlpha = baseScrollAlpha * velocityFade * scrollFade;

      canvasAlpha += (targetCanvasAlpha - canvasAlpha) * 0.08;
      ctx.globalAlpha = canvasAlpha;

      // Calculate horizontal mouse parallax displacement
      const mouseXOffset = (mouse.x - width / 2) * -0.08;

      // 1. Draw Dot Matrix Grid (Magnetic spotlight + scroll drift + horizontal parallax)
      const dotSpacing = 60;
      const gridBaseAlpha = mode === 'dark' ? 0.03 : 0.04;
      for (let x = dotSpacing / 2; x < width + dotSpacing; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < height + dotSpacing; y += dotSpacing) {
          // Add parallax and vertical scroll shift
          const px = x + mouseXOffset;
          const py = y - (currentScrollY * 0.05) % dotSpacing;

          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = px;
          let drawY = py;
          let alpha = gridBaseAlpha;

          if (dist < 180) {
            const force = (180 - dist) / 180;
            alpha = gridBaseAlpha + force * 0.08;
            // Magnetic pull towards cursor
            drawX -= dx * force * 0.04;
            drawY -= dy * force * 0.04;
          }

          ctx.fillStyle = mode === 'dark'
            ? `rgba(255, 255, 255, ${alpha})`
            : `rgba(79, 70, 229, ${alpha})`;

          ctx.beginPath();
          ctx.arc(drawX, drawY, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw background blobs
      blobs.forEach((blob, idx) => {
        const offsetMultiplier = idx === 0 ? 0.03 : -0.02;
        blob.targetX = width * (idx === 0 ? 0.25 : 0.75) + (mouse.x - width / 2) * offsetMultiplier;
        blob.targetY = height * (idx === 0 ? 0.3 : 0.7) + (mouse.y - height / 2) * offsetMultiplier - scrollVelocity * 0.3;

        blob.x += (blob.targetX - blob.x) * blob.speed;
        blob.y += (blob.targetY - blob.y) * blob.speed;

        const blobColor = mode === 'dark' ? blob.colorDark : blob.colorLight;
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.size);
        grad.addColorStop(0, blobColor);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw flowing liquid waves with parallax scroll-flow (4 depth layers)
      const time = Date.now() * 0.0006;

      // Layered organic water noise — combines 3 sine waves for realistic water texture
      const getWaveY = (x: number, t: number, phase: number, amp: number) => {
        const n1 = Math.sin(x * 0.0018 + t * 0.5 + phase) * 0.55;
        const n2 = Math.sin(x * 0.0045 + t * 0.9 + phase * 1.4) * 0.3;
        const n3 = Math.cos(x * 0.003 - t * 0.35 + phase * 0.8) * 0.15;
        return (n1 + n2 + n3) * amp;
      };

      // Each wave layer has its own parallax scroll multiplier — deeper layers move faster
      const parallaxFactors = [0.07, 0.13, 0.19, 0.25];
      const waveColorsDark = [
        { fill: 'rgba(127, 86, 255, 0.07)', stroke: 'rgba(127, 86, 255, 0.14)' },
        { fill: 'rgba(0, 200, 255, 0.055)', stroke: 'rgba(0, 229, 255, 0.11)' },
        { fill: 'rgba(236, 72, 153, 0.04)', stroke: 'rgba(236, 72, 153, 0.08)' },
        { fill: 'rgba(100, 160, 255, 0.035)', stroke: 'rgba(100, 160, 255, 0.07)' },
      ];
      const waveColorsLight = [
        { fill: 'rgba(79, 70, 229, 0.05)', stroke: 'rgba(79, 70, 229, 0.09)' },
        { fill: 'rgba(6, 182, 212, 0.04)', stroke: 'rgba(6, 182, 212, 0.07)' },
        { fill: 'rgba(219, 39, 119, 0.03)', stroke: 'rgba(219, 39, 119, 0.055)' },
        { fill: 'rgba(14, 165, 233, 0.025)', stroke: 'rgba(14, 165, 233, 0.045)' },
      ];
      const activeWaveColors = mode === 'dark' ? waveColorsDark : waveColorsLight;

      for (let w = 0; w < 4; w++) {
        ctx.beginPath();

        // Parallax: each layer flows at a different speed as user scrolls
        const scrollParallax = currentScrollY * parallaxFactors[w];

        // Phase morphs with time AND scroll accumulator for continuous shape variation
        const phaseOffset = w * Math.PI * 0.65 + scrollAccumulator * (0.9 + w * 0.28) + time * 0.4;

        // Amplitude swells with scroll velocity, mouse height adjusts wave height
        const baseAmp = 38 + w * 22;
        const mouseAmpFactor = 1 + (mouse.y - height / 2) * -0.0007;
        const amplitude = baseAmp * mouseAmpFactor + Math.abs(scrollVelocity) * 7;

        // Wave center shifts with parallax creating a flowing-through-water feel
        const waveCenterBase = height * (0.44 + w * 0.12);
        const waveCenterY = waveCenterBase - scrollParallax;

        // Gradient: symmetric around wave center for a translucent lucid lens look
        const wc = activeWaveColors[w];
        const grad = ctx.createLinearGradient(0, waveCenterY - amplitude * 2.5, 0, waveCenterY + amplitude * 2.5);
        const baseColor = wc.fill.replace(/[\d.]+\)$/, '');
        const fillA = parseFloat((wc.fill.match(/([\d.]+)\)$/) || ['', '0.05'])[1]);
        grad.addColorStop(0, baseColor + '0)');
        grad.addColorStop(0.35, wc.fill);
        grad.addColorStop(0.65, baseColor + (fillA * 0.5).toFixed(3) + ')');
        grad.addColorStop(1, baseColor + '0)');

        // Fill wave
        ctx.moveTo(-150, height + 100);
        for (let x = -150; x < width + 150; x += 12) {
          const shiftX = x + mouseXOffset;
          const y = waveCenterY + getWaveY(x, time, phaseOffset, amplitude);
          ctx.lineTo(shiftX, y);
        }
        ctx.lineTo(width + 150, height + 100);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Luminescent shimmer line at wave crest
        ctx.beginPath();
        for (let x = -150; x < width + 150; x += 12) {
          const shiftX = x + mouseXOffset;
          const y = waveCenterY + getWaveY(x, time, phaseOffset, amplitude);
          if (x === -150) ctx.moveTo(shiftX, y);
          else ctx.lineTo(shiftX, y);
        }
        ctx.strokeStyle = wc.stroke;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 4. Draw & Update Fluid Particles (following vector noise currents)
      const colorsDark = [
        'rgba(127, 86, 255, ',  // Violet
        'rgba(0, 229, 255, ',   // Cyber Cyan
        'rgba(255, 51, 153, ',  // Pink
      ];
      const colorsLight = [
        'rgba(79, 70, 229, ',   // Indigo
        'rgba(6, 182, 212, ',   // Cyan
        'rgba(219, 39, 119, ',  // Pink
      ];
      const activePalette = mode === 'dark' ? colorsDark : colorsLight;

      fluidParticles.forEach((p) => {
        // Organic, independent random drift (no shared vector field)
        p.vx += (Math.random() - 0.5) * 0.08;
        p.vy += (Math.random() - 0.5) * 0.08;

        // Mouse influence – push particles away from the cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        // Speed limit clamp to keep drift gentle and organic
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 0.1;
        const minSpeed = 0.3;
        const maxSpeed = 1.2;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        } else if (speed < minSpeed) {
          p.vx = (p.vx / speed) * minSpeed;
          p.vy = (p.vy / speed) * minSpeed;
        }

        // Scroll velocity push
        p.vy += scrollVelocity * 0.3;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wall bounce to stay within viewport bounds
        if (p.x < 10) { p.x = 10; p.vx *= -1; }
        if (p.x > width - 10) { p.x = width - 10; p.vx *= -1; }
        if (p.y < 10) { p.y = 10; p.vy *= -1; }
        if (p.y > height - 10) { p.y = height - 10; p.vy *= -1; }

        // Draw as a pure circle (no trailing history)
        ctx.beginPath();
        ctx.arc(p.x + mouseXOffset, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = activePalette[p.colorIdx] + `${p.alpha})`;
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        mixBlendMode: (theme) => theme.palette.mode === 'light' ? 'normal' : 'screen',
        backgroundImage: (theme) => theme.palette.mode === 'light'
          ? 'linear-gradient(rgba(79, 70, 229, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.015) 1px, transparent 1px)'
          : 'linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }}
    />
  );
});

export default AmbientCanvas;
