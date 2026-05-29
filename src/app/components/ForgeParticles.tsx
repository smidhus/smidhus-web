"use client";

import { useEffect, useRef } from "react";

type AmbientParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

export type SparkParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  friction: number;
};

export const INCANDESCENT_YELLOW = "#FFD800";
export const FORGE_ORANGE = "#FF6B00";

const AMBIENT_COUNT = 68;
const MAX_POINTER_INFLUENCE = 180;

function createAmbientParticle(width: number, height: number): AmbientParticle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    radius: Math.random() * 1.4 + 0.6,
    alpha: Math.random() * 0.28 + 0.12,
  };
}

export function createSparkBurst(x: number, y: number, count = 24): SparkParticle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2.5;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 2 + 1.1,
      alpha: 1,
      decay: Math.random() * 0.022 + 0.018,
      friction: 0.95,
    };
  });
}

export function mixSparkColor(t: number): string {
  const p = Math.min(1, Math.max(0, t));
  const start = { r: 255, g: 216, b: 0 };
  const end = { r: 255, g: 107, b: 0 };
  const g = Math.round(start.g + (end.g - start.g) * p);

  return `rgb(${start.r} ${g} ${start.b})`;
}

export default function ForgeParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const ambientRef = useRef<AmbientParticle[]>([]);
  const sparksRef = useRef<SparkParticle[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (ambientRef.current.length === 0) {
        ambientRef.current = Array.from({ length: AMBIENT_COUNT }, () =>
          createAmbientParticle(width, height),
        );
      } else {
        ambientRef.current = ambientRef.current.map((particle) => ({
          ...particle,
          x: Math.min(Math.max(particle.x, 0), width),
          y: Math.min(Math.max(particle.y, 0), height),
        }));
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    const onPointerDown = (event: PointerEvent) => {
      sparksRef.current.push(...createSparkBurst(event.clientX, event.clientY, 30));
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);

      for (const particle of ambientRef.current) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
        }

        const pointer = pointerRef.current;
        if (pointer) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0 && distance < MAX_POINTER_INFLUENCE) {
            const strength = (MAX_POINTER_INFLUENCE - distance) / MAX_POINTER_INFLUENCE;
            const force = strength * 0.03;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.vx *= 0.985;
        particle.vy *= 0.985;

        context.beginPath();
        context.fillStyle = `rgba(255, 107, 0, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      const nextSparks: SparkParticle[] = [];

      for (const spark of sparksRef.current) {
        spark.vx *= spark.friction;
        spark.vy *= spark.friction;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0) {
          continue;
        }

        const progress = 1 - spark.alpha;
        context.beginPath();
        context.fillStyle = mixSparkColor(progress)
          .replace("rgb(", "rgba(")
          .replace(")", `, ${spark.alpha})`);
        context.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        context.fill();
        nextSparks.push(spark);
      }

      sparksRef.current = nextSparks;
      frameRef.current = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    frameRef.current = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-10" />;
}
