'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate particles
    const count = Math.min(100, Math.floor((width * height) / 12000));
    const particles: Particle[] = [];

    const colors = [
      'rgba(230, 200, 117, ', // Gold
      'rgba(79, 134, 247, ',  // Cosmic blue
      'rgba(255, 255, 255, ', // White star
      'rgba(147, 51, 234, ',  // Deep purple
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.1,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        pulseSpeed: Math.random() * 0.005 + 0.002,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space radial background glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        0,
        width / 2,
        height * 0.4,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, 'rgba(15, 20, 32, 0.4)');
      grad.addColorStop(0.5, 'rgba(8, 10, 15, 0.8)');
      grad.addColorStop(1, 'rgba(5, 6, 8, 1)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render stars / cosmic dust
      time += 0.01;
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Pulse opacity
          p.alpha = 0.2 + Math.sin(time * p.pulseSpeed * 10) * 0.3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, Math.min(1, p.alpha))})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
