"use client";

import { useRef, useEffect, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  label: string;
  radius: number;
}

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
  p0x: number,
  p0y: number,
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number,
  p3x: number,
  p3y: number,
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
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

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
      console.log(`[HeroVisual] Canvas sized: ${W}x${H} @${dpr}x`);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const colLeft = W * 0.15;
    const colCenter = W * 0.5;
    const colRight = W * 0.85;
    const topPad = 50;
    const botPad = 30;
    const usableH = H - topPad - botPad;

    // Build nodes
    const leftNodes: Node[] = LEFT_LABELS.map((label, i) => ({
      x: colLeft,
      y: topPad + (usableH / (LEFT_LABELS.length + 1)) * (i + 1),
      label,
      radius: 6,
    }));

    const rightNodes: Node[] = RIGHT_LABELS.map((label, i) => ({
      x: colRight,
      y: topPad + (usableH / (RIGHT_LABELS.length + 1)) * (i + 1),
      label,
      radius: 6,
    }));

    const centerNode: Node = {
      x: colCenter,
      y: H / 2,
      label: "Stablus AI",
      radius: 22,
    };

    // Column headers
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillText("Your Institution", colLeft, topPad - 16);
    ctx.fillText("GCC Regulators", colRight, topPad - 16);

    // Build curves
    type Curve = {
      p0x: number;
      p0y: number;
      p1x: number;
      p1y: number;
      p2x: number;
      p2y: number;
      p3x: number;
      p3y: number;
    };

    const leftCurves: Curve[] = leftNodes.map((n) => {
      const dx = (colCenter - colLeft) * 0.45;
      return {
        p0x: n.x,
        p0y: n.y,
        p1x: n.x + dx,
        p1y: n.y,
        p2x: centerNode.x - dx,
        p2y: centerNode.y,
        p3x: centerNode.x,
        p3y: centerNode.y,
      };
    });

    const rightCurves: Curve[] = rightNodes.map((n) => {
      const dx = (colRight - colCenter) * 0.45;
      return {
        p0x: centerNode.x,
        p0y: centerNode.y,
        p1x: centerNode.x + dx,
        p1y: centerNode.y,
        p2x: n.x - dx,
        p2y: n.y,
        p3x: n.x,
        p3y: n.y,
      };
    });

    // Draw guide lines
    const drawCurve = (c: Curve) => {
      ctx.beginPath();
      ctx.moveTo(c.p0x, c.p0y);
      ctx.bezierCurveTo(c.p1x, c.p1y, c.p2x, c.p2y, c.p3x, c.p3y);
      ctx.strokeStyle = "rgba(212,168,67,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    leftCurves.forEach(drawCurve);
    rightCurves.forEach(drawCurve);

    // Draw institution nodes (left)
    leftNodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "9px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillText(n.label, n.x, n.y + n.radius + 14);
    });

    // Draw regulator nodes (right)
    rightNodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212,168,67,0.07)";
      ctx.fill();
      ctx.strokeStyle = "rgba(212,168,67,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(212,168,67,0.6)";
      ctx.fillText(n.label, n.x, n.y + n.radius + 14);
    });

    // Draw AI center node with pulse
    pulseRef.current += 0.02;
    const pulseScale = 1 + Math.sin(pulseRef.current) * 0.15;
    const pulseAlpha = 0.3 - Math.sin(pulseRef.current) * 0.15;

    // Pulse ring
    ctx.beginPath();
    ctx.arc(
      centerNode.x,
      centerNode.y,
      centerNode.radius * pulseScale * 1.8,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = `rgba(212,168,67,${pulseAlpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center node
    ctx.beginPath();
    ctx.arc(centerNode.x, centerNode.y, centerNode.radius, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(
      centerNode.x,
      centerNode.y,
      0,
      centerNode.x,
      centerNode.y,
      centerNode.radius
    );
    grad.addColorStop(0, "rgba(212,168,67,0.25)");
    grad.addColorStop(1, "rgba(212,168,67,0.05)");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgba(212,168,67,0.8)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = "bold 8px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(212,168,67,0.9)";
    ctx.fillText("STABLUS", centerNode.x, centerNode.y - 2);
    ctx.font = "7px Inter, sans-serif";
    ctx.fillStyle = "rgba(212,168,67,0.6)";
    ctx.fillText("AI ENGINE", centerNode.x, centerNode.y + 8);

    // Manage particles
    const particles = particlesRef.current;

    // Spawn new particles
    if (Math.random() < 0.08) {
      particles.push({
        t: 0,
        speed: 0.003 + Math.random() * 0.004,
        curveIndex: Math.floor(Math.random() * leftCurves.length),
        direction: "left",
      });
    }
    if (Math.random() < 0.08) {
      particles.push({
        t: 0,
        speed: 0.003 + Math.random() * 0.004,
        curveIndex: Math.floor(Math.random() * rightCurves.length),
        direction: "right",
      });
    }

    // Draw and update particles
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
      if (!c) {
        particles.splice(i, 1);
        continue;
      }

      const pos = bezierPoint(
        c.p0x,
        c.p0y,
        c.p1x,
        c.p1y,
        c.p2x,
        c.p2y,
        c.p3x,
        c.p3y,
        p.t
      );

      let r: number, g: number, b: number;

      if (p.direction === "left") {
        r = Math.round(lerp(white.r, gold.r, p.t));
        g = Math.round(lerp(white.g, gold.g, p.t));
        b = Math.round(lerp(white.b, gold.b, p.t));
      } else {
        r = gold.r;
        g = gold.g;
        b = gold.b;
      }

      const alpha = p.t < 0.1 ? p.t * 10 : p.t > 0.9 ? (1 - p.t) * 10 : 1;

      // Trail
      for (let trail = 3; trail >= 0; trail--) {
        const tt = Math.max(0, p.t - trail * 0.015);
        const tp = bezierPoint(
          c.p0x,
          c.p0y,
          c.p1x,
          c.p1y,
          c.p2x,
          c.p2y,
          c.p3x,
          c.p3y,
          tt
        );
        const ta = alpha * (1 - trail * 0.25) * 0.6;
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, 2 - trail * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${ta})`;
        ctx.fill();
      }

      // Main particle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.9})`;
      ctx.fill();
    }

    // Cap particle count
    if (particles.length > 60) {
      particles.splice(0, particles.length - 60);
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    // Small delay to ensure container has layout dimensions
    const startTimeout = setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(draw);
    }, 50);

    const canvas = canvasRef.current;
    const observer = new ResizeObserver(() => {
      // Force canvas dimension recalculation on next frame
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
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
      className="hidden md:block w-full relative"
      style={{ height: "420px", background: "transparent" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
