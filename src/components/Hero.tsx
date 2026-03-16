'use client'
import Link from 'next/link'
import {useEffect,useRef} from 'react'

export default function Hero(){
  const canvasRef=useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    // Particle effect
    const canvas=canvasRef.current
    if(!canvas)return
    const ctx=canvas.getContext('2d')
    if(!ctx)return
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    const particles:any[]=[]
    const colors=['#00E5FF','#A855F7','#FF6B35','#10B981']
    for(let i=0;i<60;i++){
      particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2+0.5,
        dx:(Math.random()-0.5)*0.4,
        dy:(Math.random()-0.5)*0.4,
        color:colors[Math.floor(Math.random()*colors.length)],
        opacity:Math.random()*0.6+0.2
      })
    }
    let raf:number
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height)
      particles.forEach(p=>{
        ctx.beginPath()
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=p.color
        ctx.globalAlpha=p.opacity
        ctx.fill()
        p.x+=p.dx;p.y+=p.dy
        if(p.x<0||p.x>canvas.width)p.dx*=-1
        if(p.y<0||p.y>canvas.height)p.dy*=-1
      })
      raf=requestAnimationFrame(draw)
    }
    draw()
    const resize=()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight}
    window.addEventListener('resize',resize)
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[])

  return(
    <section className="relative min-h-screen w-full overflow-hidden rgb-bg-pulse" style={{background:'#0D0D0D'}}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{opacity:0.4}}/>

      {/* RGB grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:'linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)',
        backgroundSize:'60px 60px'
      }}/>

      {/* Corner glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(0,229,255,0.08) 0%,transparent 70%)'}}/>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(168,85,247,0.08) 0%,transparent 70%)'}}/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(255,107,53,0.04) 0%,transparent 70%)'}}/>

      {/* Right side image */}
      <div className="absolute right-0 top-0 w-full md:w-[55%] h-full pointer-events-none">
        <div className="absolute inset-0" style={{clipPath:'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'}}>
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
            alt="" className="w-full h-full object-cover" style={{opacity:0.25}}/>
          <div className="absolute inset-0" style={{background:'linear-gradient(to right,#0D0D0D,rgba(13,13,13,0.6) 50%,transparent)'}}/>
          {/* RGB scan overlay on image */}
          <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,transparent 0%,rgba(0,229,255,0.03) 50%,transparent 100%)',animation:'rgb-bg 4s ease infinite'}}/>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-screen-xl mx-auto">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full rgb-border-anim" style={{background:'rgba(0,229,255,0.05)'}}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"/>
            <span className="font-hindi text-white text-sm font-semibold">हर पल यादगार</span>
            <span className="text-white/30">•</span>
            <span className="text-white/50 text-xs tracking-wider">Est. 2014</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display font-black leading-[0.9] mb-6 tracking-tight" style={{fontSize:'clamp(3.5rem,9vw,8rem)'}}>
            <span className="block text-white glitch">EVENTS</span>
            <span className="block gradient-text">THAT</span>
            <span className="block text-white glitch">HIT DIFF</span>
          </h1>

          {/* Sub text */}
          <p className="text-white/40 text-lg mb-10 max-w-md leading-relaxed">
            Corporate. Weddings. Concerts. Ghazal Nights.<br/>
            <span className="neon-cyan text-base">We make every moment unforgettable ✨</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href="/#contact"
              className="px-8 py-4 font-bold text-sm tracking-[0.15em] uppercase transition-all hover:scale-105 rounded-sm rgb-border-anim"
              style={{background:'rgba(0,229,255,0.1)',color:'#00E5FF'}}>
              Book Now 🔥
            </Link>
            <Link href="/#gallery"
              className="px-8 py-4 font-bold text-sm tracking-[0.15em] uppercase transition-all hover:scale-105 rounded-sm"
              style={{border:'1px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.7)'}}>
              See Our Work
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-14 pt-8" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
            {[['500+','Events Done'],['10+','Years'],['50+','Artists'],['100%','Satisfaction']].map(([n,l])=>(
              <div key={l} className="flex flex-col">
                <span className="font-display font-black text-xl gradient-text">{n}</span>
                <span className="text-white/30 text-[10px] tracking-widest uppercase mt-0.5">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-3 overflow-hidden z-10 rgb-border-anim" style={{borderTop:'1px solid',background:'rgba(13,13,13,0.8)',backdropFilter:'blur(10px)'}}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[0,1].map(ri=>(
            <div key={ri} className="flex items-center gap-8 pr-8 flex-shrink-0">
              {['Weddings','Corporate Events','Musical Nights','Ghazal Evenings','Mushaira','Govt Programs','Open Mic','Artist Management'].map((txt,i)=>(
                <span key={i} className={`text-xs tracking-[0.2em] uppercase font-bold ${i%2===0?'neon-cyan':'neon-purple'}`}>{txt} ✦</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}