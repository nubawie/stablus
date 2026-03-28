'use client';
import { useEffect, useRef } from 'react';

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, cx = 0, cy = 0;
    let animId: number;

    const INSTS = ['Central Bank UAE','Commercial Bank GCC','Exchange Licensed','Fintech Startup'];
    const REGS = [
      { n: 'CBUAE', s: 'Central Bank of UAE' },
      { n: 'DFSA',  s: 'Dubai Financial Services' },
      { n: 'ADGM',  s: 'Abu Dhabi Global Market' },
      { n: 'VARA',  s: 'Virtual Assets Authority' },
      { n: 'SCA',   s: 'Securities & Commodities' },
    ];

    const IW = 158, IH = 46, RW = 158, RH = 46;
    const MAX_P = 14;
    const particles: { side: string; idx: number; t: number; speed: number; size: number; alpha: number }[] = [];

    function getInstPos(i: number) {
      const spacing = 72;
      return { x: 130, y: cy - (INSTS.length - 1) * spacing / 2 + i * spacing };
    }
    function getRegPos(i: number) {
      const spacing = 64;
      return { x: W - 130, y: cy - (REGS.length - 1) * spacing / 2 + i * spacing };
    }

    function bezierPt(t: number, x0:number,y0:number,x1:number,y1:number,x2:number,y2:number,x3:number,y3:number) {
      const u = 1 - t;
      return {
        x: u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3,
        y: u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3,
      };
    }

    function spawnParticle() {
      const goLeft = Math.random() < 0.45;
      return {
        side: goLeft ? 'L' : 'R',
        idx: goLeft ? Math.floor(Math.random() * INSTS.length) : Math.floor(Math.random() * REGS.length),
        t: 0,
        speed: 0.0018 + Math.random() * 0.0012,
        size: 2.5 + Math.random() * 2,
        alpha: 0,
      };
    }

    for (let i = 0; i < MAX_P; i++) {
      const p = spawnParticle();
      p.t = Math.random();
      particles.push(p);
    }

    function drawRoundRect(x:number,y:number,w:number,h:number,r:number) {
      ctx!.beginPath();
      ctx!.moveTo(x+r,y); ctx!.lineTo(x+w-r,y); ctx!.arcTo(x+w,y,x+w,y+r,r);
      ctx!.lineTo(x+w,y+h-r); ctx!.arcTo(x+w,y+h,x+w-r,y+h,r);
      ctx!.lineTo(x+r,y+h); ctx!.arcTo(x,y+h,x,y+h-r,r);
      ctx!.lineTo(x,y+r); ctx!.arcTo(x,y,x+r,y,r);
      ctx!.closePath();
    }

    let aiPulse = 0;

    function draw() {
      if (!ctx) return;
      if (!W || !H) { animId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = '#0a0a0f'; ctx.fillRect(0,0,W,H);
      aiPulse += 0.02;

      // Guide lines
      INSTS.forEach((_,i) => {
        const p = getInstPos(i);
        ctx!.beginPath();
        ctx!.moveTo(p.x + IW/2, p.y);
        ctx!.bezierCurveTo(cx-130, p.y, cx-130, cy, cx-52, cy);
        ctx!.strokeStyle = 'rgba(212,168,67,0.07)'; ctx!.lineWidth=1; ctx!.stroke();
      });
      REGS.forEach((_,i) => {
        const p = getRegPos(i);
        ctx!.beginPath();
        ctx!.moveTo(cx+52, cy);
        ctx!.bezierCurveTo(cx+130, cy, cx+130, p.y, p.x-RW/2, p.y);
        ctx!.strokeStyle = 'rgba(212,168,67,0.07)'; ctx!.lineWidth=1; ctx!.stroke();
      });

      // Particles
      particles.forEach((p,pi) => {
        p.t += p.speed;
        if (p.t > 1.05) { particles[pi] = spawnParticle(); return; }
        const fadeIn = Math.min(1, p.t / 0.08);
        const fadeOut = Math.min(1, (1.05 - p.t) / 0.08);
        p.alpha = Math.min(fadeIn, fadeOut);
        let pt;
        if (p.side === 'L') {
          const src = getInstPos(p.idx);
          pt = bezierPt(Math.min(p.t,1), src.x+IW/2,src.y, cx-130,src.y, cx-130,cy, cx-52,cy);
        } else {
          const tgt = getRegPos(p.idx);
          pt = bezierPt(Math.min(p.t,1), cx+52,cy, cx+130,cy, cx+130,tgt.y, tgt.x-RW/2,tgt.y);
        }
        const mix = p.side==='L' ? Math.min(1, p.t*2.5) : 1;
        const r2 = Math.round(255*(1-mix)+212*mix);
        const g2 = Math.round(255*(1-mix)+168*mix);
        const b2 = Math.round(255*(1-mix)+67*mix);
        const a = p.alpha * 0.85;
        ctx!.beginPath(); ctx!.arc(pt.x,pt.y,p.size+4,0,Math.PI*2);
        ctx!.fillStyle=`rgba(${r2},${g2},${b2},${a*0.15})`; ctx!.fill();
        ctx!.beginPath(); ctx!.arc(pt.x,pt.y,p.size,0,Math.PI*2);
        ctx!.fillStyle=`rgba(${r2},${g2},${b2},${a})`; ctx!.fill();
      });

      // Institution nodes
      const instSubs: Record<string, string> = {
        'Central Bank UAE': 'CBUAE Licensed',
        'Commercial Bank GCC': 'Regional Institution',
        'Exchange Licensed': 'VARA / DFSA',
        'Fintech Startup': 'Regulated Entity',
      };
      INSTS.forEach((label,i) => {
        const p = getInstPos(i);
        drawRoundRect(p.x-IW/2, p.y-IH/2, IW, IH, 6);
        ctx!.fillStyle='rgba(255,255,255,0.05)'; ctx!.strokeStyle='rgba(255,255,255,0.25)'; ctx!.lineWidth=1; ctx!.fill(); ctx!.stroke();
        ctx!.fillStyle='rgba(255,255,255,0.9)'; ctx!.font='700 14px -apple-system,sans-serif'; ctx!.textAlign='center'; ctx!.textBaseline='middle';
        ctx!.fillText(label, p.x, p.y-6);
        ctx!.fillStyle='rgba(255,255,255,0.35)'; ctx!.font='400 10px -apple-system,sans-serif';
        ctx!.fillText(instSubs[label] || '', p.x, p.y+8);
      });

      // Regulator nodes
      REGS.forEach((reg,i) => {
        const p = getRegPos(i);
        drawRoundRect(p.x-RW/2, p.y-RH/2, RW, RH, 6);
        ctx!.fillStyle='rgba(212,168,67,0.08)'; ctx!.strokeStyle='rgba(212,168,67,0.45)'; ctx!.lineWidth=1; ctx!.fill(); ctx!.stroke();
        ctx!.fillStyle='rgba(212,168,67,1.0)'; ctx!.font='700 14px -apple-system,sans-serif'; ctx!.textAlign='center'; ctx!.textBaseline='middle';
        ctx!.fillText(reg.n, p.x, p.y-6);
        ctx!.fillStyle='rgba(255,255,255,0.35)'; ctx!.font='400 10px -apple-system,sans-serif';
        ctx!.fillText(reg.s, p.x, p.y+8);
      });

      // Center AI node
      const pulse = Math.sin(aiPulse)*0.5+0.5;
      const CR = 52;
      ctx!.beginPath(); ctx!.arc(cx,cy,CR+14+pulse*8,0,Math.PI*2);
      ctx!.strokeStyle=`rgba(212,168,67,${0.05+pulse*0.08})`; ctx!.lineWidth=1; ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(cx,cy,CR+6,0,Math.PI*2);
      ctx!.strokeStyle='rgba(212,168,67,0.12)'; ctx!.lineWidth=1; ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(cx,cy,CR,0,Math.PI*2);
      ctx!.fillStyle='rgba(10,10,15,0.95)'; ctx!.strokeStyle='rgba(212,168,67,0.85)'; ctx!.lineWidth=2; ctx!.fill(); ctx!.stroke();
      ctx!.fillStyle='rgba(212,168,67,0.95)'; ctx!.font='700 15px -apple-system,sans-serif'; ctx!.textAlign='center'; ctx!.textBaseline='middle';
      ctx!.fillText('Stablus', cx, cy-8);
      ctx!.fillStyle='rgba(255,255,255,0.4)'; ctx!.font='400 11px -apple-system,sans-serif';
      ctx!.fillText('AI Engine', cx, cy+10);

      animId = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width; canvas.height = r.height;
      W = r.width; H = r.height; cx = W/2; cy = H/2;
    });
    observer.observe(canvas);

    setTimeout(() => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width; canvas.height = r.height;
      W = r.width; H = r.height; cx = W/2; cy = H/2;
      draw();
    }, 80);

    return () => { cancelAnimationFrame(animId); observer.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
