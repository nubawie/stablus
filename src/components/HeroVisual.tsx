"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  t: number;
  speed: number;
  curveIndex: number;
  direction: "left" | "right";
}

const LEFT_LABELS = [
  "Central Bank UAE",
  "Commercial Bank GCC",
  "Exchange Licensed",
  "Fintech Startup",
];

const RIGHT_LABELS = ["CBUAE", "DFSA", "ADGM", "VARA", "SCA"];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function bezierPoint(
  p0x: number, p0y: number,
  p1x: number, p1y: number,
  p2x: number, p2y: number,
  p3x: number, p3y: number,
  t: number
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * p0x + 3 * uu * t * p1x + 3 * u * tt * p2x + ttt * p3x,
    y: uuu * p0y + 3 * uu * t * p1y + 3 * u * tt * p2y + ttt * p3y,
  };
}

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

type Curve = {
  p0x: number; p0y: number;
  p1x: number; p1y: number;
  p2x: number; p2y: number;
  p3x: number; p3y: number;
};

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const pulseRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = container.offsetWidth;
    const H = container.offsetHeight;

    if (W === 0 || H === 0) {
      animFrameRef.current = requestAnimationFrame(draw);
      return;
    }

    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const isCompact = W < 500;

    // Layout
    const colLeft = 110;
    const colRight = W - 110;
    const colCenter = W / 2;

    // Node box sizes
    const instW = 130;
    const instH = 44;
    const regW = 140;
    const regH = 44;
    const aiRadius = 52;

    // Build node positions — centered vertically
    const instSpacing = 75;
    const regSpacing = 65;
    const leftStartY = (H - (LEFT_LABELS.length - 1) * instSpacing) / 2;
    const rightStartY = (H - (RIGHT_LABELS.length - 1) * regSpacing) / 2;
    const leftYs = LEFT_LABELS.map((_, i) => leftStartY + i * instSpacing);
    const rightYs = RIGHT_LABELS.map((_, i) => rightStartY + i * regSpacing);
    const centerY = H / 2;

    // Build curves
    const leftCurves: Curve[] = leftYs.map((y) => {
      const dx = 140;
      return {
        p0x: colLeft + instW / 2, p0y: y,
        p1x: colLeft + instW / 2 + dx, p1y: y,
        p2x: colCenter - dx, p2y: centerY,
        p3x: colCenter, p3y: centerY,
      };
    });

    const rightCurves: Curve[] = rightYs.map((y) => {
      const dx = 140;
      return {
        p0x: colCenter, p0y: centerY,
        p1x: colCenter + dx, p1y: centerY,
        p2x: colRight - regW / 2 - dx, p2y: y,
        p3x: colRight - regW / 2, p3y: y,
      };
    });

    // Draw guide lines
    const drawGuideLine = (c: Curve) => {
      ctx.beginPath();
      ctx.moveTo(c.p0x, c.p0y);
      ctx.bezierCurveTo(c.p1x, c.p1y, c.p2x, c.p2y, c.p3x, c.p3y);
      ctx.strokeStyle = "rgba(212,168,67,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    leftCurves.forEach(drawGuideLine);
    rightCurves.forEach(drawGuideLine);

    // Draw institution nodes (left) — rounded rectangles
    LEFT_LABELS.forEach((label, i) => {
      const y = leftYs[i];
      const bx = colLeft - instW / 2;
      const by = y - instH / 2;

      roundRect(ctx, bx, by, instW, instH, 5);
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "500 13px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText(label, colLeft, y + 4);
    });

    // Draw regulator nodes (right) — rounded rectangles
    RIGHT_LABELS.forEach((label, i) => {
      const y = rightYs[i];
      const bx = colRight - regW / 2;
      const by = y - regH / 2;

      roundRect(ctx, bx, by, regW, regH, 5);
      ctx.fillStyle = "rgba(212,168,67,0.07)";
      ctx.fill();
      ctx.strokeStyle = "rgba(212,168,67,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "600 14px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(212,168,67,1.0)";
      ctx.fillText(label, colRight, y + 1);

      if (!isCompact) {
        const subLabels: Record<string, string> = {
          CBUAE: "Central Bank of the UAE",
          DFSA: "Dubai Financial Services",
          ADGM: "Abu Dhabi Global Market",
          VARA: "Virtual Assets Authority",
          SCA: "Securities & Commodities",
        };
        ctx.font = "400 10px Inter, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillText(subLabels[label] || "", colRight, y + 14);
      }
    });

    // AI center node with pulse
    pulseRef.current += 0.02;
    const pulseScale = 1 + Math.sin(pulseRef.current) * 0.15;
    const pulseAlpha = 0.3 - Math.sin(pulseRef.current) * 0.15;

    // Outer pulse ring
    const pulseOuter = aiRadius + pulseScale * 12;
    ctx.beginPath();
    ctx.arc(colCenter, centerY, pulseOuter * 1.3, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(212,168,67,${pulseAlpha * 0.4})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner pulse ring
    ctx.beginPath();
    ctx.arc(colCenter, centerY, pulseOuter, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(212,168,67,${pulseAlpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center node fill
    ctx.beginPath();
    ctx.arc(colCenter, centerY, aiRadius, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(
      colCenter, centerY, 0,
      colCenter, centerY, aiRadius
    );
    grad.addColorStop(0, "rgba(212,168,67,0.2)");
    grad.addColorStop(1, "rgba(212,168,67,0.04)");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgba(212,168,67,0.9)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center node text
    ctx.font = "600 14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(212,168,67,0.9)";
    ctx.fillText("Stablus", colCenter, centerY - 3);
    ctx.font = "500 11px Inter, sans-serif";
    ctx.fillStyle = "rgba(212,168,67,0.55)";
    ctx.fillText("AI Engine", colCenter, centerY + 13);

    // Particles
    const particles = particlesRef.current;

    if (Math.random() < 0.09) {
      particles.push({
        t: 0,
        speed: 0.0025 + Math.random() * 0.0035,
        curveIndex: Math.floor(Math.random() * leftCurves.length),
        direction: "left",
      });
    }
    if (Math.random() < 0.09) {
      particles.push({
        t: 0,
        speed: 0.0025 + Math.random() * 0.0035,
        curveIndex: Math.floor(Math.random() * rightCurves.length),
        direction: "right",
      });
    }

    const white = hexToRgb("#FFFFFF");
    const gold = hexToRgb("#D4A843");

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.t += p.speed;

      if (p.t > 1) {
        particles.splice(i, 1);
        continue;
      }

      const curves = p.direction === "left" ? leftCurves : rightCurves;
      const c = curves[p.curveIndex];
      if (!c) { particles.splice(i, 1); continue; }

      const pos = bezierPoint(
        c.p0x, c.p0y, c.p1x, c.p1y,
        c.p2x, c.p2y, c.p3x, c.p3y, p.t
      );

      let r: number, g: number, b: number;
      if (p.direction === "left") {
        r = Math.round(lerp(white.r, gold.r, p.t));
        g = Math.round(lerp(white.g, gold.g, p.t));
        b = Math.round(lerp(white.b, gold.b, p.t));
      } else {
        r = gold.r; g = gold.g; b = gold.b;
      }

      const alpha = p.t < 0.1 ? p.t * 10 : p.t > 0.9 ? (1 - p.t) * 10 : 1;

      // Trail (18 steps)
      for (let trail = 5; trail >= 0; trail--) {
        const tt = Math.max(0, p.t - trail * 0.012);
        const tp = bezierPoint(
          c.p0x, c.p0y, c.p1x, c.p1y,
          c.p2x, c.p2y, c.p3x, c.p3y, tt
        );
        const ta = alpha * (1 - trail * 0.16) * 0.5;
        const tr = 3.5 - trail * 0.5;
        if (tr > 0) {
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, tr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${ta})`;
          ctx.fill();
        }
      }

      // Main particle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.85})`;
      ctx.fill();
    }

    if (particles.length > 80) {
      particles.splice(0, particles.length - 80);
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(draw);
    }, 50);

    const canvas = canvasRef.current;
    const observer = new ResizeObserver(() => {
      if (canvas) { canvas.width = 0; canvas.height = 0; }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className="hidden md:block w-full h-full relative min-h-[500px]"
      style={{ background: "transparent" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
