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
    let aiPulse = 0;

    const isDark = () => document.documentElement.classList.contains('dark')
      || window.matchMedia('(prefers-color-scheme: dark)').matches;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSchemeChange = () => { /* canvas redraws on next frame automatically */ };
    mq.addEventListener('change', onSchemeChange);

    const INSTS = [
      { n: 'Central Bank UAE',    s: 'CBUAE Licensed' },
      { n: 'Commercial Bank GCC', s: 'Regional Institution' },
      { n: 'Exchange Licensed',   s: 'VARA / DFSA' },
      { n: 'Fintech Startup',     s: 'Regulated Entity' },
    ];
    const REGS = [
      { n: 'CBUAE', s: 'Central Bank of UAE' },
      { n: 'DFSA',  s: 'Dubai Financial Services' },
      { n: 'ADGM',  s: 'Abu Dhabi Global Market' },
      { n: 'VARA',  s: 'Virtual Assets Authority' },
      { n: 'SCA',   s: 'Securities & Commodities' },
    ];

    const MAX_P = 14;
    const particles: { side: string; idx: number; t: number; speed: number; size: number; alpha: number }[] = [];

    function NW() { return Math.min(W * 0.28, 190); }
    function leftX() { return W * 0.16; }
    function rightX() { return W * 0.84; }
    function instSpacing() { return Math.min(82, (H - 60) / INSTS.length); }
    function regSpacing()  { return Math.min(74, (H - 60) / REGS.length); }
    const NH = 52;

    function getInstPos(i: number) {
      return { x: leftX(), y: cy - (INSTS.length-1)*instSpacing()/2 + i*instSpacing() };
    }
    function getRegPos(i: number) {
      return { x: rightX(), y: cy - (REGS.length-1)*regSpacing()/2 + i*regSpacing() };
    }

    function bezierPt(t:number,x0:number,y0:number,x1:number,y1:number,x2:number,y2:number,x3:number,y3:number) {
      const u=1-t;
      return { x:u*u*u*x0+3*u*u*t*x1+3*u*t*t*x2+t*t*t*x3, y:u*u*u*y0+3*u*u*t*y1+3*u*t*t*y2+t*t*t*y3 };
    }

    function spawnParticle() {
      const goLeft = Math.random() < 0.45;
      return {
        side: goLeft ? 'L' : 'R',
        idx: goLeft ? Math.floor(Math.random()*INSTS.length) : Math.floor(Math.random()*REGS.length),
        t: 0,
        speed: 0.0018 + Math.random()*0.0012,
        size: 2.5 + Math.random()*2,
        alpha: 0,
      };
    }

    for (let i=0; i<MAX_P; i++) {
      const p = spawnParticle(); p.t = Math.random(); particles.push(p);
    }

    function rr(x:number,y:number,w:number,h:number,r:number) {
      ctx!.beginPath();
      ctx!.moveTo(x+r,y); ctx!.lineTo(x+w-r,y); ctx!.arcTo(x+w,y,x+w,y+r,r);
      ctx!.lineTo(x+w,y+h-r); ctx!.arcTo(x+w,y+h,x+w-r,y+h,r);
      ctx!.lineTo(x+r,y+h); ctx!.arcTo(x,y+h,x,y+h-r,r);
      ctx!.lineTo(x,y+r); ctx!.arcTo(x,y,x+r,y,r);
      ctx!.closePath();
    }

    function draw() {
      if (!ctx) return;
      if (!W||!H) { animId=requestAnimationFrame(draw); return; }
      ctx.clearRect(0,0,W,H);
      aiPulse+=0.02;

      const dark = isDark();
      const nw=NW(), cpx=W*0.22, CR=Math.min(W*0.09,52);

      // Theme-aware colors
      const guideStroke = dark ? 'rgba(212,168,67,0.12)' : 'rgba(180,140,50,0.25)';
      const instFill = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
      const instStroke = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
      const instLabel = dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)';
      const instSub = dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';
      const centerFill = dark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)';
      const engineText = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

      // Guide lines
      INSTS.forEach((_,i)=>{
        const p=getInstPos(i);
        ctx!.beginPath(); ctx!.moveTo(p.x+nw/2,p.y);
        ctx!.bezierCurveTo(cx-cpx,p.y,cx-cpx,cy,cx-CR,cy);
        ctx!.strokeStyle=guideStroke; ctx!.lineWidth=1; ctx!.stroke();
      });
      REGS.forEach((_,i)=>{
        const p=getRegPos(i);
        ctx!.beginPath(); ctx!.moveTo(cx+CR,cy);
        ctx!.bezierCurveTo(cx+cpx,cy,cx+cpx,p.y,p.x-nw/2,p.y);
        ctx!.strokeStyle=guideStroke; ctx!.lineWidth=1; ctx!.stroke();
      });

      // Particles
      particles.forEach((p,pi)=>{
        p.t+=p.speed;
        if(p.t>1.05){particles[pi]=spawnParticle();return;}
        const fadeIn=Math.min(1,p.t/0.08), fadeOut=Math.min(1,(1.05-p.t)/0.08);
        p.alpha=Math.min(fadeIn,fadeOut);
        let pt;
        if(p.side==='L'){
          const src=getInstPos(p.idx);
          pt=bezierPt(Math.min(p.t,1),src.x+nw/2,src.y,cx-cpx,src.y,cx-cpx,cy,cx-CR,cy);
        } else {
          const tgt=getRegPos(p.idx);
          pt=bezierPt(Math.min(p.t,1),cx+CR,cy,cx+cpx,cy,cx+cpx,tgt.y,tgt.x-nw/2,tgt.y);
        }
        const mix=p.side==='L'?Math.min(1,p.t*2.5):1;
        const r2=Math.round(255*(1-mix)+212*mix), g2=Math.round(255*(1-mix)+168*mix), b2=Math.round(255*(1-mix)+67*mix);
        const a=p.alpha*0.85;
        ctx!.beginPath(); ctx!.arc(pt.x,pt.y,p.size+4,0,Math.PI*2);
        ctx!.fillStyle=`rgba(${r2},${g2},${b2},${a*0.15})`; ctx!.fill();
        ctx!.beginPath(); ctx!.arc(pt.x,pt.y,p.size,0,Math.PI*2);
        ctx!.fillStyle=`rgba(${r2},${g2},${b2},${a})`; ctx!.fill();
      });

      // Institution nodes
      INSTS.forEach((inst,i)=>{
        const p=getInstPos(i);
        rr(p.x-nw/2,p.y-NH/2,nw,NH,6);
        ctx!.fillStyle=instFill; ctx!.strokeStyle=instStroke; ctx!.lineWidth=0.8; ctx!.fill(); ctx!.stroke();
        ctx!.fillStyle=instLabel; ctx!.font='600 14px -apple-system,sans-serif'; ctx!.textAlign='center'; ctx!.textBaseline='middle';
        ctx!.fillText(inst.n,p.x,p.y-7);
        ctx!.fillStyle=instSub; ctx!.font='400 11px -apple-system,sans-serif';
        ctx!.fillText(inst.s,p.x,p.y+9);
      });

      // Regulator nodes
      REGS.forEach((reg,i)=>{
        const p=getRegPos(i);
        rr(p.x-nw/2,p.y-NH/2,nw,NH,6);
        ctx!.fillStyle='rgba(212,168,67,0.08)'; ctx!.strokeStyle='rgba(212,168,67,0.5)'; ctx!.lineWidth=1; ctx!.fill(); ctx!.stroke();
        ctx!.fillStyle='rgba(212,168,67,1.0)'; ctx!.font='700 15px -apple-system,sans-serif'; ctx!.textAlign='center'; ctx!.textBaseline='middle';
        ctx!.fillText(reg.n,p.x,p.y-7);
        ctx!.fillStyle='rgba(255,255,255,0.4)'; ctx!.font='400 11px -apple-system,sans-serif';
        ctx!.fillText(reg.s,p.x,p.y+9);
      });

      // Center AI node
      const pulse=Math.sin(aiPulse)*0.5+0.5;
      ctx!.beginPath(); ctx!.arc(cx,cy,CR+14+pulse*8,0,Math.PI*2);
      ctx!.strokeStyle=`rgba(212,168,67,${0.05+pulse*0.08})`; ctx!.lineWidth=1; ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(cx,cy,CR+6,0,Math.PI*2);
      ctx!.strokeStyle='rgba(212,168,67,0.15)'; ctx!.lineWidth=1; ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(cx,cy,CR,0,Math.PI*2);
      ctx!.fillStyle=centerFill; ctx!.strokeStyle='rgba(212,168,67,0.9)'; ctx!.lineWidth=2; ctx!.fill(); ctx!.stroke();
      ctx!.fillStyle='rgba(212,168,67,0.95)'; ctx!.font=`700 ${Math.round(CR*0.28)}px -apple-system,sans-serif`; ctx!.textAlign='center'; ctx!.textBaseline='middle';
      ctx!.fillText('Stablus',cx,cy-CR*0.15);
      ctx!.fillStyle=engineText; ctx!.font=`400 ${Math.round(CR*0.21)}px -apple-system,sans-serif`;
      ctx!.fillText('AI Engine',cx,cy+CR*0.22);

      animId=requestAnimationFrame(draw);
    }

    const observer=new ResizeObserver(()=>{
      const r=canvas.getBoundingClientRect();
      if(!r.width||!r.height) return;
      canvas.width=r.width; canvas.height=r.height;
      W=r.width; H=r.height; cx=W/2; cy=H/2;
    });
    observer.observe(canvas);

    setTimeout(()=>{
      const r=canvas.getBoundingClientRect();
      canvas.width=r.width; canvas.height=r.height;
      W=r.width; H=r.height; cx=W/2; cy=H/2;
      draw();
    },80);

    return ()=>{ cancelAnimationFrame(animId); observer.disconnect(); mq.removeEventListener('change', onSchemeChange); };
  },[]);

  return <canvas ref={canvasRef} className="hidden md:block w-full h-full" />;
}
